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
const fs = require("fs");

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

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve uploads statically
app.use("/uploads", express.static(uploadsDir));

// File upload endpoint
app.post("/api/upload", requireAuth, upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({ url: `/uploads/${req.file.filename}` });
});



// Create default admin user and seed CMS if not exists
async function initializeDatabase() {
  // 1. Create admin user
  const admin = await prisma.adminUser.findFirst({ where: { username: "admin" } });
  if (!admin) {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await prisma.adminUser.create({
      data: { username: "admin", password: hashedPassword },
    });
    console.log("Created default admin user: admin / admin123");
  }

  // 2. Seed Hero Slides if empty
  const slidesCount = await prisma.heroSlide.count();
  if (slidesCount === 0) {
    const defaultSlides = [
      {
        title: "Smart Solar Solutions",
        subtitle: "Innovative, sustainable, and reliable end-to-end renewable energy solutions for homes, businesses, and industries.",
        image_url: "/assets/hero-1-BkzO-lr0.jpg",
        button_text: "Get a Quote",
        button_link: "/quote",
        sort_order: 1
      },
      {
        title: "End-to-End Solar EPC",
        subtitle: "Rooftop, ground-mounted, commercial, and utility-scale solar installations customized for your energy needs.",
        image_url: "/assets/hero-2-BYbGfj6d.jpg",
        button_text: "Our Services",
        button_link: "/services",
        sort_order: 2
      },
      {
        title: "Scale Your Power Savings",
        subtitle: "Join over 500+ satisfied clients cutting their electricity bills with high-efficiency PV technology.",
        image_url: "/assets/hero-3-wqFfPd7k.jpg",
        button_text: "Explore Projects",
        button_link: "/projects",
        sort_order: 3
      }
    ];
    for (const slide of defaultSlides) {
      await prisma.heroSlide.create({ data: slide });
    }
    console.log("Seeded default hero slides.");
  }

  // 3. Seed PageContent sections if empty
  const contentCount = await prisma.pageContent.count();
  if (contentCount === 0) {
    const defaultSections = [
      {
        page_slug: "home",
        section_key: "about_title",
        title: "Leading Solar EPC & Maintenance Provider in India",
        body: "Flash Renewable Energy Solutions is one of the fastest-growing solar energy developers, delivering high-performance solar power plants across commercial, residential, and industrial sectors."
      },
      {
        page_slug: "home",
        section_key: "about_description",
        title: "Empowering a Sustainable Future",
        body: "From planning and design to installation and 24x7 operation & maintenance, we handle everything locally to ensure maximum output and zero hassle for our customers."
      }
    ];
    for (const section of defaultSections) {
      await prisma.pageContent.create({ data: section });
    }
    console.log("Seeded default page content sections.");
  }
}
initializeDatabase().catch(console.error);

// Authentication middleware
async function requireAuth(req, res, next) {
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
  
  if (isValidAdmin) {
    req.user = { id: "admin", role: "admin" };
    return next();
  }

  if (isValidStaff) {
    const staffId = token.replace("staff-token-", "");
    try {
      const staff = await prisma.teamMember.findUnique({ where: { id: staffId } });
      if (!staff) {
        return res.status(401).json({ error: "Staff member not found" });
      }
      if (staff.active === false || staff.active === "false" || staff.active === 0) {
        return res.status(401).json({ error: "Account is suspended." });
      }
      req.user = { id: staff.id, role: staff.system_role || "staff" };
      return next();
    } catch (e) {
      return res.status(500).json({ error: "Session verification failed: " + e.message });
    }
  }
}

// Login endpoint
app.post("/api/login", async (req, res) => {
  try {
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
          role: staff.system_role || "staff",
          id: staff.id,
        });
      }
    }

    res.status(401).json({ error: "Invalid credentials" });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal server error during login: " + error.message });
  }
});

