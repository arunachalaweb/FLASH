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

  // 4. Seed Categories, Brands, Products, Packages, Coupons and Shipping Zones if empty
  const categoryCount = await prisma.category.count();
  if (categoryCount <= 3) {
    // Clear old ones to prevent duplicates
    await prisma.orderItem.deleteMany().catch(() => {});
    await prisma.invoice.deleteMany().catch(() => {});
    await prisma.creditNote.deleteMany().catch(() => {});
    await prisma.product.deleteMany().catch(() => {});
    await prisma.category.deleteMany().catch(() => {});
    await prisma.brand.deleteMany().catch(() => {});
    await prisma.solarPackageItem.deleteMany().catch(() => {});
    await prisma.solarPackage.deleteMany().catch(() => {});
    await prisma.shippingZone.deleteMany().catch(() => {});
    await prisma.coupon.deleteMany().catch(() => {});

    // Create Brands
    const brandTata = await prisma.brand.create({ data: { name: "Tata Power Solar", slug: "tata-power-solar", description: "India's leading solar panel manufacturer." } });
    const brandLuminous = await prisma.brand.create({ data: { name: "Luminous", slug: "luminous", description: "Smart inverters and high capacity solar batteries." } });
    const brandWaaree = await prisma.brand.create({ data: { name: "Waaree", slug: "waaree", description: "Premium monocrystalline panels." } });
    const brandGrowatt = await prisma.brand.create({ data: { name: "Growatt", slug: "growatt", description: "State-of-the-art grid-tie MPPT inverters." } });

    // Create Categories
    const catPanels = await prisma.category.create({ data: { name: "Solar Panels", slug: "solar-panels", description: "High-efficiency PV modules." } });
    const catInverters = await prisma.category.create({ data: { name: "Solar Inverters", slug: "solar-inverters", description: "Grid-tie, off-grid and hybrid converters." } });
    const catBatteries = await prisma.category.create({ data: { name: "Solar Batteries", slug: "solar-batteries", description: "Tubular, Lithium-ion and LiFePO4 cells." } });
    const catStructures = await prisma.category.create({ data: { name: "Solar Mounting Structures", slug: "solar-mounting-structures", description: "Hot-dip galvanized mounting channels and clips." } });
    const catCables = await prisma.category.create({ data: { name: "DC Cables and Connectors", slug: "dc-cables-connectors", description: "Solar wires and MC4 connectors." } });
    const catMonitoring = await prisma.category.create({ data: { name: "Solar Monitoring Devices", slug: "solar-monitoring-devices", description: "Smart WiFi dataloggers and energy meters." } });
    const catAccessories = await prisma.category.create({ data: { name: "Solar Accessories", slug: "solar-accessories", description: "Earthing kits, distribution boxes and tools." } });

    // Seed Products
    const p1 = await prisma.product.create({
      data: {
        name: "Tata Mono PERC Solar Panel 550W",
        slug: "tata-mono-perc-550w",
        description: "High-efficiency monocrystalline solar module with advanced 10-busbar cell design. Certified for high snow/wind loads.",
        price: 19500,
        sale_price: 17800,
        sku: "SLR-TATA-550W",
        stock_quantity: 120,
        manage_stock: true,
        images: JSON.stringify(["https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&auto=format&fit=crop&q=60"]),
        category_id: catPanels.id,
        brand_id: brandTata.id,
        weight: 28.5,
        watt_capacity: 550,
        panel_technology: "PERC",
        cell_type: "Monocrystalline",
        published: true
      }
    });

    const p2 = await prisma.product.create({
      data: {
        name: "Growatt MIN 5000TL-X On-Grid Inverter",
        slug: "growatt-min-5000tl-x",
        description: "5kW Single Phase Grid-Tied Inverter with dual MPPT trackers and OLED touch display. Built-in WiFi module for remote analytics.",
        price: 49000,
        sale_price: 45000,
        sku: "INV-GROW-5KW",
        stock_quantity: 25,
        manage_stock: true,
        images: JSON.stringify(["https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=600&auto=format&fit=crop&q=60"]),
        category_id: catInverters.id,
        brand_id: brandGrowatt.id,
        weight: 10.8,
        voltage: "230V",
        phase: "single-phase",
        published: true
      }
    });

    const p3 = await prisma.product.create({
      data: {
        name: "Luminous Solar C10 Tubular Battery 150Ah",
        slug: "luminous-c10-150ah",
        description: "Tall tubular lead-acid solar battery with long life span, low maintenance costs, and quick recharge efficiency.",
        price: 16500,
        sale_price: 14800,
        sku: "BAT-LUMI-150AH",
        stock_quantity: 50,
        manage_stock: true,
        images: JSON.stringify(["https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=600&auto=format&fit=crop&q=60"]),
        category_id: catBatteries.id,
        brand_id: brandLuminous.id,
        weight: 55,
        battery_capacity: "150Ah",
        voltage: "12V",
        published: true
      }
    });

    // Create Shipping Zones
    await prisma.shippingZone.create({ data: { pincode: "600001", base_charge: 100, per_kg_rate: 5, available: true } }); // Chennai
    await prisma.shippingZone.create({ data: { pincode: "560001", base_charge: 150, per_kg_rate: 8, available: true } }); // Bangalore
    await prisma.shippingZone.create({ data: { pincode: "400001", base_charge: 200, per_kg_rate: 10, available: true } }); // Mumbai

    // Create Coupons
    await prisma.coupon.create({ data: { code: "FLASH1000", discount_type: "fixed", discount_value: 1000, min_order_val: 10000, active: true } });
    await prisma.coupon.create({ data: { code: "SOLAR5", discount_type: "percentage", discount_value: 5, min_order_val: 20000, active: true } });

    // Seed Ready-made Solar Packages
    const pack3kw = await prisma.solarPackage.create({
      data: {
        name: "3 kW On-Grid Solar Package",
        slug: "3kw-on-grid-solar-package",
        description: "Complete 3kW solar system package including delivery, installation, and net-metering support. Best for households with monthly bills under ₹3,000.",
        price: 175000,
        image_url: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=600&auto=format&fit=crop&q=60",
        features: JSON.stringify([
          "6 × Tata Mono PERC Solar Panels (550W)",
          "1 × Growatt 3kW On-Grid Inverter",
          "HDG Rust-proof Mounting Structure",
          "Complete DB Distribution Boxes & Cabling",
          "Free Installation & 5-Year Maintenance Support"
        ])
      }
    });

    // Link package items
    await prisma.solarPackageItem.create({
      data: { package_id: pack3kw.id, product_id: p1.id, quantity: 6 }
    });

    console.log("Seeded default e-commerce catalog, brands, shipping zones, and packages.");
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
  const isValidCustomer = token.startsWith("customer-token-");

  if (!isValidAdmin && !isValidStaff && !isValidCustomer) {
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

  if (isValidCustomer) {
    const customerId = token.replace("customer-token-", "");
    try {
      const customer = await prisma.customer.findUnique({ where: { id: customerId } });
      if (!customer) {
        return res.status(401).json({ error: "Customer not found" });
      }
      req.user = { id: customer.id, role: "customer" };
      return next();
    } catch (e) {
      return res.status(500).json({ error: "Customer verification failed: " + e.message });
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
    case "categories":
      return prisma.category;
    case "products":
      return prisma.product;
    case "customers":
      return prisma.customer;
    case "orders":
      return prisma.order;
    case "order_items":
      return prisma.orderItem;
    case "invoices":
      return prisma.invoice;
    case "credit_notes":
      return prisma.creditNote;
    case "brands":
      return prisma.brand;
    case "solar_packages":
      return prisma.solarPackage;
    case "solar_package_items":
      return prisma.solarPackageItem;
    case "solar_enquiries":
      return prisma.solarEnquiry;
    case "quotations":
      return prisma.quotation;
    case "coupons":
      return prisma.coupon;
    case "shipping_zones":
      return prisma.shippingZone;
    default:
      return null;
  }
}

// Fields requiring JSON stringification in SQLite
const jsonFields = ["gallery_images", "benefits", "images", "features", "items"];
const booleanFields = ["published", "active", "installation_req", "available", "manage_stock"];

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

// Apply auth middleware to all /api routes except login, public forms, public catalog, and customer auth
app.use("/api", (req, res, next) => {
  if (req.path === "/login") return next();
  
  // Public catalog view endpoints: allow GET
  if (req.method === "GET" && (
    req.path.startsWith("/products") ||
    req.path.startsWith("/categories") ||
    req.path.startsWith("/brands") ||
    req.path.startsWith("/solar_packages")
  )) {
    return next();
  }

  // Public submissions and customer auth: allow POST
  if (req.method === "POST" && (
    req.path === "/contact_enquiries" ||
    req.path === "/quote_requests" ||
    req.path === "/newsletter_subscribers" ||
    req.path === "/investor_enquiries" ||
    req.path === "/partner_applications" ||
    req.path === "/customers/signup" ||
    req.path === "/customers/login" ||
    req.path === "/orders/create" ||
    req.path === "/solar_enquiries" ||
    req.path === "/shipping/check-delivery" ||
    req.path === "/coupons/verify"
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

// ─── E-COMMERCE ENDPOINTS ───────────────────────────────────────────────────

// Customer Sign Up
app.post("/api/customers/signup", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email and password are required" });
    }
    const existing = await prisma.customer.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const customer = await prisma.customer.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
      }
    });

    res.json({
      token: "customer-token-" + customer.id,
      id: customer.id,
      name: customer.name,
      email: customer.email,
    });
  } catch (error) {
    console.error("Customer Signup Error:", error);
    res.status(500).json({ error: "Failed to create customer account: " + error.message });
  }
});

