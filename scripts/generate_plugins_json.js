const path = require('path');
const fs = require('fs');

// Assuming your plugins are in the `plugins` folder
const PLUGIN_DIR = './plugins';
const DIST_DIR = '.dist';

const json = [];
const pluginSet = new Set();
let totalPlugins = 0;

// Ensure the .dist directory exists
if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR);
}

const jsonPath = path.join(DIST_DIR, 'plugins.json');
const jsonMinPath = path.join(DIST_DIR, 'plugins.min.json');

// Loop through the plugins directory
fs.readdirSync(PLUGIN_DIR).forEach(language => {
  const languagePath = path.join(PLUGIN_DIR, language);
  
  // Skip if it's not a directory or if it doesn't contain plugin files
  if (!fs.lstatSync(languagePath).isDirectory()) return;

  const plugins = fs.readdirSync(languagePath);
  plugins.forEach(plugin => {
    if (plugin.startsWith('.')) return; // Skip hidden files

    // Read the TypeScript plugin file (assumed to be .ts)
    const pluginPath = path.join(languagePath, plugin);
    const rawCode = fs.readFileSync(pluginPath, 'utf-8');

    // Dummy data extraction (you can add real code parsing logic here)
    const id = plugin.replace('.ts', '');
    const name = id.charAt(0).toUpperCase() + id.slice(1);
    const version = '1.0.0'; // Default version
    const site = 'Unknown'; // Placeholder, you can add a real field if needed
    const icon = ''; // Placeholder for icon, update with actual logic if necessary
    const customJS = ''; // Placeholder for custom JS
    const customCSS = ''; // Placeholder for custom CSS

    const info = {
      id,
      name,
      site,
      lang: language, // Using language folder as the language
      version,
      url: `./plugins/${language}/${plugin}`,
      iconUrl: icon || 'siteNotAvailable.png', // Default if no icon
      customJS: customJS ? `./static/${customJS}` : undefined,
      customCSS: customCSS ? `./static/${customCSS}` : undefined,
    };

    if (pluginSet.has(id)) {
      console.log("There's already a plugin with id:", id);
      throw new Error('2 or more plugins have the same id');
    } else {
      pluginSet.add(id);
    }

    json.push(info);
    totalPlugins += 1;
    console.log(name, '✅');
  });
});

// Sort plugins by language and id
json.sort((a, b) => {
  if (a.lang === b.lang) return a.id.localeCompare(b.id);
  return 0;
});

// Write output to files
fs.writeFileSync(jsonMinPath, JSON.stringify(json));
fs.writeFileSync(jsonPath, JSON.stringify(json, null, '\t'));

console.log(jsonPath);
console.log('Done ✅');
