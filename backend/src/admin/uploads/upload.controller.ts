import { randomUUID } from "node:crypto";
import { existsSync, mkdirSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextFunction, Request, Response } from "express";
import multer from "multer";
import { HttpError } from "../shared/middleware/errorHandler.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);

// Local: backend/uploads/products. Vercel: never write under /var/task (read-only).
const UPLOAD_DIR = isServerless
  ? path.join(os.tmpdir(), "munay-uploads", "products")
  : path.resolve(__dirname, "../../../uploads/products");

// On Vercel use memory storage so module import never touches the filesystem.
export const storage = isServerless
  ? multer.memoryStorage()
  : multer.diskStorage({
      destination: (_req, _file, cb) => {
        try {
          if (!existsSync(UPLOAD_DIR)) mkdirSync(UPLOAD_DIR, { recursive: true });
          cb(null, UPLOAD_DIR);
        } catch (err) {
          cb(err as Error, UPLOAD_DIR);
        }
      },
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

    // Serverless uploads are ephemeral — catalogue images already live on Supabase Storage.
    if (isServerless) {
      throw new HttpError(
        501,
        "File upload to disk is not available on this host. Use Supabase Storage for product images.",
      );
    }

    res.status(201).json({ paths: files.map((f) => `/uploads/products/${f.filename}`) });
  } catch (err) {
    next(err);
  }
}