// Customer Login
app.post("/api/customers/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const customer = await prisma.customer.findUnique({ where: { email } });
    if (!customer) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const valid = await bcrypt.compare(password, customer.password);
    if (!valid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.json({
      token: "customer-token-" + customer.id,
      id: customer.id,
      name: customer.name,
      email: customer.email,
    });
  } catch (error) {
    console.error("Customer Login Error:", error);
    res.status(500).json({ error: "Failed to login: " + error.message });
  }
});

// Customer Profile (Requires Authentication)
app.get("/api/customer/profile", requireAuth, async (req, res) => {
  if (req.user.role !== "customer") {
    return res.status(403).json({ error: "Access denied" });
  }
  try {
    const customer = await prisma.customer.findUnique({
      where: { id: req.user.id }
    });
    if (!customer) return res.status(404).json({ error: "Customer not found" });
    const { password, ...safeData } = customer;
    res.json(safeData);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch profile: " + e.message });
  }
});

// Customer Profile Update (Requires Authentication)
app.post("/api/customer/profile/update", requireAuth, async (req, res) => {
  if (req.user.role !== "customer") {
    return res.status(403).json({ error: "Access denied" });
  }
  try {
    const { name, phone, address_line1, address_line2, city, state, postal_code } = req.body;
    const updated = await prisma.customer.update({
      where: { id: req.user.id },
      data: {
        name,
        phone,
        address_line1,
        address_line2,
        city,
        state,
        postal_code
      }
    });
    const { password, ...safeData } = updated;
    res.json(safeData);
  } catch (e) {
    res.status(500).json({ error: "Failed to update profile: " + e.message });
  }
});

