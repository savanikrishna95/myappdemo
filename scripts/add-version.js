// scripts/add-version.js

const fs = require('fs');
const path = require('path');

function appendVersion(filePath, version) {
  const content = fs.readFileSync(filePath, 'utf8');
  const updatedContent = `${content}\n/* Version: ${version} */`;

  fs.writeFileSync(filePath, updatedContent, 'utf8');
}

const version = Date.now(); // Use a timestamp as the version
    
// Add version to CSS files
appendVersion(path.resolve(__dirname, '../build/static/css/main.css'), version);

// Add version to JS files
appendVersion(path.resolve(__dirname, '../build/static/js/main.js'), version);

console.log(`Version ${version} added to CSS and JS files.`);