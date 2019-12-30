let unirest = require('unirest');
let https = require('https');
let http = require('http');
let fs = require('fs');

/**
 * Search the nasa images api and return the search result items' image collections
 */
exports.searchAndGetResultItemsImageCollections = (url,  callback) => {

    unirest.get(url).end(response => {

        const imageCollections = [];

        const items = response.body.collection.items;
    
        items.forEach(item => {
            imageCollections.push(item.href)
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

        const urls = response.body;

        urls.forEach(url => {

            // if we find the original we peace out immediately
            if (url.match(/orig/)) {
                callback(url);
            }
        })
    });
}

exports.downloadImageAndSaveToDisk = (imageUrl, filename) => {
    
    if (imageUrl.match(/https.*/)) {
        https.get(imageUrl, response => {

            let fileWriteStream = fs.createWriteStream(filename);
            response.pipe(fileWriteStream);
        });
    } else {
        http.get(imageUrl, response => {

            let fileWriteStream = fs.createWriteStream(filename);
            response.pipe(fileWriteStream);
        });
    }
};

exports.downloadAllSearchedImages = (callback) => {

    const searchUrl = 'https://images-api.nasa.gov/search?q=space&page=1&media_type=image&year_start=1920&year_end=2019';

    this.searchAndGetResultItemsImageCollections(searchUrl, (searchResultItems) => {

        for(let i = 0; i < searchResultItems.length; ++i) {

            let imageCollectionUrl = searchResultItems[i];

            getOrigImageUrl(imageCollectionUrl, (origImageUrl) => {

                const filename = extractFilenameFromUrl(origImageUrl);
                this.downloadImageAndSaveToDisk(origImageUrl, filename);

                callback();
            });
        }

        searchResultItems.forEach(imageCollectionUrl => {


        });
    });
};

function extractFilenameFromUrl(url) {

    return url.replace(/http.*\//, '');
}

exports.getOrigImageUrl = getOrigImageUrl;
exports.extractFilenameFromUrl = extractFilenameFromUrl;