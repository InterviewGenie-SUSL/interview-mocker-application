import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_B0JophF3VslW@ep-purple-darkness-a53an2zp-pooler.us-east-2.aws.neon.tech/AI%20interview%20mocker?sslmode=require",
  },
});

