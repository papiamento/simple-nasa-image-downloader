#!/usr/bin/env node
const fs = require('fs');

function help() {
  process.stdout.write('\n');
  process.stdout.write('\n');

  process.stdout.write('  Usage: nasa-images-download <search term>\n');
  process.stdout.write('\n');

  process.stdout.write('\n');
}

if (process.argv.length < 3) {
  help();
  process.exit(-1);
}

try {
  fs.mkdirSync('./images');
  process.stdout.write('\n... created images folder, continuing...\n');
} catch (err) {
  process.stdout.write('\n... images folder already exists, continuing...\n');
}

const searchTerm = process.argv[2];

process.stdout.write(`\n... searching for "${searchTerm}" NASA images and downloading ...\n\n`);

const d = require('../downloader');

d.downloadAllSearchedImages(searchTerm, () => {});
