import { lookup as mimeLookup } from 'mime-types';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3 = new S3Client({ region: 'us-east-1' });

export const generateUploadUrl = async (fileName: string, bucketName: string) => {
  try {
    const fileType = mimeLookup(fileName);

    if (!fileType || typeof fileType !== 'string') {
    throw new Error("Unsupported file type");
  }

    const fileKey = `${Date.now()}.${fileName}`; 

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileKey,
      ContentType: fileType,
    });

    const url = await getSignedUrl(s3, command, { expiresIn: 300 }); // 5 mins
    return { url, fileKey };
  } catch (err) {
    console.error(err);
    throw new Error("Failed to generate upload URL");
  }
};
