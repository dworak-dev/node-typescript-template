import passport from 'passport';
import User from '../../typeorm/models/User';

passport.serializeUser((user: unknown, done) => {
	done(null, (user as User).id);
});
