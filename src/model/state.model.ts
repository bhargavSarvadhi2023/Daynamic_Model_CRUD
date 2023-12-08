import { DataTypes } from 'sequelize';

export const stateModel = (sequelize) => {
    const stateModel = sequelize.define(
        'state',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            stateName: {
                type: DataTypes.STRING,
                allowNull: false,
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
                    fields: ['stateName'],
                },
            ],
        },
    );

    stateModel.associate = function (models) {
        stateModel.hasMany(models.cityModel, {
            foreignKey: 'stateId',
        });
        stateModel.belongsTo(models.countryModel, {
            foreignKey: 'countryId',
        });
    };

    return stateModel;
};
