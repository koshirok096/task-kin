// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import passport from "passport";
import passport from 'passport';
import GoogleStrategy from 'passport-google-oidc';
import dotenv from 'dotenv';

dotenv.config();

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: "/auth/google/callback",
			scope: ["profile", "email"],
		},
		function (accessToken, refreshToken, profile, callback) {
			console.log(accessToken, refreshToken);
			return callback(null, profile);
		}
		
	)
);
passport.serializeUser(function(user, done) {
	done(null, user);
});
  
passport.deserializeUser(function(user, done) {
	done(null, user);
});

export default passport;