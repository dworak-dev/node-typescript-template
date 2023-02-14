import { Application } from 'express';
import setupDefaultRoute from './defaultRoute';

export default (app: Application) => {
	setupDefaultRoute(app);
};
