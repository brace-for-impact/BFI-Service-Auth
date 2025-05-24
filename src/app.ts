import express, { Request, Response } from "express"
import morgan from "morgan"
import { config } from "./config";
import shared from "@brace-for-impact/bfi-shared"

const app=express()
const port=process.env.PORT || 3000

app.get("/api/health", (req: Request, res: Response) => {
    res.status(200).json({
        status: "ok",
        message: "Auth Service is running",
        data: shared?.config?.testServices?.testConfigService()
    })
})

export default app