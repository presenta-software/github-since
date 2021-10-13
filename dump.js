const fs = require('fs')

const html = fs.readFileSync('./build/index.html', 'utf-8')
const srcjs = JSON.stringify({ html })
fs.writeFileSync('./src/functions/share/index.html.js', srcjs, 'utf-8')
