import { DataTypes } from 'sequelize';
export const stateModel = (sequelize) => {
    const stateModel = sequelize.define('stateModel', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        ann: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'nn',
                key: 'id',
            },
        },
        gg: {
            type: DataTypes.ENUM,
            allowNull: false,
        },
        bhargav: {
            type: DataTypes.ENUM,
            allowNull: true,
            references: { model: 'hh', key: 'jj' },
            values: ['bhargav', 'makwana'],
        },
        cityID: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'city',
                key: 'id',
            },
        },
        bhg: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'same',
                key: 'id',
            },
        },
    });
    return stateModel;
};
