const Filter = require('badwords-ko'); // npm install badwords-ko --save
const filter = new Filter();
const moment = require('moment');

const { ConferenceReview, Sequelize, Conference } = require('../models'); // ../models/index.js
const { Op } = require('sequelize');

exports.getReview = async (req, res) => {
    const pageNum = req.query.page || 1; // 페이지 번호
    const limit = 10; // 보여줄 리뷰 수
    const offset = 0 + (pageNum - 1) * limit; // 몇 번 부터 보여줄지

    try {
        const itemsPerPage = limit;
        const result = await ConferenceReview.findAll({
            offset: offset,
            limit: limit,
            order: [['re_id', 'DESC']],
        });

        const count = await ConferenceReview.count();
        const totalPages = Math.ceil(count / itemsPerPage);
        const startPage = Math.max(pageNum - Math.floor(limit / 2), 1);
        const endPage = Math.min(startPage + limit - 1, totalPages);

        res.render('review/list', {
            result: result,
            count: count,
            currentPage: pageNum,
            totalPages: totalPages,
            startPage: startPage,
            totalPages: totalPages,
            endPage: endPage,
        });
    } catch (err) {
        console.log(err);
        res.send('Server Error');
    }
};

exports.postReview = async (req, res) => {
    const result = await ConferenceReview.create({
        con_id: req.body.con_Id,
        re_title: req.body.subject,
        re_content: filter.clean(req.body.content),
        re_date: Date.now(),
        user_id:
            req.session && req.session.userInfo
                ? req.session.userInfo.userId
                : '익명사용자',
        content_Text: filter.clean(req.body.content).replace(/<[^>]*>/g, ''),
        con_title: req.body.eventName,
    });
    res.send(result);
};

exports.getReviewWrite = async (req, res) => {
    let conId = null;
    if (req.query.id) {
        conId = req.query.id;
    }
    const eventName = await Conference.findAll({
        where: {
            con_start_date: {
                [Op.lt]: moment(), // 현재 날짜보다 작은(이전인) 데이터만 선택
            },
            is_agreed: 1,
        },
        attributes: ['con_title', 'con_id'],
    });
    res.render('review/write', {
        eventName: eventName,
        conId,
    });
};

exports.getReviewDetail = async (req, res) => {
    const result = await ConferenceReview.findOne({
        where: { re_id: req.params.id },
    });
    if (result) {
        await result.increment('re_count', { by: 1 });
    }
    res.render('review/detail', {
        review: result,
    });
};
