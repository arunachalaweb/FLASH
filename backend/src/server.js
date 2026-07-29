const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Serve uploads statically
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// Create default admin user if not exists
async function createDefaultAdmin() {
  const admin = await prisma.adminUser.findFirst({ where: { username: "admin" } });
  if (!admin) {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await prisma.adminUser.create({
      data: { username: "admin", password: hashedPassword },
    });
    console.log("Created default admin user: admin / admin123");
  }
}
createDefaultAdmin().catch(console.error);

// Authentication middleware
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  const isValidAdmin = token === process.env.ADMIN_TOKEN || token === "default-admin-token";
  const isValidStaff = token.startsWith("staff-token-");
  if (!isValidAdmin && !isValidStaff) {
    return res.status(401).json({ error: "Invalid token" });
  }
  next();
}

// Login endpoint
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  // 1. Try admin user
  const admin = await prisma.adminUser.findUnique({ where: { username } });
  if (admin) {
    const valid = await bcrypt.compare(password, admin.password);
    if (valid) {
      return res.json({
        token: "default-admin-token",
        username: admin.username,
        role: "admin",
        id: "admin",
      });
    }
  }

  // 2. Try team member (staff)
  const staff = await prisma.teamMember.findUnique({ where: { username } });
  if (staff) {
    if (staff.active === false || staff.active === "false" || staff.active === 0) {
      return res.status(401).json({ error: "Account is suspended." });
    }
    const valid = await bcrypt.compare(password, staff.password || "");
    if (valid) {
      return res.json({
        token: "staff-token-" + staff.id,
        username: staff.name,
        role: "staff",
        id: staff.id,
      });
    }
  }

  res.status(401).json({ error: "Invalid credentials" });
});

// Helper: map table param to prisma model actions
function modelFor(table) {
  switch (table) {
    case "contact_enquiries":
      return prisma.contactEnquiry;
    case "newsletter_subscribers":
      return prisma.newsletterSubscriber;
    case "quote_requests":
      return prisma.quoteRequest;
    case "admin_users":
      return prisma.adminUser;
    case "projects":
      return prisma.project;
    case "services":
      return prisma.service;
    case "team_members":
      return prisma.teamMember;
    case "testimonials":
      return prisma.testimonial;
    case "faqs":
      return prisma.faq;
    case "page_content":
      return prisma.pageContent;
    case "profiles":
      return prisma.profile;
    case "system_settings":
      return prisma.systemSetting;
    case "staff_messages":
      return prisma.staffMessage;
    default:
      return null;
  }
}

// Fields requiring JSON stringification in SQLite
const jsonFields = ["gallery_images", "benefits"];
const booleanFields = ["published", "active"];

function serializeBody(body) {
  if (!body) return body;
  const result = { ...body };
  for (const field of jsonFields) {
    if (field in result) {
      if (Array.isArray(result[field]) || typeof result[field] === "object") {
        result[field] = JSON.stringify(result[field]);
      }
    }
  }
  for (const field of booleanFields) {
    if (field in result) {
      result[field] = result[field] === "true" || result[field] === true || result[field] === 1;
    }
  }
  return result;
}

function deserializeRow(row) {
  if (!row) return row;
  const result = { ...row };
  for (const field of jsonFields) {
    if (field in result && typeof result[field] === "string" && result[field] !== "") {
      try {
        result[field] = JSON.parse(result[field]);
      } catch (e) {
        result[field] = [];
      }
    } else if (field in result && result[field] === null) {
      result[field] = [];
    }
  }
  return result;
}

// SMTP mailer function
async function sendNotificationEmail(subject, htmlBody) {
  const nodemailer = require("nodemailer");
  try {
    const rows = await prisma.systemSetting.findMany();
    const settings = {};
    rows.forEach((r) => {
      settings[r.key] = r.value;
    });

    if (settings.smtp_enabled !== "true") {
      console.log("SMTP notifications are disabled.");
      return;
    }

    const host = settings.smtp_host;
    const port = parseInt(settings.smtp_port, 10) || 587;
    const user = settings.smtp_user;
    const pass = settings.smtp_pass;
    const secure = settings.smtp_secure === "true";
    const fromEmail = settings.smtp_from_email || user;
    const toEmail = settings.smtp_to_email;

    if (!host || !user || !pass || !toEmail) {
      console.warn("SMTP settings are incomplete. Cannot send email.");
      return;
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

    const info = await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      subject,
      html: htmlBody,
    });
    console.log("Notification email sent successfully:", info.messageId);
  } catch (err) {
    console.error("Failed to send SMTP notification email:", err);
  }
}