// Forward Enquiry/Quote to internal Staff member
app.post("/api/enquiries/forward", requireAuth, async (req, res) => {
  try {
    const { type, id, staffId } = req.body;
    if (!type || !id) {
      return res.status(400).json({ error: "Missing type or id" });
    }

    // Handled unassigning if staffId is empty/null/undefined
    const targetStaffId = staffId || null;
    let staffName = "Unassigned";

    if (targetStaffId) {
      const staff = await prisma.teamMember.findUnique({ where: { id: targetStaffId } });
      if (!staff) {
        return res.status(404).json({ error: "Staff member not found" });
      }
      staffName = staff.name;
    }

    let enquiryDetails = "";
    if (type === "contact") {
      const enquiry = await prisma.contactEnquiry.findUnique({ where: { id } });
      if (!enquiry) return res.status(404).json({ error: "Contact Enquiry not found" });
      
      await prisma.contactEnquiry.update({
        where: { id },
        data: { assigned_staff_id: targetStaffId }
      });
      enquiryDetails = `Contact Enquiry from ${enquiry.name} (${enquiry.email}): ${enquiry.message}`;
    } else if (type === "quote") {
      const quote = await prisma.quoteRequest.findUnique({ where: { id } });
      if (!quote) return res.status(404).json({ error: "Quote Request not found" });

      await prisma.quoteRequest.update({
        where: { id },
        data: { assigned_staff_id: targetStaffId }
      });
      enquiryDetails = `Quote Request from ${quote.name} (${quote.email}): ${quote.message || "Requesting solar system installation"}`;
    } else {
      return res.status(400).json({ error: "Invalid type: must be 'contact' or 'quote'" });
    }

    // Only create a message if a staff member was actually assigned
    if (targetStaffId) {
      await prisma.staffMessage.create({
        data: {
          sender_role: "admin",
          sender_name: "System Admin",
          recipient_id: targetStaffId,
          message: `FORWARDED TASK: ${enquiryDetails}`,
        }
      });
    }

    res.json({ success: true, message: `Successfully assigned/forwarded to ${staffName}` });
  } catch (error) {
    console.error("Forwarding Error:", error);
    res.status(500).json({ error: "Failed to forward enquiry: " + error.message });
  }
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
    case "hero_slides":
      return prisma.heroSlide;
    case "investor_enquiries":
      return prisma.investorEnquiry;
    case "partner_applications":
      return prisma.channelPartnerApplication;
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
    req.path === "/newsletter_subscribers" ||
    req.path === "/investor_enquiries" ||
    req.path === "/partner_applications"
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
    let filter = {};
    if (req.user && req.user.role === "staff") {
      if (table === "contact_enquiries" || table === "quote_requests") {
        filter = { assigned_staff_id: req.user.id };
      } else if (
        table === "page_content" ||
        table === "hero_slides" ||
        table === "system_settings" ||
        table === "team_members" ||
        table === "admin_users"
      ) {
        return res.status(403).json({ error: "Access Denied: Standard staff cannot view this content." });
      }
    }

    const rows = await model.findMany({ where: filter, orderBy: { created_at: "desc" } });
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
  if (req.user && req.user.role === "staff") {
    if (table !== "contact_enquiries" && table !== "quote_requests" && table !== "staff_messages") {
      return res.status(403).json({ error: "Access Denied: Staff cannot create records here." });
    }
  }
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
    } else if (table === "investor_enquiries") {
      sendNotificationEmail(
        `New Investor Enquiry - ${created.name}`,
        `
          <div style="font-family: sans-serif; max-width: 600px; color: #1b2430; border: 1px solid #e7edf5; padding: 25px; border-radius: 12px;">
            <h2 style="color: #0b2340; margin-top: 0;">🏦 New Investor Enquiry Received</h2>
            <p>A prospective investor has submitted an enquiry via the website:</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <tr><td style="font-weight:bold;padding:8px 0;border-bottom:1px solid #f6f8fb;width:160px;">Name:</td><td style="padding:8px 0;border-bottom:1px solid #f6f8fb;">${created.name}</td></tr>
              <tr><td style="font-weight:bold;padding:8px 0;border-bottom:1px solid #f6f8fb;">Email:</td><td style="padding:8px 0;border-bottom:1px solid #f6f8fb;"><a href="mailto:${created.email}">${created.email}</a></td></tr>
              <tr><td style="font-weight:bold;padding:8px 0;border-bottom:1px solid #f6f8fb;">Phone:</td><td style="padding:8px 0;border-bottom:1px solid #f6f8fb;">${created.phone}</td></tr>
              <tr><td style="font-weight:bold;padding:8px 0;border-bottom:1px solid #f6f8fb;">Organisation:</td><td style="padding:8px 0;border-bottom:1px solid #f6f8fb;">${created.organisation || 'N/A'}</td></tr>
              <tr><td style="font-weight:bold;padding:8px 0;border-bottom:1px solid #f6f8fb;">Investment Range:</td><td style="padding:8px 0;border-bottom:1px solid #f6f8fb;">${created.investment_range}</td></tr>
              <tr><td style="font-weight:bold;padding:8px 0;border-bottom:1px solid #f6f8fb;">Investment Type:</td><td style="padding:8px 0;border-bottom:1px solid #f6f8fb;">${created.investment_type}</td></tr>
              <tr><td style="font-weight:bold;padding:8px 0;border-bottom:1px solid #f6f8fb;">Timeline:</td><td style="padding:8px 0;border-bottom:1px solid #f6f8fb;">${created.timeline || 'Not specified'}</td></tr>
            </table>
            <div style="margin-top:20px;background-color:#f6f8fb;padding:15px;border-radius:8px;font-style:italic;">${created.message || 'No additional notes.'}</div>
            <p style="margin-top:25px;font-size:11px;color:#667085;">Received at: ${new Date(created.created_at).toLocaleString()}</p>
          </div>
        `
      ).catch(console.error);
    } else if (table === "partner_applications") {
      sendNotificationEmail(
        `New Channel Partner Application - ${created.name}`,
        `
          <div style="font-family: sans-serif; max-width: 600px; color: #1b2430; border: 1px solid #e7edf5; padding: 25px; border-radius: 12px;">
            <h2 style="color: #0b2340; margin-top: 0;">🤝 New Channel Partner Application</h2>
            <p>A new channel partner has applied via the website:</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <tr><td style="font-weight:bold;padding:8px 0;border-bottom:1px solid #f6f8fb;width:160px;">Name:</td><td style="padding:8px 0;border-bottom:1px solid #f6f8fb;">${created.name}</td></tr>
              <tr><td style="font-weight:bold;padding:8px 0;border-bottom:1px solid #f6f8fb;">Email:</td><td style="padding:8px 0;border-bottom:1px solid #f6f8fb;"><a href="mailto:${created.email}">${created.email}</a></td></tr>
              <tr><td style="font-weight:bold;padding:8px 0;border-bottom:1px solid #f6f8fb;">Phone:</td><td style="padding:8px 0;border-bottom:1px solid #f6f8fb;">${created.phone}</td></tr>
              <tr><td style="font-weight:bold;padding:8px 0;border-bottom:1px solid #f6f8fb;">Business:</td><td style="padding:8px 0;border-bottom:1px solid #f6f8fb;">${created.business_name} (${created.business_type})</td></tr>
              <tr><td style="font-weight:bold;padding:8px 0;border-bottom:1px solid #f6f8fb;">Partner Type:</td><td style="padding:8px 0;border-bottom:1px solid #f6f8fb;">${created.partner_type}</td></tr>
              <tr><td style="font-weight:bold;padding:8px 0;border-bottom:1px solid #f6f8fb;">Location:</td><td style="padding:8px 0;border-bottom:1px solid #f6f8fb;">${created.district}, ${created.state}</td></tr>
              <tr><td style="font-weight:bold;padding:8px 0;border-bottom:1px solid #f6f8fb;">Experience:</td><td style="padding:8px 0;border-bottom:1px solid #f6f8fb;">${created.experience || 'Not specified'}</td></tr>
            </table>
            <div style="margin-top:20px;background-color:#f6f8fb;padding:15px;border-radius:8px;font-style:italic;">${created.message || 'No additional notes.'}</div>
            <p style="margin-top:25px;font-size:11px;color:#667085;">Received at: ${new Date(created.created_at).toLocaleString()}</p>
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
  if (req.user && req.user.role === "staff") {
    if (table !== "contact_enquiries" && table !== "quote_requests" && table !== "staff_messages" && table !== "team_members") {
      return res.status(403).json({ error: "Access Denied: Staff cannot edit records here." });
    }
    if (table === "team_members" && id !== req.user.id) {
      return res.status(403).json({ error: "Access Denied: Staff can only edit their own profile." });
    }
  }
  try {
    const serialized = serializeBody(req.body);
    if ((table === "admin_users" || table === "team_members") && serialized.password) {
       if (!serialized.password.startsWith("$2a$")) {
         serialized.password = await bcrypt.hash(serialized.password, 10);
       }
    }

    // Capture previous state to check for new staff assignments
    let previousRecord = null;
    if (table === "contact_enquiries" || table === "quote_requests") {
      previousRecord = await model.findUnique({ where: { id } });
    }

    const updated = await model.update({ where: { id }, data: serialized });

    // Send notifications if staff assignment changes
    if (previousRecord && serialized.assigned_staff_id !== undefined && serialized.assigned_staff_id !== previousRecord.assigned_staff_id) {
      const targetStaffId = serialized.assigned_staff_id;
      if (targetStaffId) {
        const staff = await prisma.teamMember.findUnique({ where: { id: targetStaffId } });
        if (staff) {
          let enquiryDetails = "";
          if (table === "contact_enquiries") {
            enquiryDetails = `Contact Enquiry from ${updated.name} (${updated.email}): ${updated.message}`;
          } else {
            enquiryDetails = `Quote Request from ${updated.name} (${updated.email}): ${updated.message || "Requesting solar system installation"}`;
          }
          await prisma.staffMessage.create({
            data: {
              sender_role: "admin",
              sender_name: "System Admin",
              recipient_id: targetStaffId,
              message: `FORWARDED TASK: ${enquiryDetails}`,
            }
          });
        }
      }
    }

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
  if (req.user && req.user.role === "staff") {
    return res.status(403).json({ error: "Access Denied: Staff cannot delete records." });
  }
  try {
    await model.delete({ where: { id } });
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Delete failed" });
  }
});

// Backup DB
app.get("/api/db/backup", requireAuth, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access Denied: Only Admins can manage the database." });
  }
  const dbPath = path.join(__dirname, "..", "prisma", "dev.db");
  if (!fs.existsSync(dbPath)) {
    return res.status(404).json({ error: "Database file not found" });
  }
  res.download(dbPath, `backup-${Date.now()}.db`);
});

// Restore DB
app.post("/api/db/restore", requireAuth, upload.single("database"), async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access Denied: Only Admins can manage the database." });
  }
  try {
    if (!req.file) return res.status(400).json({ error: "No database file uploaded" });
    
    const targetPath = path.join(__dirname, "..", "prisma", "dev.db");
    
    // Disconnect prisma safely
    await prisma.$disconnect();
    
    // Sleep 500ms to allow file locks to release fully
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Backup current just in case
    if (fs.existsSync(targetPath)) {
      fs.copyFileSync(targetPath, targetPath + '.old');
    }
    
    // Clean WAL and SHM if they exist
    const walPath = targetPath + "-wal";
    const shmPath = targetPath + "-shm";
    if (fs.existsSync(walPath)) {
      try { fs.unlinkSync(walPath); } catch (e) { console.warn("Failed to delete WAL file:", e.message); }
    }
    if (fs.existsSync(shmPath)) {
      try { fs.unlinkSync(shmPath); } catch (e) { console.warn("Failed to delete SHM file:", e.message); }
    }
    
    // Replace with new db
    fs.copyFileSync(req.file.path, targetPath);
    fs.unlinkSync(req.file.path);
    
    // Reconnect
    await prisma.$connect();
    
    res.json({ message: "Database restored successfully!" });
  } catch (err) {
    console.error("Restore error:", err);
    // Reconnect on error
    try { await prisma.$connect(); } catch (e) {}
    res.status(500).json({ error: "Failed to restore database: " + err.message });
  }
});

// Serve frontend static files
app.use(express.static(path.join(__dirname, "..", "..", ".output", "public")));

// Fallback for React router
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", ".output", "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});