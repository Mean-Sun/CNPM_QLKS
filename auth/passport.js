const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcrypt");
const databaseConfig = require('../models/db');


passport.use(new LocalStrategy(
    async function(email, password, done) {
        /*try {
            //const user = await models.users.findOne({where: {username}, raw: true});
            const user = await authService.getUserbyUsername(username);
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            const match = await validPassword(user, password);
            if (!match) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        }
        catch (err){
            return done(err);
        }*/
    }
));

async function validPassword(user, password){
    return bcrypt.compare(password, user.password);
}


passport.serializeUser(function(user, done) {
    done(null, {MaNV: user.MaNV, TenNV: user.TenNV, email: user.email});
});

passport.deserializeUser(function(user, done) {
    return done(null, user);
});

exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.session.user
        return next()
    }
    res.redirect('/')
}

module.exports = passport;