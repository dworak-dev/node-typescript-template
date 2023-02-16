import passport from 'passport';
import User from '../../typeorm/models/User';

passport.deserializeUser(async (id: number, done) => {
	const user = await User.findOne({ where: { id } });
	if (user) done(null, user);
});
