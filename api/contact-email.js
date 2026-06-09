// Vercel Serverless Function: POST /api/send-email
// Uses SMTP env vars on Vercel:
//   SMTP_HOST, SMTP_PORT, SMTP_SECURE ("true"/"false"), SMTP_USER, SMTP_PASS
//   RECEIVER_EMAIL - destination inbox

import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const { name = "", email = "", biz = "", msg = "" } = body;

    if (!name || !email || !msg) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_SECURE,
      SMTP_USER,
      SMTP_PASS,
      RECEIVER_EMAIL,
    } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
      console.error("SMTP env vars are not fully set");
      return res.status(500).json({ error: "Email service is not configured" });
    }

    const port = Number(SMTP_PORT);
    const secure =
      typeof SMTP_SECURE === "string"
        ? SMTP_SECURE.toLowerCase() === "true"
        : port === 465;

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const to = RECEIVER_EMAIL || SMTP_USER;

    const html = `
      <h2>New portfolio contact</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Project type:</strong> ${escapeHtml(biz)}</p>
      <p><strong>Message:</strong></p>
      <pre style="white-space:pre-wrap;font-family:inherit">${escapeHtml(msg)}</pre>
    `;

    const info = await transporter.sendMail({
      from: `"Portfolio Contact" <${SMTP_USER}>`,
      to,
      replyTo: email,
      subject: `Portfolio inquiry from ${name}`,
      html,
      text: `Name: ${name}\nEmail: ${email}\nProject: ${biz}\n\n${msg}`,
    });

    return res.status(200).json({ ok: true, id: info.messageId });
  } catch (err) {
    console.error("send-email handler error", err);
    return res.status(500).json({ error: err?.message || "Server error" });
  }
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}