import { handleSendEmailRequest } from "../src/lib/api/send-email";

function readRequestBody(req: any) {
  return new Promise<string>((resolve, reject) => {
    if (req.method === "GET" || req.method === "HEAD") {
      resolve("");
      return;
    }

    const chunks: Buffer[] = [];
    req.on("data", (chunk: Buffer) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function buildHeaders(headers: any) {
  const normalized = new Headers();

  for (const [key, value] of Object.entries(headers ?? {})) {
    if (Array.isArray(value)) {
      normalized.set(key, value.join(", "));
    } else if (typeof value === "string") {
      normalized.set(key, value);
    }
  }

  return normalized;
}

export default async function handler(req: any, res: any) {
  try {
    const protocol = req.headers["x-forwarded-proto"] || "http";
    const host = req.headers.host || "localhost";
    const url = new URL(req.url || "/", `${protocol}://${host}`);

    const requestInit: RequestInit = {
      method: req.method,
      headers: buildHeaders(req.headers),
    };

    if (req.method !== "GET" && req.method !== "HEAD") {
      requestInit.body = await readRequestBody(req);
    }

    const response = await handleSendEmailRequest(new Request(url.toString(), requestInit));

    res.statusCode = response.status;
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    const arrayBuffer = await response.arrayBuffer();
    res.end(Buffer.from(arrayBuffer));
  } catch (error) {
    console.error("API handler error:", error);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
}