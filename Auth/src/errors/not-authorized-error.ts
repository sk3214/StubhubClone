import { Request, Response, NextFunction } from 'express';

export class NotAuthorizedError extends Error {
    statusCode = 401;

    constructor() {
        super(
            'Not authorized'
        );

        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }

    serializeErrors() {
        return [{ message: 'Not authorized' }];
    }
}