import { sendResponse } from '../../utils';
import { db } from '../../model/index';
import { RES_STATUS, RES_TYPES } from '../../constant';

class CountryController {
    async getCountry(req, res, next) {
        try {
            const country = await db.countryModel.findAll({
                include: [
                    {
                        model: db.stateModel,
                        include: db.cityModel,
                    },
                ],
            });

            const response = {
                responseType: RES_STATUS.GET,
                data: country,
                message: RES_TYPES.NO_MSG,
            };
            return sendResponse(res, response);
        } catch (error) {
            next(error);
        }
    }

    async getcities(req, res, next) {
        try {
            const city = await db.cityModel.findAll({
                attributes: ['cityName'],
                include: [
                    {
                        model: db['stateModel'],
                        attributes: ['stateName'],
                        include: [
                            {
                                model: db['countryModel'],
                                attributes: ['countryName'],
                            },
                        ],
                    },
                ],
            });

            console.log(city);

            const response = {
                responseType: RES_STATUS.GET,
                data: city,
                message: RES_TYPES.NO_MSG,
            };
            return sendResponse(res, response);
        } catch (error) {
            next(error);
        }
    }
}
export const countryController = new CountryController();
