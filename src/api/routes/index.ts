/**
 * @file api/routes/index.ts
 * @author dworac <mail@dworac.com>
 *
 * This file exports all routes.
 */
import { Application } from 'express';
import setupDefaultRoute from './defaultRoute';

export default (app: Application) => {
	setupDefaultRoute(app);
};
