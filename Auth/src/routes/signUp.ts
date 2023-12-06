import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../middleware/validate-request';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

router.post('/api/users/signup', [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 and 20 characters')
],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            res.send({});
        }
        const user = User.build({ email, password });
        try {
            await user.save();
        } catch (err) {
            throw new BadRequestError('Email in Use!');
        }
        // Generate JWT and store it on the session object
        const userJwt = jwt.sign({
            id: user.id,
            email: user.email
        },
            // process.env.JWT_KEY!
            'crazysecretkey'
        );
        req.session = {
            jwt: userJwt
        };
        res.status(201).send(user);
    });

export { router as signUpRouter };