import { RES_STATUS_CODE } from '../constant';
import { RES_STATUS, RES_TYPES } from '../constant';

const responseMappings = {
    [RES_STATUS.CREATE]: {
        statusCode: RES_STATUS_CODE.CREATE,
        defaultMessage: RES_TYPES.CREATE,
    },
    [RES_STATUS.GET]: {
        statusCode: RES_STATUS_CODE.GET,
        defaultMessage: RES_TYPES.FETCH,
    },
    [RES_STATUS.DELETE]: {
        statusCode: RES_STATUS_CODE.DELETE,
        defaultMessage: RES_TYPES.DELETE,
    },
    [RES_STATUS.UPDATE]: {
        statusCode: RES_STATUS_CODE.UPDATE,
        defaultMessage: RES_TYPES.UPDATE,
    },
    default: { statusCode: 200, defaultMessage: 'Success' },
};

const sendResponse = (res, response) => {
    const mapping =
        responseMappings[response.responseType] || responseMappings.default;
    const { statusCode, defaultMessage } = mapping;
    const message = response.message || defaultMessage;

    if (response.responseType === RES_STATUS.GET) {
        return res.status(statusCode).json({
            success: true,
            statusCode: statusCode,
            data: response.data,
            message: message,
            pagination: {
                total: response.total || 0,
                pageIndex: response.pageIndex || 1,
                pageSize: response.pageSize || 10,
            },
        });
    } else {
        return res.status(statusCode).json({
            success: true,
            statusCode: statusCode,
            data: response.data,
            message: message,
        });
    }
};

export { sendResponse };
