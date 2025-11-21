import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  region: process.env.AWS_REGION!,
});

export const uploadFile = async (
  fileBuffer: Buffer,
  fileName: string,
  mimeType: string
): Promise<string> => {
  const result = await s3
    .upload({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: fileName,
      Body: fileBuffer,
      ContentType: mimeType,
      ACL: "public-read",
    })
    .promise();

  return result.Location;
};

export default s3;
