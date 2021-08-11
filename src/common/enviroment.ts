export const enviroment = {
  server: { port: process.env.SERVER_PORT || 3000 },
  db: { url: process.env.DB_URL || "mongodb://localhost/blog-backend" },
  app: {
    version: "1.0.0",
    env: process.env.NODE_END || "dev",
    name: "blog-backend",
  },
  security: {
    apiSecret: process.env.API_SECRET || "blog-backend-secret",
    saltRounds: process.env.SALT_ROUNDS || 10,
  },
};