// Fetch Customer's Orders (Requires Authentication)
app.get("/api/customer/orders", requireAuth, async (req, res) => {
  if (req.user.role !== "customer") {
    return res.status(403).json({ error: "Access denied" });
  }
  try {
    const orders = await prisma.order.findMany({
      where: { customer_id: req.user.id },
      include: {
        order_items: {
          include: { product: true }
        }
      },
      orderBy: { created_at: "desc" }
    });
    res.json(orders);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch orders: " + e.message });
  }
});

// Helper: Send Welcome and Order Notification Emails (Non-blocking)
async function sendWelcomeAndOrderEmails(customer, order, autoPassword) {
  try {
    const rows = await prisma.systemSetting.findMany();
    const settings = {};
    rows.forEach((r) => {
      settings[r.key] = r.value;
    });

    const nodemailer = require("nodemailer");
    const transporter = nodemailer.createTransport({
      host: settings.smtp_host || "smtp.gmail.com",
      port: parseInt(settings.smtp_port || "587", 10),
      secure: settings.smtp_secure === "true" || settings.smtp_secure === true,
      auth: {
        user: settings.smtp_user || "info@flashrenewable.com",
        pass: settings.smtp_pass || "mock-pass"
      }
    });

    const fromEmail = settings.smtp_from_email || settings.smtp_user || "info@flashrenewable.com";
    const adminNotificationEmail = settings.smtp_to_email || "info@flashrenewable.com";

    // 1. Email to Customer (Welcome + Order Confirmation)
    let customerHtml = `
      <div style="font-family: sans-serif; max-width: 600px; color: #1b2430; border: 1px solid #e7edf5; padding: 25px; border-radius: 12px;">
        <h2 style="color: #0b2340; margin-top: 0;">Welcome to FLASH Solar!</h2>
        <p>Dear ${customer.name},</p>
        <p>Thank you for choosing FLASH Renewable Energy Solutions. Your customer account has been automatically created so you can track your orders and download tax invoices.</p>
        
        <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 20px 0;">
          <h4 style="margin-top: 0; color: #0b2340;">Your Account Access Details:</h4>
          <p style="margin: 5px 0;"><strong>Portal Login URL:</strong> <a href="https://www.flashrenewable.com/customer/login">https://www.flashrenewable.com/customer/login</a></p>
          <p style="margin: 5px 0;"><strong>Username:</strong> ${customer.email}</p>
          ${autoPassword ? `<p style="margin: 5px 0;"><strong>Password:</strong> ${autoPassword}</p>` : `<p style="margin: 5px 0;">Use your existing account password to log in.</p>`}
        </div>

        <h3 style="color: #0b2340;">Order Confirmation: ${order.order_number}</h3>
        <p>Your order of total <strong>₹${order.total_amount.toLocaleString("en-IN")}</strong> is received and is being processed by our logistics crew.</p>
        <p>A shipping manager will contact you at <strong>${order.shipping_phone}</strong> to coordinate unloading times.</p>
        
        <hr style="border-top: 1px solid #e2e8f0; margin: 25px 0;" />
        <p style="font-size: 11px; color: #64748b; text-align: center;">This is an automated shipping confirmation. Please do not reply directly to this mail.</p>
      </div>
    `;

    await transporter.sendMail({
      from: `FLASH Solar <${fromEmail}>`,
      to: customer.email,
      subject: `Welcome to FLASH & Order Confirmation: ${order.order_number}`,
      html: customerHtml
    });

    // 2. Email to Admin
    let adminHtml = `
      <div style="font-family: sans-serif; max-width: 600px; color: #1b2430; border: 1px solid #e7edf5; padding: 25px; border-radius: 12px;">
        <h2 style="color: #0b2340; margin-top: 0;">New Order & Customer Signup Notification</h2>
        <p><strong>Customer:</strong> ${customer.name} (${customer.email})</p>
        <p><strong>Phone:</strong> ${customer.phone}</p>
        <p><strong>Order Reference:</strong> ${order.order_number}</p>
        <p><strong>Total Amount:</strong> ₹${order.total_amount.toLocaleString("en-IN")}</p>
        <p><strong>Delivery Address:</strong> ${order.shipping_address}, ${order.shipping_city}, ${order.shipping_state} - ${order.shipping_postal_code}</p>
        <p><strong>Payment Method:</strong> ${order.payment_method.toUpperCase()}</p>
        <br />
        <a href="https://www.flashrenewable.com/login" style="background-color: #0b2340; color: white; padding: 10px 18px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 12px;">Manage Order in Dashboard</a>
      </div>
    `;

    await transporter.sendMail({
      from: `FLASH System Notification <${fromEmail}>`,
      to: adminNotificationEmail,
      subject: `[ALERT] New Order & Signup: ${order.order_number} by ${customer.name}`,
      html: adminHtml
    });

    console.log("Welcome and Order notification emails sent successfully.");
  } catch (err) {
    console.error("Nodemailer execution failed, ignoring to prevent order flow blocking:", err.message);
  }
}

