import { Express } from "express";
import healthRoutes from "./health.routes";

export const setupRoutes = (app: Express) => {
  app.use("/api/auth/health", healthRoutes);
};
