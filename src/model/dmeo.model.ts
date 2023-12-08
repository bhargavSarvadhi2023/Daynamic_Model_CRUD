import { DataTypes } from 'sequelize';
export const demoModel = (sequelize) => {
    const demoModel = sequelize.define('demoModel', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            references: {
                model: 'models',
                key: 'id',
            },
        },
    });
    return demoModel;
};
