const unirest = require('unirest');
const https = require('https');
const fs = require('fs');

/**
 * Search the nasa images api and return the search result items' image collections
 */
exports.searchAndGetResultItemsImageCollections = (url, callback) => {
  unirest.get(url).end(response => {
    const imageCollections = [];

    const { items } = response.body.collection;

    items.forEach(item => {
      imageCollections.push(item.href);
    });

    callback(imageCollections);
  });
};

/**
 * This method makes an HTTP call to get the original images out
 * of a collection of images of the same object.
 *
 * @param {*} imageCollectionUrl a url to a list of images of the same obect
 *            but at different sizes and resolutions
 * @param {*} callback is called with the url of the original image
 */
function getOrigImageUrl(imageCollectionUrl, callback) {
  unirest.get(imageCollectionUrl).end(response => {
    // TODO make sure we handle errors yo

    if (response.error) {
      callback(null);
    } else {
      const urls = response.body;

      urls.forEach(url => {
        // if we find the original we peace out immediately
        if (url.match(/orig/)) {
          callback(url);
        }
      });
    }
  });
}

exports.downloadImageAndSaveToDisk = (imageUrl, filename) => {
  const httpsImageUrl = imageUrl.replace(/http:/, 'https:');

  https.get(httpsImageUrl, response => {
    const fileWriteStream = fs.createWriteStream(filename);
    response.pipe(fileWriteStream);
  });
};

function extractFilenameFromUrl(url) {
  return url.replace(/http.*\//, '');
}

exports.downloadAllSearchedImages = (searchTerm, callback) => {
  const searchUrl = `https://images-api.nasa.gov/search?q=${searchTerm}&media_type=image&year_start=1920&year_end=2019`;

  this.searchAndGetResultItemsImageCollections(searchUrl, searchResultItems => {
    for (let i = 0; i < searchResultItems.length; i += 1) {
      const imageCollectionUrl = searchResultItems[i];

      getOrigImageUrl(imageCollectionUrl, origImageUrl => {
        if (origImageUrl) {
          const filename = extractFilenameFromUrl(origImageUrl);
          this.downloadImageAndSaveToDisk(origImageUrl, `images/${filename}`);

          callback();
        }
      });
    }
  });
};

exports.getOrigImageUrl = getOrigImageUrl;
exports.extractFilenameFromUrl = extractFilenameFromUrl;
