// Vercel Serverless Function: POST /api/send-email
// Requires env vars on Vercel:
//   RESEND_API_KEY      - your Resend API key
//   CONTACT_TO_EMAIL    - (optional) destination inbox, defaults to abhivyas571@gmail.com
//   CONTACT_FROM_EMAIL  - (optional) verified sender, defaults to onboarding@resend.dev

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

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not set");
      return res.status(500).json({ error: "Email service is not configured" });
    }

    const to = process.env.CONTACT_TO_EMAIL || "abhivyas571@gmail.com";
    const from = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

    const html = `
      <h2>New portfolio contact</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Project type:</strong> ${escapeHtml(biz)}</p>
      <p><strong>Message:</strong></p>
      <pre style="white-space:pre-wrap;font-family:inherit">${escapeHtml(msg)}</pre>
    `;

    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Portfolio inquiry from ${name}`,
        html,
      }),
    });

    const data = await r.json().catch(() => ({}));
    if (!r.ok) {
      console.error("Resend error", r.status, data);
      return res
        .status(500)
        .json({ error: data?.message || "Failed to send email" });
    }

    return res.status(200).json({ ok: true, id: data?.id });
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
