import './serialization';
import './deserealization';
import './googleStrategy';
import './jwtStrategy';
import { Application } from 'express';
import google from './google';

export default (app: Application) => {
	google(app);
};
