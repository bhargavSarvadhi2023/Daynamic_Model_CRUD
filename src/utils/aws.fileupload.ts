import S3 from 'aws-sdk/clients/s3';
import { config } from 'dotenv';
import { ERRORTYPES, RES_TYPES } from '../constant';
import { logger } from '../logger/logger';
import { AppError } from '.';

config();

const region = process.env.REGION;
const bucket = process.env.BUCKET;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const uploadConfig = {
    region,
    bucket,
    accessKeyId,
    secretAccessKey,
};

const s3 = new S3(uploadConfig);

async function getFileName(id, img, parts) {
    return `shidduch_files/${new Date().getTime()}/${id}.${parts}`;
}

export async function uploadImage(id, img, type) {
    try {
        const parts = type.split('/')[1];
        const buf = Buffer.from(img.split(';base64,').pop(), 'base64');
        const filename = await getFileName(id, img, parts);
        const upload = {
            Bucket: bucket,
            Key: filename,
            Body: buf,
        };
        const { Location } = await s3.upload(upload).promise();
        if (!Location)
            throw new AppError(RES_TYPES.NOT_UPLOAD, ERRORTYPES.UNKNOWN_ERROR);
        return Location;
    } catch (error) {
        logger.error(error);
    }
}

export const uploadFileToS3 = async (fileKey, fileContent) => {
    try {
        const contentType = 'application/octet-stream';
        const file = `${process.env.FOLDER_NAME}/${fileKey}`;
        const params = {
            Bucket: bucket,
            Key: file,
            Body: fileContent,
            ContentType: contentType,
        };
        const { Location } = await s3.upload(params).promise();
        if (!Location)
            throw new AppError(RES_TYPES.NOT_UPLOAD, ERRORTYPES.UNKNOWN_ERROR);
        return Location;
    } catch (error) {
        logger.error(`Error uploading file to S3: ${error.message}`);
        throw new AppError(RES_TYPES.NOT_UPLOAD, ERRORTYPES.UNKNOWN_ERROR);
    }
};
