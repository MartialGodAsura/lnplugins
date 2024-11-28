// generatePluginsMinJson.js

const fs = require('fs');
const path = require('path');

// Define the plugin information
const pluginData = {
    name: "RaeiTranslations",
    description: "A plugin to access RaeiTranslations in LNReader",
    version: "1.0.0",
    author: "Your Name",
    iconUrl: "https://github.com/MartialGodAsura/lnplugins/blob/main/assets/icons/english/raeitranslations/icon.png",
    url: "https://raeitranslations.com",
    scriptFile: "index.js",
};

// Write the data to plugins.min.json
const outputPath = path.join(__dirname, 'plugins.min.json');
fs.writeFileSync(outputPath, JSON.stringify([pluginData], null, 4));

console.log('plugins.min.json has been generated.');
