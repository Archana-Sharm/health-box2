import app from "./app";
import { env } from "./config/env";
import { connectDB } from "./config/db";

async function start(): Promise<void> {
  await connectDB();
  app.listen(env.port, () => {
    // eslint-disable-next-line no-console
    console.log(`Health Box API running on port ${env.port}`);
  });
}

start().catch((error) => {
  // eslint-disable-next-line no-console
  console.error("[server] Failed to start:", error);
  process.exit(1);
});
