import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/../../PDF');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        const fieldnameWithOriginalFilename = `${file.fieldname}-${uniqueSuffix}${ext}`;
        cb(null, fieldnameWithOriginalFilename);
    },
});

export const Pdfupload = multer({ storage: storage }).fields([
    { name: 'employee', maxCount: 1 },
    { name: 'service', maxCount: 1 },
    { name: 'contacts', maxCount: 1 },
]);