// Apply auth middleware to all /api routes except login and public forms POST submissions
app.use("/api", (req, res, next) => {
  if (req.path === "/login") return next();
  
  // Public submissions endpoints: allow POST operations
  if (req.method === "POST" && (
    req.path === "/contact_enquiries" ||
    req.path === "/quote_requests" ||
    req.path === "/newsletter_subscribers"
  )) {
    return next();
  }
  
  requireAuth(req, res, next);
});

// File Upload endpoint
app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

// Settings Key-Value endpoints (defined before generic :table params)
app.get("/api/settings", async (req, res) => {
  try {
    const rows = await prisma.systemSetting.findMany();
    const settings = {};
    rows.forEach((r) => {
      settings[r.key] = r.value;
    });
    res.json(settings);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch settings" });
  }
});

app.post("/api/settings", async (req, res) => {
  try {
    const data = req.body;
    const promises = Object.entries(data).map(([key, value]) => {
      return prisma.systemSetting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      });
    });
    await Promise.all(promises);
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to save settings" });
  }
});

app.post("/api/settings/test_smtp", async (req, res) => {
  const nodemailer = require("nodemailer");
  const {
    smtp_host,
    smtp_port,
    smtp_user,
    smtp_pass,
    smtp_secure,
    smtp_to_email,
    smtp_from_email,
  } = req.body;

  if (!smtp_host || !smtp_user || !smtp_pass || !smtp_to_email) {
    return res.status(400).json({ error: "Missing required SMTP parameters or recipient email." });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtp_host,
      port: parseInt(smtp_port, 10) || 587,
      secure: smtp_secure === "true" || smtp_secure === true,
      auth: {
        user: smtp_user,
        pass: smtp_pass,
      },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: smtp_from_email || smtp_user,
      to: smtp_to_email,
      subject: "Test SMTP Email - Flash Renewable Energy Solutions",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; color: #1b2430; border: 1px solid #e7edf5; padding: 25px; border-radius: 12px;">
          <h2 style="color: #0b2340; margin-top: 0;">SMTP Connection Successful!</h2>
          <p>Your SMTP settings on <strong>Flash Renewable Energy Solutions</strong> are correct.</p>
          <p>Email notifications for form submissions will now be sent automatically.</p>
        </div>
      `,
    });

    res.json({ ok: true, message: "SMTP connection verified and test email sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Failed to verify SMTP connection or send test email." });
  }
});

app.get("/api/:table", async (req, res) => {
  const table = req.params.table;
  const model = modelFor(table);
  if (!model) return res.status(404).json({ error: "Unknown table" });
  try {
    const rows = await model.findMany({ orderBy: { created_at: "desc" } });
    const deserialized = rows.map(deserializeRow);
    res.json(deserialized);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Query failed" });
  }
});

app.post("/api/:table", async (req, res) => {
  const table = req.params.table;
  const model = modelFor(table);
  if (!model) return res.status(404).json({ error: "Unknown table" });
  try {
    const serialized = serializeBody(req.body);
    if ((table === "admin_users" || table === "team_members") && serialized.password) {
      serialized.password = await bcrypt.hash(serialized.password, 10);
    }
    const created = await model.create({ data: serialized });
    
    // Trigger notification email asynchronously
    if (table === "contact_enquiries") {
      sendNotificationEmail(
        `New Contact Enquiry - ${created.name}`,
        `
          <div style="font-family: sans-serif; max-width: 600px; color: #1b2430; border: 1px solid #e7edf5; padding: 25px; border-radius: 12px;">
            <h2 style="color: #0b2340; margin-top: 0;">New Contact Message Received</h2>
            <p>A user has submitted a message via the website contact form:</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <tr>
                <td style="font-weight: bold; padding: 8px 0; border-bottom: 1px solid #f6f8fb; width: 120px;">Name:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #f6f8fb;">${created.name}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding: 8px 0; border-bottom: 1px solid #f6f8fb;">Email:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #f6f8fb;"><a href="mailto:${created.email}">${created.email}</a></td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding: 8px 0; border-bottom: 1px solid #f6f8fb;">Phone:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #f6f8fb;">${created.phone || "N/A"}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding: 8px 0; border-bottom: 1px solid #f6f8fb;">Subject:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #f6f8fb;">${created.subject || "N/A"}</td>
              </tr>
            </table>
            <div style="margin-top: 20px; background-color: #f6f8fb; padding: 15px; border-radius: 8px; font-style: italic;">
              "${created.message}"
            </div>
            <p style="margin-top: 25px; font-size: 11px; color: #667085;">Received at: ${new Date(created.created_at).toLocaleString()}</p>
          </div>
        `
      ).catch(console.error);
    } else if (table === "quote_requests") {
      sendNotificationEmail(
        `New Solar Quote Request - ${created.name}`,
        `
          <div style="font-family: sans-serif; max-width: 600px; color: #1b2430; border: 1px solid #e7edf5; padding: 25px; border-radius: 12px;">
            <h2 style="color: #0b2340; margin-top: 0;">New Solar Quote Request</h2>
            <p>A user has submitted a quote request via the website quote form:</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <tr>
                <td style="font-weight: bold; padding: 8px 0; border-bottom: 1px solid #f6f8fb; width: 150px;">Name:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #f6f8fb;">${created.name}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding: 8px 0; border-bottom: 1px solid #f6f8fb;">Email:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #f6f8fb;"><a href="mailto:${created.email}">${created.email}</a></td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding: 8px 0; border-bottom: 1px solid #f6f8fb;">Phone:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #f6f8fb;">${created.phone || "N/A"}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding: 8px 0; border-bottom: 1px solid #f6f8fb;">City/Location:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #f6f8fb;">${created.city || "N/A"}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding: 8px 0; border-bottom: 1px solid #f6f8fb;">Service Type:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #f6f8fb;">${created.service_type || "N/A"}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding: 8px 0; border-bottom: 1px solid #f6f8fb;">Property Type:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #f6f8fb;">${created.property_type || "N/A"}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding: 8px 0; border-bottom: 1px solid #f6f8fb;">Approx. Load:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #f6f8fb;">${created.load_kw || "N/A"}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding: 8px 0; border-bottom: 1px solid #f6f8fb;">Monthly Bill/Budget:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #f6f8fb;">${created.budget || "N/A"}</td>
              </tr>
            </table>
            <h4 style="margin-bottom: 8px; margin-top: 20px;">Site Details:</h4>
            <div style="background-color: #f6f8fb; padding: 15px; border-radius: 8px; font-style: italic;">
              "${created.message || "No message details provided."}"
            </div>
            <p style="margin-top: 25px; font-size: 11px; color: #667085;">Received at: ${new Date(created.created_at).toLocaleString()}</p>
          </div>
        `
      ).catch(console.error);
    } else if (table === "newsletter_subscribers") {
      sendNotificationEmail(
        `New Newsletter Subscriber - ${created.email}`,
        `
          <div style="font-family: sans-serif; max-width: 600px; color: #1b2430; border: 1px solid #e7edf5; padding: 25px; border-radius: 12px;">
            <h2 style="color: #0b2340; margin-top: 0;">New Newsletter Subscriber</h2>
            <p>A client has subscribed to the newsletter mailing list:</p>
            <div style="background-color: #f6f8fb; padding: 15px; border-radius: 8px; margin-top: 15px; font-size: 16px; font-weight: bold; color: #0b2340;">
              ${created.email}
            </div>
            <p style="margin-top: 25px; font-size: 11px; color: #667085;">Registered at: ${new Date(created.created_at).toLocaleString()}</p>
          </div>
        `
      ).catch(console.error);
    }

    res.json(deserializeRow(created));
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Insert failed" });
  }
});

app.put("/api/:table/:id", async (req, res) => {
  const table = req.params.table;
  const id = req.params.id;
  const model = modelFor(table);
  if (!model) return res.status(404).json({ error: "Unknown table" });
  try {
    const serialized = serializeBody(req.body);
    if ((table === "admin_users" || table === "team_members") && serialized.password) {
       if (!serialized.password.startsWith("$2a$")) {
         serialized.password = await bcrypt.hash(serialized.password, 10);
       }
    }
    const updated = await model.update({ where: { id }, data: serialized });
    res.json(deserializeRow(updated));
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Update failed" });
  }
});

app.delete("/api/:table/:id", async (req, res) => {
  const table = req.params.table;
  const id = req.params.id;
  const model = modelFor(table);
  if (!model) return res.status(404).json({ error: "Unknown table" });
  try {
    await model.delete({ where: { id } });
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Delete failed" });
  }
});

// Serve frontend static files
app.use(express.static(path.join(__dirname, "..", "..", "dist")));

// Fallback for React router
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});