// Place Order (Public/Guest or Registered Customer Checkout)
app.post("/api/orders/create", async (req, res) => {
  try {
    const {
      cart,
      shipping_name,
      shipping_phone,
      shipping_address,
      shipping_city,
      shipping_state,
      shipping_postal_code,
      payment_method,
      coupon_code,
      shipping_email,
      email 
    } = req.body;

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    if (!shipping_name || !shipping_address || !shipping_city || !shipping_state || !shipping_postal_code) {
      return res.status(400).json({ error: "Missing required shipping address fields" });
    }

    const emailVal = shipping_email || email;
    if (!emailVal) {
      return res.status(400).json({ error: "Email address is required for order signup." });
    }

    // 1. Determine customerId (logged in, or auto-signup by email)
    let customerId = null;
    let autoPassword = null;
    let activeCustomer = null;
    
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      if (token.startsWith("customer-token-")) {
        const testId = token.replace("customer-token-", "");
        activeCustomer = await prisma.customer.findUnique({ where: { id: testId } });
        if (activeCustomer) {
          customerId = activeCustomer.id;
        }
      }
    }

    if (!activeCustomer) {
      // Guest checkout: check if customer already exists with this email
      let customer = await prisma.customer.findUnique({ where: { email: emailVal } });
      if (!customer) {
        // Automatically sign up guest customer!
        autoPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(autoPassword, 10);
        customer = await prisma.customer.create({
          data: {
            email: emailVal,
            name: shipping_name,
            password: hashedPassword,
            phone: shipping_phone || "",
            address_line1: shipping_address || "",
            city: shipping_city || "",
            state: shipping_state || "",
            postal_code: shipping_postal_code || ""
          }
        });
      }
      activeCustomer = customer;
      customerId = customer.id;
    }

    // Execute checkout inside a database transaction to verify/decrement stock
    const result = await prisma.$transaction(async (tx) => {
      let subtotal = 0;
      let totalWeight = 0;
      const orderItemsData = [];

      for (const item of cart) {
        const product = await tx.product.findUnique({
          where: { id: item.id }
        });

        if (!product) {
          throw new Error(`Product not found: ${item.id}`);
        }

        if (product.manage_stock) {
          if (product.stock_quantity < item.quantity) {
            throw new Error(`Insufficient stock for product "${product.name}". Available: ${product.stock_quantity}, Requested: ${item.quantity}`);
          }

          // Decrement stock
          await tx.product.update({
            where: { id: product.id },
            data: {
              stock_quantity: product.stock_quantity - item.quantity
            }
          });
        }

        const price = product.sale_price ?? product.price;
        const total = price * item.quantity;
        subtotal += total;
        totalWeight += (product.weight || 0) * item.quantity;

        orderItemsData.push({
          product_id: product.id,
          quantity: item.quantity,
          price,
          total
        });
      }

      // Calculate Shipping charges based on Pincode and totalWeight
      let shippingCharge = 0;
      const zone = await tx.shippingZone.findUnique({
        where: { pincode: shipping_postal_code }
      });
      if (zone) {
        if (!zone.available) {
          throw new Error(`Sorry, we do not ship heavy products to pincode ${shipping_postal_code}.`);
        }
        shippingCharge = zone.base_charge + (zone.per_kg_rate * totalWeight);
      } else if (totalWeight > 0) {
        // Fallback default shipping if weight > 0 and no pincode rule is defined
        shippingCharge = 250 + (15 * totalWeight);
      }

      // Apply Coupon discount
      let discount = 0;
      if (coupon_code) {
        const coupon = await tx.coupon.findUnique({
          where: { code: coupon_code }
        });
        if (coupon && coupon.active) {
          if (subtotal >= coupon.min_order_val) {
            if (coupon.discount_type === "fixed") {
              discount = coupon.discount_value;
            } else if (coupon.discount_type === "percentage") {
              discount = (subtotal * coupon.discount_value) / 100;
            }
          }
        }
      }

      const totalAmount = Math.max(0, (subtotal + (subtotal * 0.18) + shippingCharge) - discount);

      // Generate Invoice & Order numbers
      const timestamp = Date.now().toString().slice(-6);
      const random = Math.floor(100 + Math.random() * 900);
      const orderNumber = `FL-ORD-${timestamp}-${random}`;
      const invoiceNumber = `FL-INV-${timestamp}-${random}`;

      // Create Order
      const order = await tx.order.create({
        data: {
          order_number: orderNumber,
          customer_id: customerId,
          total_amount: totalAmount,
          shipping_name,
          shipping_phone,
          shipping_address,
          shipping_city,
          shipping_state,
          shipping_postal_code,
          payment_method: payment_method || "cod",
          order_items: {
            create: orderItemsData
          }
        },
        include: {
          order_items: true
        }
      });

      // Automatically generate invoice
      await tx.invoice.create({
        data: {
          invoice_number: invoiceNumber,
          order_id: order.id,
          amount: totalAmount,
          status: "issued"
        }
      });

      return order;
    });

    // Trigger emails in background
    sendWelcomeAndOrderEmails(activeCustomer, result, autoPassword).catch(console.error);

    res.json({ success: true, order: result });
  } catch (error) {
    console.error("Checkout Transaction Error:", error);
    res.status(400).json({ error: error.message });
  }
});

