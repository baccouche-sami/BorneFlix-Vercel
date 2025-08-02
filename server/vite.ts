import { createServer as createViteServer } from "vite";
import express from "express";
import path from "path";

export const setupVite = async (app: express.Application, server: any) => {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });

  app.use(vite.middlewares);
};

export const serveStatic = (app: express.Application) => {
  // Serve static files from the dist directory
  app.use(express.static(path.resolve(process.cwd(), "dist"), {
    maxAge: "1y",
    immutable: true,
  }));

  // Serve index.html for all routes (SPA)
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(process.cwd(), "dist", "index.html"));
  });
};

export const log = (message: string) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
};
