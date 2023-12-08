import { decrypt, encrypt } from '../../middleware/encryption';
import { RES_STATUS, RES_TYPES } from '../../constant';
import { sendResponse } from '../../utils';
import { backupDatabase } from '../../utils/database.backup';

class EncrptionController {
    async encriptions(req, res, next) {
        try {
            const encriptions = req.body.data;
            const data = encrypt(encriptions);
            const response = {
                responseType: RES_STATUS.CREATE,
                data: data,
                message: RES_TYPES.NO_MSG,
            };
            return sendResponse(res, response);
        } catch (error) {
            return next(error);
        }
    }

    async decrypt(req, res, next) {
        try {
            const dcrpt = req.body.data;
            const data = JSON.parse(decrypt(dcrpt));
            const response = {
                responseType: RES_STATUS.CREATE,
                data: data,
                message: RES_TYPES.NO_MSG,
                total: 111,
                pageIndex: 6,
                pageSize: 9,
            };
            return sendResponse(res, response);
        } catch (error) {
            return next(error);
        }
    }
}

export const encriyptionController = new EncrptionController();
