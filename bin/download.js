#!/usr/bin/env node

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

const searchTerm = process.argv[2];

process.stdout.write(`\n... searching for "${searchTerm}" images and downloading ...\n\n`);

const d = require('../downloader');

d.downloadAllSearchedImages(searchTerm, () => {});
