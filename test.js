const fs = require('fs');
let css = fs.readFileSync('snowball.css', 'utf8');

// We want to see if we can just duplicate the transition line without overlay for firefox fallback
const regex = /(transition:\s*.*?)(,\s*overlay[^;]+);/g;
css = css.replace(regex, "$1;\n    transition: $1$2;");

fs.writeFileSync('snowball-test.css', css);
