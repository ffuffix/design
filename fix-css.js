const fs = require('fs');
let css = fs.readFileSync('snowball.css', 'utf8');

css = css.replace(/transition:\s*([^;]+?),\s*overlay\s+([^;]+?)\s*allow-discrete;/g, (match, p1, p2) => {
    return `transition: ${p1};\n    transition: ${p1}, overlay ${p2} allow-discrete;`;
});

fs.writeFileSync('snowball-fixed.css', css);
