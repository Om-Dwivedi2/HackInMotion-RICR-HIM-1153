import dns from "dns";

dns.setServers([
  "8.8.8.8",
  "1.1.1.1"
]);

import { envConfig } from "./config/env.config.js";
import { connectDB } from "./config/db.config.js";
import mongoose from "mongoose";
import app from "./app.js";

const startServer = async () => {
  // Database connection must happen before HTTP server starts
  await connectDB();

  const server = app.listen(envConfig.port, () => {
    console.log(`CareerLens server running on port ${envConfig.port}`);
  });

  // Graceful shutdown handling
  const shutdown = async () => {
    console.log("\nShutting down CareerLens server...");
    
    server.close(async (err) => {
      if (err) {
        console.error("Error during server closure:", err);
      }
      
      try {
        await mongoose.connection.close();
        console.log("MongoDB connection closed.");
        console.log("Server shutdown complete.");
        process.exit(0);
      } catch (dbErr) {
        console.error("Error during database disconnection:", dbErr);
        process.exit(1);
      }
    });
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
};

startServer();
