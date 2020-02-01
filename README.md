# simple-nasa-image-downloader

![](https://github.com/papiamento/simple-nasa-image-downloader/workflows/build/badge.svg)
[![codecov](https://codecov.io/gh/papiamento/simple-nasa-image-downloader/branch/master/graph/badge.svg)](https://codecov.io/gh/papiamento/simple-nasa-image-downloader)
[![Known Vulnerabilities](https://snyk.io/test/github/papiamento/simple-nasa-image-downloader/badge.svg?targetFile=package.json)](https://snyk.io/test/github/papiamento/simple-nasa-image-downloader?targetFile=package.json)
[![npm version](https://badge.fury.io/js/simple-nasa-image-downloader.svg)](https://badge.fury.io/js/simple-nasa-image-downloader)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## what does this do?

This CLI tool allows you to search NASA's public images API for a search term and downloads the original images. I build this because I was tired of seeing the same old desktop pictures. Using this tool you get to download a set of images for each search term and then you can use these images as desktop pictures. *TADA!*, now you can get dopamine hit whenever you see a new picture on your desktop.

## how do I use this?

* ````$ npm install -g simple-nasa-image-downloader````
* ````$ simple-nasa-image-downloader <search term>````
* your images will download in the current directory under the images folder.

## TODO 

* add pre commit hook to run lint & tests
* remove unirest and use only the core node library
* refactor the code to proper async pattern