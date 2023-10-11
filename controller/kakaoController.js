const passport = require('passport');
const kakaoStrategy = require('passport-kakao').Strategy;

passport.use(
    'kakao',
    new kakaoStrategy(
        {
            clientID: '088262a244d15580dcbe60483193d6b9',
            callbackURL: 'http://localhost:8000/kakao/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log(accessToken);
            console.log('1234:', profile);
        }
    )
);

exports.getKakaoLogin = (req, res) => {
    res.render('kakao');
};
