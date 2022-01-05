const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcrypt");
const databaseConfig = require('../models/db');


passport.use(new LocalStrategy(function verify(email, password, done) {
        let sql = `SELECT * FROM nhanvien WHERE email = "` + email + `"`;
        databaseConfig.query(sql, function (err, rows) {
            if (err) {
                return done(null, false);
            } else {
                if (rows.length < 1) {
                    return done(null, false, {message: 'Incorrect email.'});
                }
                const passwordInput = rows[0].MatKhau;

                bcrypt.compare(password, passwordInput, function (err, result) {
                    if (result) {
                        const user = {
                            MaNV: rows[0].MaNV,
                            TenNV: rows[0].TenNV,
                            email: rows[0].email
                        }
                        return done(null, user);
                    } else {
                        return done(null, false, {message: 'Incorrect password.'});
                    }
                });
            }
        });
    }
));


passport.serializeUser(function (user, done) {
    done(null, {MaNV: user.MaNV, TenNV: user.TenNV, email: user.email});
});

passport.deserializeUser(function (user, done) {
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