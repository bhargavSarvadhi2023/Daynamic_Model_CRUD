import { Model, Sequelize } from 'sequelize';
import { sequelize } from '../config/database';
import * as path from 'path';
import { DaynamicImport } from '../utils/dayanamic.import';
import { createDaynamicCrud } from '../utils/crud.dayanamic';

console.time('connect');

const folderPath = path.join(__dirname);
const excludedFiles = ['index.ts'];
const models = DaynamicImport(folderPath, excludedFiles);

const db: any = {
    sequelize,
    Sequelize,
};
Object.keys(models).forEach((modelName) => {
    const fileName = path.basename(modelName, path.extname(modelName));
    db[fileName] = models[modelName](sequelize);
    // createDaynamicCrud(fileName)
});
Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
sequelize.sync();

export { db };

console.timeEnd('connect');

// createDaynamicCrud('')
