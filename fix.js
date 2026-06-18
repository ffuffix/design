const fs = require('fs');
let css = fs.readFileSync('snowball.css', 'utf8');

// 1. Add fallback for overlay transition
css = css.replace(/transition:\s*([^;]+?),\s*overlay\s+([^;]+?)\s*allow-discrete;/g, (match, p1, p2) => {
    // p1 already contains 'display 0.15s allow-discrete'
    return `transition: ${p1};\n    transition: ${p1}, overlay ${p2} allow-discrete;`;
});

// 2. Add position: fixed to :where(dialog)
css = css.replace(/:where\(dialog\)\s*{/, ":where(dialog) {\n  /* Prevent jump when closing in browsers lacking overlay transition */\n  position: fixed;\n  inset: 0;\n  margin: auto;");

fs.writeFileSync('snowball.css', css);
