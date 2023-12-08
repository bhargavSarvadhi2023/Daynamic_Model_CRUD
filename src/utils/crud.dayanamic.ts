import * as fs from 'fs';
import { logger } from '../logger/logger';
import * as path from 'path';

export const createDaynamicCrud = (model: string): void => {
    // const remove = 'Model';
    // const newModel = model.slice(0, -remove.length);
    // const newModel = model.slice(0, -remove.length);

    const controller = model.toLowerCase();
    const allCapcontroller = model.toUpperCase();
    const Capcontroller = model.charAt(0).toUpperCase() + model.slice(1);

    const controllerContent = `

import { AppError,sendResponse } from '../../utils';
import { ERRORTYPES, RES_TYPES, MODEL ,RES_STATUS} from '../../constant';
import { db } from 'model';
    
    export class ${Capcontroller}Controller {
 

    async create(req, res, next) {
        try {
            const Data = await db[MODEL.${allCapcontroller}].create(req.body.data);
            const response = {
                responseType: RES_STATUS.CREATE,
                data: Data,
                message: RES_TYPES.NO_MSG,
            };
            return sendResponse(res, response);
        } catch (err) {
            return next(err);
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const [data] = await db[MODEL.${allCapcontroller}].update(req.body.data, {
                where: { id },
            });
            if (!data || data === 0)
                throw new AppError(
                    RES_TYPES.ID_NOT_FOUND,
                    ERRORTYPES.NOT_FOUND,
                );
            const response = {
                responseType: RES_STATUS.UPDATE,
                data: data,
                message: RES_TYPES.NO_MSG,
            };
            return sendResponse(res, response);
        } catch (err) {
            return next(err);
        }
    }

    async delete(req, res, next) {
        const { id } = req.params;
        try {
            const deleted = await db[MODEL.${allCapcontroller}].destroy({ where: { id } });
            if (deleted) {
            const response = {
                responseType: RES_STATUS.DELETE,
                data: deleted,
                message: RES_TYPES.NO_MSG,
            };
            return sendResponse(res, response);
            } else {
                return next(
                    new AppError(RES_TYPES.ID_NOT_FOUND, ERRORTYPES.NOT_FOUND),
                );
            }
        } catch (err) {
            return next(err);
        }
    }

    async getData(req, res, next) {
        try {
            const data = await db[MODEL.${allCapcontroller}].findAll({
                order: [['updatedAt', 'ASC']],
            });
            if (data.length) {
            const response = {
                responseType: RES_STATUS.GET,
                data: data,
                message: RES_TYPES.NO_MSG,
                total: 111,
                pageIndex: 6,
                pageSize: 9,
            };
            return sendResponse(res, response);
            }
            throw new AppError(RES_TYPES.NO_FOUND, ERRORTYPES.NOT_FOUND);
        } catch (err) {
            return next(err);
        }
    }
}

export const ${controller}Controller = new ${Capcontroller}Controller();

`;
    const indexfileContent = `
        
    import { ${controller}Controller } from './${controller}.controller';

    export { ${controller}Controller };
    `;
    const controllerPath = path.join(__dirname, `../controller/${controller}`);
    const controllerFilePath = path.join(
        controllerPath,
        `${controller}.controller.ts`,
    );
    const indexPath = path.join(controllerPath, 'index.ts');

    if (!fs.existsSync(controllerPath)) {
        fs.mkdirSync(controllerPath, { recursive: true });
        fs.writeFileSync(controllerFilePath, controllerContent);
        fs.writeFileSync(indexPath, indexfileContent);
        logger.info('Successfully created files');
    }
    logger.info('already exists');
};
