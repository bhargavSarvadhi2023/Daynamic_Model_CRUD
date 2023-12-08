import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export const cityModel = (sequelize) => {
    const cityModel = sequelize.define(
        'city',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            cityName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            stateId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'state',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            countryId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'country',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
            indexes: [
                {
                    fields: ['cityName'],
                },
            ],
        },
    );

    cityModel.associate = function (models) {
        cityModel.belongsTo(models.stateModel, {
            foreignKey: 'stateId',
        });
        cityModel.belongsTo(models.countryModel, {
            foreignKey: 'countryId',
        });
    };

    return cityModel;
};