// Pincode Shipping Availability and Charge Check
app.post("/api/shipping/check-delivery", async (req, res) => {
  try {
    const { pincode, totalWeight } = req.body;
    if (!pincode) return res.status(400).json({ error: "Pincode required" });
    const weight = parseFloat(totalWeight) || 0;

    const zone = await prisma.shippingZone.findUnique({
      where: { pincode }
    });

    if (!zone) {
      if (weight > 0) {
        // Fallback default shipping
        const fee = 250 + (15 * weight);
        return res.json({ available: true, charge: fee, message: "Standard Logistics Shipping Rates applied." });
      }
      return res.json({ available: true, charge: 0, message: "Free local courier delivery." });
    }

    if (!zone.available) {
      return res.json({ available: false, charge: 0, message: "Delivery is currently unavailable for heavy loads in this area." });
    }

    const fee = zone.base_charge + (zone.per_kg_rate * weight);
    res.json({ available: true, charge: fee, message: "Delivery available." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Coupon verification
app.post("/api/coupons/verify", async (req, res) => {
  try {
    const { code, subtotal } = req.body;
    if (!code) return res.status(400).json({ error: "Coupon code required" });

    const coupon = await prisma.coupon.findUnique({
      where: { code }
    });

    if (!coupon || !coupon.active) {
      return res.status(400).json({ error: "Invalid or inactive coupon code" });
    }

    const val = parseFloat(subtotal) || 0;
    if (val < coupon.min_order_val) {
      return res.status(400).json({ error: `Minimum order value for this coupon is ₹${coupon.min_order_val}` });
    }

    let discount = 0;
    if (coupon.discount_type === "fixed") {
      discount = coupon.discount_value;
    } else if (coupon.discount_type === "percentage") {
      discount = (val * coupon.discount_value) / 100;
    }

    res.json({ valid: true, code: coupon.code, discount_value: discount, discount_type: coupon.discount_type });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Convert Custom Solar Enquiry to a formal Quotation
app.post("/api/admin/enquiries/convert-to-quote", requireAuth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access Denied: Only Admin can issue quotations" });
  }
  try {
    const { enquiryId, items, discount } = req.body;
    if (!enquiryId || !items || !Array.isArray(items)) {
      return res.status(400).json({ error: "Missing required enquiryId or quotation items" });
    }

    const enquiry = await prisma.solarEnquiry.findUnique({
      where: { id: enquiryId }
    });
    if (!enquiry) return res.status(404).json({ error: "Solar Enquiry not found" });

    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(100 + Math.random() * 900);
    const quotationNumber = `FL-QT-${timestamp}-${random}`;

    let subtotal = 0;
    const formattedItems = items.map((it) => {
      const price = parseFloat(it.price) || 0;
      const qty = parseInt(it.quantity, 10) || 1;
      const total = price * qty;
      subtotal += total;
      return {
        name: it.name,
        quantity: qty,
        price,
        total
      };
    });

    const discVal = parseFloat(discount) || 0;
    const totalAmount = Math.max(0, subtotal - discVal);

    // Create Quotation
    const quotation = await prisma.quotation.create({
      data: {
        quotation_number: quotationNumber,
        enquiry_id: enquiryId,
        customer_name: enquiry.name,
        customer_email: enquiry.email,
        customer_phone: enquiry.phone,
        items: JSON.stringify(formattedItems),
        total_amount: totalAmount,
        status: "sent",
        valid_until: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) // Valid for 15 days
      }
    });

    // Update Enquiry status
    await prisma.solarEnquiry.update({
      where: { id: enquiryId },
      data: { status: "quoted" }
    });

    res.json(quotation);
  } catch (error) {
    res.status(500).json({ error: "Failed to convert enquiry to quotation: " + error.message });
  }
});

// Convert Quotation into an Order
app.post("/api/admin/quotes/convert-to-order", requireAuth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access Denied: Only Admin can convert quotes to orders" });
  }
  try {
    const { quotationId } = req.body;
    if (!quotationId) return res.status(400).json({ error: "Quotation ID required" });

    const quote = await prisma.quotation.findUnique({
      where: { id: quotationId },
      include: { enquiry: true }
    });

    if (!quote) return res.status(404).json({ error: "Quotation not found" });
    if (quote.status === "accepted") {
      return res.status(400).json({ error: "Quotation has already been converted to an order." });
    }

    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(100 + Math.random() * 900);
    const orderNumber = `FL-ORD-${timestamp}-${random}`;
    const invoiceNumber = `FL-INV-${timestamp}-${random}`;

    // Read item list
    const items = JSON.parse(quote.items);

    const result = await prisma.$transaction(async (tx) => {
      // Create Order
      const order = await tx.order.create({
        data: {
          order_number: orderNumber,
          customer_id: quote.enquiry?.customer_id || null,
          total_amount: quote.total_amount,
          shipping_name: quote.customer_name,
          shipping_phone: quote.customer_phone || "",
          shipping_address: quote.enquiry?.location || "Address Specified in Quote",
          shipping_city: "QuoteCity",
          shipping_state: "QuoteState",
          shipping_postal_code: "000000",
          payment_method: "quotation",
          payment_status: "pending",
          quotation_id: quote.id
        }
      });

      // Create invoice
      await tx.invoice.create({
        data: {
          invoice_number: invoiceNumber,
          order_id: order.id,
          amount: quote.total_amount,
          status: "issued"
        }
      });

      // Update quote status
      await tx.quotation.update({
        where: { id: quote.id },
        data: { status: "accepted" }
      });

      // Update enquiry status
      if (quote.enquiry_id) {
        await tx.solarEnquiry.update({
          where: { id: quote.enquiry_id },
          data: { status: "ordered" }
        });
      }

      return order;
    });

    res.json({ success: true, order: result });
  } catch (error) {
    res.status(550).json({ error: "Failed to convert quote to order: " + error.message });
  }
});

// Admin generate credit note manual endpoint
app.post("/api/admin/credit-notes/create", requireAuth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access Denied: Only Admin can create credit notes" });
  }
  try {
    const { orderId, amount, reason } = req.body;
    if (!orderId || !amount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) return res.status(404).json({ error: "Order not found" });

    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(100 + Math.random() * 900);
    const creditNoteNumber = `FL-CN-${timestamp}-${random}`;

    const creditNote = await prisma.creditNote.create({
      data: {
        credit_note_number: creditNoteNumber,
        order_id: orderId,
        amount: parseFloat(amount),
        reason
      }
    });

    res.json(creditNote);
  } catch (error) {
    res.status(500).json({ error: "Failed to generate credit note: " + error.message });
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