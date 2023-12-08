import fs from 'fs';
import path from 'path';

export default function (plop) {
    plop.setGenerator('model', {
        description: 'Generate a new Sequelize model',
        prompts: [
            {
                type: 'input',
                name: 'modelName',
                message: 'Enter the model file name:',
            },
            {
                type: 'input',
                name: 'modelname',
                message: 'Enter the model name:',
            },
        ],
        actions: function (data) {
            const actions = [];
            if (data.modelName) {
                actions.push({
                    type: 'add',
                    path: `./src/plop/models/{{modelName}}.model.ts`,
                    templateFile: './src/plop/plop-templates/model.hbs',
                });
            }
            return actions;
        },
    });

    plop.setGenerator('key', {
        description:
            'If you first  model generate command run after Generate Sequelize model KEY',
        prompts: [
            {
                type: 'input',
                name: 'key',
                message: 'Enter the key name:',
            },
            {
                type: 'list',
                name: 'type',
                message:
                    'Select the key type (e.g., STRING, UUID, ENUM, etc.):',
                choices: [
                    'STRING',
                    'UUID',
                    'ENUM',
                    'DATE',
                    'DATEONLY',
                    'INTEGER',
                ],
            },
            {
                type: 'input',
                name: 'enumValues',
                message: 'Enter ENUM values (comma-separated):',
                when: (answers) => answers.type === 'ENUM',
            },
            {
                type: 'confirm',
                name: 'constrant',
                message: 'Do you want to add a Constrant?',
                default: true,
            },
            {
                type: 'list',
                name: 'constraintType',
                message: 'Choose the constraint type:',
                choices: [
                    'allowNull: false',
                    'allowNull: true',
                    'unique: true',
                ],
                when: (answers) => answers.constrant,
            },
            {
                type: 'confirm',
                name: 'constrant_two',
                message: 'Do you want to add one more Constrant?',
                default: true,
                when: (answers) => answers.constraintType === 'unique: true',
            },
            {
                type: 'list',
                name: 'constraintTypeTWO',
                message: 'Choose the constraint type:',
                choices: ['allowNull: false', 'allowNull: true'],
                when: (answers) => answers.constrant_two,
            },
            {
                type: 'confirm',
                name: 'refernceKey',
                message: 'Do you want to add a reference Key?',
                default: true,
            },
            {
                type: 'input',
                name: 'refmodel',
                message: 'Enter the reference model name:',
                when: (answers) => answers.refernceKey,
            },
            {
                type: 'input',
                name: 'refkey',
                message: 'Enter the references key name:',
                when: (answers) => answers.refernceKey,
            },
        ],
        actions: function (data) {
            const actions = [];
            const modelsFolderPath = './src/plop/models';
            const files = fs.readdirSync(modelsFolderPath);
            if (files.length === 1) {
                const file = files[0];
                const filePath = path.join(modelsFolderPath, file);
                let existingCode = fs.readFileSync(filePath, 'utf-8');
                const newFieldCode = `
                 ${data.key}: {
                      type: DataTypes.${data.type},
                      ${data.constrant ? `${data.constraintType},` : ''}
                      ${data.constrant_two ? `${data.constraintTypeTWO},` : ''}
                      ${
                          data.refernceKey
                              ? ` references:{  
                                        model:'${data.refmodel}' ,
                                        key:'${data.refkey}' 
                                  },`
                              : ''
                      }
                      ${data.enumValues ? ` values :[${data.enumValues}],` : ''}

                 },`;

                const lastFieldIndex = existingCode.lastIndexOf('},');
                const updatedCode =
                    existingCode.slice(0, lastFieldIndex) +
                    `},${newFieldCode}\n` +
                    existingCode.slice(lastFieldIndex + 2);

                fs.writeFileSync(filePath, updatedCode, 'utf-8');
                console.log('Field added successfully.');
            } else {
                console.error(
                    'Error: There should be exactly one file in the models folder.',
                );
            }
            return actions;
        },
    });

    plop.setGenerator('model-done', {
        description: 'Create Model in your src/model folder',
        prompts: [],
        actions: function () {
            const actions = [];
            const sourceFolder = './src/plop/models';
            const destinationFolder = './src/model';
            const files = fs.readdirSync(sourceFolder);
            files.forEach((file) => {
                const sourcePath = path.join(sourceFolder, file);
                const destinationPath = path.join(destinationFolder, file);
                actions.push({
                    type: 'add',
                    path: destinationPath,
                    templateFile: sourcePath,
                });
                actions.push((data) => {
                    files.forEach((file) => {
                        const sourcePath = path.join(sourceFolder, file);
                        fs.unlinkSync(sourcePath);
                    });
                    return 'Files removed from src/plop/models';
                });
            });
            return actions;
        },
    });
}
