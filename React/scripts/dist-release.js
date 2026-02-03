const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
  console.error('dist directory not found. Run npm run build first.');
  process.exit(1);
}

// Find a JS bundle (skip chunks like vendor if possible)
const files = fs.readdirSync(distDir).filter(f => f.endsWith('.js'));
if (files.length === 0) {
  console.error('No .js files found in dist/.');
  process.exit(1);
}

// Prefer a file named "game.js" or index.*.js, otherwise pick the first
let entry = files.find(f => f === 'game.js') || files.find(f => f.startsWith('index')) || files[0];
const inputPath = path.join(distDir, entry);
const releasePath = path.join(distDir, 'release.js');
const outPath = path.join(distDir, 'main.js');

console.log('Input JS:', inputPath);

try {
  // Run google-closure-compiler via npx-installed bin
  const gccCmd = `npx google-closure-compiler --js=${JSON.stringify(inputPath)} --js_output_file=${JSON.stringify(releasePath)} --compilation_level=ADVANCED --language_out=ECMASCRIPT_2019 --warning_level=VERBOSE --jscomp_off=* --assume_function_wrapper`;
  console.log('Running:', gccCmd);
  execSync(gccCmd, { stdio: 'inherit' });

  // Run roadroller
  const rrCmd = `npx roadroller ${JSON.stringify(releasePath)} -o ${JSON.stringify(outPath)}`;
  console.log('Running:', rrCmd);
  execSync(rrCmd, { stdio: 'inherit' });

  console.log('Release artifact written to', outPath);
} catch (e) {
  console.error('Error during release build:', e);
  process.exit(1);
}
