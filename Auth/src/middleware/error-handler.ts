import e, { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log('Something went wrong', err);
    if (err instanceof CustomError) {
        console.log('What happens when notFound is called?')
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }
    res.status(400).send({ errors: [{ message: 'Something went wrong' }] });
}