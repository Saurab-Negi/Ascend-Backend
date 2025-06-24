import { lookup as mimeLookup } from 'mime-types';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
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

export const removeObjFromS3 = async (file: string) => {
  try {
    const url = new URL(file);
    const objKey = decodeURIComponent(url.pathname.substring(1));
    // console.log("objKey", objKey)
    const bucketName = url.hostname.split(".")[0];
    // console.log("bucketName", bucketName)
  
    const deleteCommand = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: objKey,
    });
  
    await s3.send(deleteCommand);
  } catch (error) {
    console.error("removeObjFromS3 error:", error);
    throw new Error("Failed to remove object from S3");
  }
};
