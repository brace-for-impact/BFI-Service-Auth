import express, { Request, Response } from "express"
import shared from "@brace-for-impact/bfi-shared"

const app=express()

app.use(shared.middlewares.apiLogger({
    logHttpMethod: true,
    logRequestUrl: true,
    logRequestBody: true,
    logResponseTime: true,
    logStatusCode: true,
  }))

app.get("/api/health", (req: Request, res: Response) => {
    res.status(200).json({
        status: "ok",
        message: "Auth Service is running",
    })
})

export default app