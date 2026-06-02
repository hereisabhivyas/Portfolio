import type { IncomingMessage, ServerResponse } from "node:http";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import { handleSendEmailRequest } from "./src/lib/api/send-email";

const env = loadEnv(process.env.NODE_ENV || "development", process.cwd(), "");

for (const key of [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_SECURE",
  "SMTP_USER",
  "SMTP_PASS",
  "RECEIVER_EMAIL",
  "CONTACT_FROM",
  "CONTACT_TO",
  "NODE_ENV",
]) {
  if (env[key] != null && process.env[key] == null) {
    process.env[key] = env[key];
  }
}

function readRequestBody(request: IncomingMessage) {
  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    request.on("data", (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
    request.on("end", () => resolve(Buffer.concat(chunks)));
    request.on("error", reject);
  });
}

async function handleDevApiRequest(
  request: IncomingMessage,
  response: ServerResponse,
) {
  const protocol = request.headers["x-forwarded-proto"] ?? "http";
  const host = request.headers.host ?? "localhost:8080";
  const url = new URL(request.url ?? "/", `${protocol}://${host}`);

  const headers = new Headers();
  for (const [key, value] of Object.entries(request.headers)) {
    if (Array.isArray(value)) {
      headers.set(key, value.join(", "));
    } else if (value != null) {
      headers.set(key, value);
    }
  }

  const requestInit: RequestInit = { method: request.method, headers };
  if (request.method !== "GET" && request.method !== "HEAD") {
    requestInit.body = await readRequestBody(request);
  }

  const apiResponse = await handleSendEmailRequest(new Request(url.toString(), requestInit));

  response.statusCode = apiResponse.status;
  apiResponse.headers.forEach((value, key) => {
    response.setHeader(key, value);
  });

  const body = Buffer.from(await apiResponse.arrayBuffer());
  response.end(body);
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
    {
      name: "dev-send-email-api",
      configureServer(server) {
        server.middlewares.use(async (request, response, next) => {
          if (request.method === "POST" && request.url?.startsWith("/api/send-email")) {
            try {
              await handleDevApiRequest(request, response);
            } catch (error) {
              console.error("Dev API handler error:", error);
              response.statusCode = 500;
              response.setHeader("content-type", "application/json; charset=utf-8");
              response.end(JSON.stringify({ error: "Internal Server Error" }));
            }

            return;
          }

          next();
        });
      },
    },
  ],
  server: {
    host: "::",
    port: 8080,
  },
});
