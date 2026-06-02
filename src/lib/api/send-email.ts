import nodemailer from "nodemailer";

export type ContactPayload = {
  name?: unknown;
  email?: unknown;
  biz?: unknown;
  msg?: unknown;
};

function toText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function jsonResponse(body: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...(init?.headers ?? {}),
    },
  });
}

export async function handleSendEmailRequest(request: Request) {
  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, { status: 405 });
  }

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return jsonResponse({ error: "Invalid JSON payload" }, { status: 400 });
  }

  const name = toText(payload.name);
  const email = toText(payload.email);
  const biz = toText(payload.biz);
  const msg = toText(payload.msg);

  if (!name || !email || !msg) {
    return jsonResponse({ error: "Name, email, and message are required" }, { status: 400 });
  }

  const smtpHost = toText(process.env.SMTP_HOST);
  const smtpPort = Number.parseInt(toText(process.env.SMTP_PORT) || "0", 10);
  const smtpSecure = toText(process.env.SMTP_SECURE).toLowerCase() === "true";
  const smtpUser = toText(process.env.SMTP_USER);
  const smtpPass = toText(process.env.SMTP_PASS);
  const contactTo = toText(process.env.RECEIVER_EMAIL) || toText(process.env.CONTACT_TO) || smtpUser;
  const contactFrom = toText(process.env.CONTACT_FROM) || smtpUser;

  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !contactFrom) {
    return jsonResponse(
      {
        error:
          "Email service is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and RECEIVER_EMAIL.",
      },
      { status: 500 },
    );
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure || smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  await transporter.sendMail({
    from: contactFrom,
    to: contactTo,
    replyTo: email,
    subject: `Portfolio contact from ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Project type: ${biz || "Not provided"}`,
      "",
      msg,
    ].join("\n"),
  });

  return jsonResponse({ ok: true });
}