/**
 * @file api/errorHandling.ts
 * @author dworac <mail@dworac.com>
 *
 *     All errors should be handled using the HttpException class. This file also includes the express error middleware.
 */
import { Application, NextFunction, Request, Response } from 'express';

export class HttpException extends Error {
	status: number;

	message: string;

	constructor(status: number, message: string) {
		super(message);
		this.status = status;
		this.message = message;
	}
}

export default (app: Application) => {
	app.use(
		(
			error: HttpException,
			_: Request,
			response: Response,
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			_next: NextFunction,
		) => {
			const status = error.status || 500;
			const message = error.message || 'Something went wrong';
			response.status(status).json({
				message,
			});
		},
	);
};
