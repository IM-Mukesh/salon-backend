// src/utils/salons3.ts
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
dotenv.config();

const s3 = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
});

export const generateUploadUrl = async () => {
  const key = `${Date.now()}-${uuidv4()}.jpg`;

  const command = new PutObjectCommand({
    Bucket: process.env.S3_SALON_BUCKET!,
    Key: key,
    ContentType: "image/jpeg",
  });

  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 60 });

  const publicUrl = `https://${process.env.S3_SALON_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${key}`;

  return { uploadUrl, publicUrl };
};
