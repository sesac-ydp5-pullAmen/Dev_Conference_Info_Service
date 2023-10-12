const express = require('express');
const passport = require('passport');

const router = express.Router();
const controller = require('../controller/kakaoController');

router.get('/kakaoLogin', controller.getKakaoLogin);
router.get('/kakao', passport.authenticate('kakao'));
router.get(
    '/kakao/callback',
    passport.authenticate('kakao', {
        failureRedirect: '/',
        session: false,
    }),
    (req, res) => {
        res.redirect('/');
    }
);

module.exports = router;
