const config = require('../config/config.json');
const passport = require('passport');
const kakaoStrategy = require('passport-kakao').Strategy;

const { KakaoUser, Sequelize } = require('../models');

const kakaoKey = config.kakaoKey;
const kakaoClientKey = config.kakaoClientSecretKey;

passport.use(
    'kakao',
    new kakaoStrategy(
        {
            clientID: kakaoKey,
            callbackURL: 'http://localhost:8000/kakao/callback',
            kakaoClientKey: kakaoClientKey,
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log(accessToken);
            console.log('profile :', profile);
            try {
                const exUser = await KakaoUser.findOne({
                    where: { sns_id: profile.id },
                });
                if (exUser) {
                    done(null, exUser);
                } else {
                    const newUser = await KakaoUser.create({
                        sns_id: profile.id,
                        user_name: profile.displayName,
                    });
                    done(null, newUser, profile);
                }
                console.log('kakao : ', exUser);
            } catch (err) {
                console.log('err : ', err);
            }
        }
    )
);

exports.getKakaoLogin = (req, res) => {
    res.render('kakao');
};
