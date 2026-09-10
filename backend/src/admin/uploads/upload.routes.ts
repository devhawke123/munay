import { Router } from "express";
import multer from "multer";
import * as uploadController from "./upload.controller.js";

const upload = multer({
  storage: uploadController.storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: uploadController.imageFileFilter,
});

export const uploadsRouter = Router();

uploadsRouter.post("/", upload.array("files", 8), uploadController.uploadImages);
