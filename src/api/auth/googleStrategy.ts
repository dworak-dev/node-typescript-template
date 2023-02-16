import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import config from '../../utils/config';
import User from '../../typeorm/models/User';

passport.use(
	new GoogleStrategy(
		{
			clientID: config.GOOGLE_CLIENT_ID,
			clientSecret: config.GOOGLE_CLIENT_SECRET,
			callbackURL: config.GOOGLE_CALLBACK,
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				// let user = await UserModel.findOne({ googleId: profile.id });
				let user = await User.findOne({
					where: { googleId: profile.id },
				});
				if (user) {
					user.googleAccessToken = accessToken;
					user.googleRefreshToken = refreshToken;
					await user.save();
				} else {
					user = new User();
					user.googleId = profile.id;
					user.firstName = profile.displayName;
					user.lastName = profile.displayName;
					user.googleAccessToken = accessToken;
					user.googleRefreshToken = refreshToken;
					await user.save();
				}
				done(null, user);
			} catch (err) {
				if (err instanceof Error) {
					done(err, undefined);
				}
			}
		},
	),
);
