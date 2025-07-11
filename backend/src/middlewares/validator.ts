import { Request, Response, NextFunction, RequestHandler } from 'express';
import { body, validationResult } from 'express-validator';

const handleValidationErrors: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
};

const validateRegister = [
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters long'),

    body('email')
        .isEmail()
        .withMessage('Please enter a valid email address'),

    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),

    handleValidationErrors
];

const validateLogin = [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email address'),

    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),

    handleValidationErrors
];

export {
    validateRegister,
    validateLogin
};
