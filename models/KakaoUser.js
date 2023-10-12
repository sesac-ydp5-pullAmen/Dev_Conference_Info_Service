const { DataTypes } = require('sequelize');

const KakaoUser = (Sequelize, sequelize) => {
    const model = Sequelize.define(
        'kakao_user',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            sns_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            user_name: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
        },
        {
            tableName: 'kakao_user',
            freezeTableName: true,
            timestamps: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        }
    );
    return model;
};
module.exports = KakaoUser;
