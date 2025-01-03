'use strict';

import {winston} from '@strapi/logger'

/**
 * Ignore log messages with health check info.
 */
const ignoreHealthCheck = winston.format((info, opts) => {
    // @ts-ignore
    if (info.message.includes('/health')) {
        return false;
    }
    return info;
});

export default {
    defaultMeta: { service: 'strapi' },
    transports: [
        new winston.transports.Console({
            level: 'http',
            format: winston.format.combine(
                ignoreHealthCheck(),
                winston.format.uncolorize(),
                winston.format.json()
            )
        }),
    ],
};
