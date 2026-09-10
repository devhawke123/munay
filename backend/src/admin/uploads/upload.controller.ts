import { randomUUID } from "node:crypto";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextFunction, Request, Response } from "express";
import multer from "multer";
import { HttpError } from "../shared/middleware/errorHandler.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOAD_DIR = path.resolve(__dirname, "../../../uploads/products");
if (!existsSync(UPLOAD_DIR)) mkdirSync(UPLOAD_DIR, { recursive: true });

export const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${randomUUID()}${ext}`);
  },
});

export function imageFileFilter(
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) {
  if (!/^image\/(png|jpeg|webp)$/.test(file.mimetype)) {
    cb(new HttpError(400, "Only PNG, JPEG, and WEBP images are allowed"));
    return;
  }
  cb(null, true);
}

export function uploadImages(req: Request, res: Response, next: NextFunction) {
  try {
    const files = req.files as Express.Multer.File[] | undefined;
    if (!files || files.length === 0) throw new HttpError(400, "No files uploaded");
    res.status(201).json({ paths: files.map((f) => `/uploads/products/${f.filename}`) });
  } catch (err) {
    next(err);
  }
}
