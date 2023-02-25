/**
 * @file api/auth/index.ts
 * @author dworac <mail@dworac.com>
 *
 * This is the entry point for the authentication middleware. We use passport to authenticate requests.
 */
import './jwt';
import { Application } from 'express';
import passport from 'passport';
import google from './google';
import User from '../../typeorm/entities/User';

export default (app: Application) => {
	// Passport deserialization
	passport.deserializeUser(async (id: number, done) => {
		const user = await User.findOne({ where: { id } });
		if (user) done(null, user);
	});

	// Passport serialization
	passport.serializeUser((user: unknown, done) => {
		done(null, (user as User).id);
	});

	google(app);
};
