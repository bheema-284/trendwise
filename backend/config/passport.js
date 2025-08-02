// config/passport.js (ES Module Version)

// Fix 1: Import GoogleStrategy as a named export from the library
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

// Fix 2: Add .js extension for local module import
import User from '../models/User.js'; // Your User model

// Fix 3: Change module.exports to ES Module default export
export default function (passport) {
    passport.use(
        new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback'
        },
            async (accessToken, refreshToken, profile, done) => {
                const newUser = {
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    name: profile.displayName,
                    // Optionally set role for initial admin based on email
                    role: profile.emails[0].value === process.env.ADMIN_EMAIL ? 'admin' : 'user'
                };

                try {
                    let user = await User.findOne({ googleId: profile.id });

                    if (user) {
                        done(null, user); // User already exists
                    } else {
                        user = await User.create(newUser); // Create new user
                        done(null, user);
                    }
                } catch (err) {
                    console.error(err);
                    done(err, null);
                }
            }
        )
    );

    // Serialize user for session
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // Deserialize user from session
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
};