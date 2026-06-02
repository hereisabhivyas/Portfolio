import { handleSendEmailRequest } from "../src/lib/api/send-email";

export default async function handler(req: any, res: any) {
  try {
    const protocol = req.headers["x-forwarded-proto"] || "http";
    const host = req.headers.host || "localhost";
    const url = new URL(req.url || "/", `${protocol}://${host}`);

    const requestInit: RequestInit = {
      method: req.method,
      headers: req.headers,
    };

    if (req.method !== "GET" && req.method !== "HEAD") {
      requestInit.body = req;
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