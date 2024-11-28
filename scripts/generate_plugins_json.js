const fs = require('fs');
const path = require('path');

const pluginsDir = './plugins';
const iconsDir = './assets';
const outputDir = './.dist';
const outputFile = 'plugins.min.json';

const plugins = [];

function generatePluginsJson() {
  const languages = fs.readdirSync(pluginsDir);

  languages.forEach((language) => {
    const languageDir = path.join(pluginsDir, language);
    const languageIconsDir = path.join(iconsDir, language);
    const pluginFiles = fs.readdirSync(languageDir);

    pluginFiles.forEach((file) => {
      if (file.endsWith('.ts')) {
        const id = file.replace('.ts', '');
        const iconPath = path.join(languageIconsDir, `${id}.png`);

        plugins.push({
          id,
          name: `${id.charAt(0).toUpperCase() + id.slice(1)}`,
          version: '1.0.0',
          author: 'Your Name',
          description: `Plugin for ${id}`,
          entry: `${pluginsDir}/${language}/${file}`,
          icon: fs.existsSync(iconPath) ? `${iconsDir}/${language}/${id}.png` : '',
          dependencies: {}
        });
      }
    });
  });

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
  fs.writeFileSync(path.join(outputDir, outputFile), JSON.stringify({ plugins }, null, 2));
  console.log(`Generated ${outputFile} in ${outputDir}`);
}

generatePluginsJson();
