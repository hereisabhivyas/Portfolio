let serverModule: any;
const loadServerModule = async () => {
  const candidates = [
    // Nitro / Vercel output
    "../.output/server/index.mjs",
    "../.output/server/server.mjs",
    // Older dist-based server bundle
    "../dist/server/server.js",
    // Fallback to source during development
    "../src/server",
  ];

  for (const path of candidates) {
    try {
      return await import(path);
    } catch (e) {
      // continue to next candidate
    }
  }

  throw new Error("No server bundle found (checked .output, dist, and src)");
};


export default async function handler(req: any, res: any) {
  try {
    if (!serverModule) {
      serverModule = await loadServerModule();
    }
    const protocol = req.headers["x-forwarded-proto"] || "http";
    const host = req.headers.host || "localhost";
    const url = new URL(req.url || "/", `${protocol}://${host}`);

    const requestInit: any = {
      method: req.method,
      headers: req.headers,
    };

    if (req.method !== "GET" && req.method !== "HEAD") {
      requestInit.body = req;
    }

    const request = new Request(url.toString(), requestInit);

    const response: Response = await serverModule.default.fetch(request, {}, {});

    res.statusCode = response.status;
    response.headers.forEach((value, key) => {
      // Vercel/res.setHeader expects header names in lowercase
      res.setHeader(key, value);
    });

    const arrayBuffer = await response.arrayBuffer();
    res.end(Buffer.from(arrayBuffer));
  } catch (err: any) {
    console.error("API handler error:", err);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
}
