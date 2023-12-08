import { DataTypes } from 'sequelize';
export const userModel = (sequelize) => {
    const userModel = sequelize.define('userModel', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        abc: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            references: {
                model: 'demo',
                key: 'id',
            },
        },
    });
    return userModel;
};
