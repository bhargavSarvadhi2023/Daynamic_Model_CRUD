import { DataTypes } from 'sequelize';

export const countryModel = (sequelize) => {
    const country = sequelize.define(
        'country',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            countryName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            iso2: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
            indexes: [
                {
                    fields: ['countryName'],
                },
            ],
        },
    );

    country.associate = function (models) {
        country.hasMany(models.stateModel, {
            foreignKey: 'countryId',
        });

        country.hasMany(models.cityModel, {
            foreignKey: 'countryId',
        });
    };

    return country;
};
