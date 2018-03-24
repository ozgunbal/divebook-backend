const LocalStrategy = require('passport-local').Strategy;
const { ExtractJwt, Strategy } = require('passport-jwt');
const JwtStrategy = Strategy;

const { User } = require('./../models');

module.exports = (passport) => {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    /**
     * Signup logic
     */
    passport.use('signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    }, (req, email, password, done) => {
        process.nextTick(() => {
            User.findOne({ 'email': email })
                .then(user => {
                    if (user) {
                        // Returns Unathorized
                        return done(null, false);
                    } else {
                        const newUser = new User();
                        newUser.email = email;
                        newUser.password = newUser.generateHash(password);
                        newUser.save()
                            .then(() => done(null, newUser))
                            .catch(err => { throw err });
                    }
                }).catch(err => done(err));
        })
    }));

    /**
     * Login Logic
     */
    passport.use('login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    }, (req, email, password, done) => {
        User.findOne({ 'email': email })
            .then(user => {
                // Returns Unathorized, no user found
                if (!user) return done(null, false);
                // Returns Unathorized, wrong password
                if (!user.validPassword(password)) return done(null, false);
                // Successful
                return done(null, user);
            }).catch(err => done(err));
    }))

    /**
     * JWT Auth 
     */
    passport.use('jwt', new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
        secretOrKey: process.env.JWT_SECRET,
    }, (jwtPayload, next) => {
        User.findById(jwtPayload.id)
            .then(user => {
                // Returns Unathorized, no user found
                if (!user) return next(null, false);
                // Successful
                return next(null, user);
            }).catch(err => next(err));
    }))

    /**
     * Logout logic
     */
    passport.use('logout', new LocalStrategy({
        passReqToCallback: true,
    }, (req, done) => {
        User.findById(req.cookies.userid)
            .then(user => {
                // Returns Unathorized, no user found
                if (!user) return done(null, false);
                // Successful
                return done(null, user);
            }).catch(err => done(err));
    }))
}