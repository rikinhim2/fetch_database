
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ValidationChain } from 'express-validator';

import validatorHandler from './validatorHandler';

const handlerWrapper = (
  handler: RequestHandler,
  validators: ValidationChain[] = [],
) => {
  let handlers: RequestHandler[] = [];
  handlers = handlers.concat(validators);
  handlers.push(validatorHandler);

  handlers.push(async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
      if (!res.headersSent) {
        return res.status(400).json({
          message: 'unexpected error',
        });
      }
    } catch (error) {
      next(error);
    }
  });

  return handlers;
};

export default handlerWrapper;
