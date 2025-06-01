import { Request, Response, Router } from "express";
import expressAsyncHandler from "express-async-handler";
const router = Router();

router.get("/", expressAsyncHandler((req:Request, res:Response) =>{
  res.status(200).json({ status: true, message: "Healthy" })})
);

export default router;
