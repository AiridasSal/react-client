// translate.js
const fs = require('fs');
const path = require('path');
const { Translate } = require('@google-cloud/translate').v2;

const apiKey = ''; // Replace this with your Google Cloud API Key
const translate = new Translate({ key: apiKey });

const sourceLanguage = 'en';
const targetLanguage = 'ru'; // Change this to the language you want to translate to
const inputFilePath = path.join(__dirname, '..', 'public', 'assets', 'locales', 'en', 'source.json');
// Change this to your source JSON file path
const outputFilePath = path.join(__dirname, '..', 'public', 'assets', 'locales', 'rus', 'translation.json'); // Change this to your desired output path

fs.readFile(inputFilePath, 'utf8', async (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  const inputTranslations = JSON.parse(data);
  const keys = Object.keys(inputTranslations);
  const values = Object.values(inputTranslations);

  try {
    const translatedValues = await Promise.all(
      values.map(async (value) => {
        const [translated] = await translate.translate(value, targetLanguage);
        return translated;
      })
    );

    const outputTranslations = keys.reduce((obj, key, index) => {
      obj[key] = translatedValues[index];
      return obj;
    }, {});

    fs.writeFile(outputFilePath, JSON.stringify(outputTranslations, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return;
      }

      console.log(`Translation file saved at ${outputFilePath}`);
    });
  } catch (error) {
    console.error('Error translating text:', error);
  }
});
