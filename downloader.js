let unirest = require('unirest');
let https = require('https');
let fs = require('fs');

let url = 'https://images-api.nasa.gov/search?q=space&page=1&media_type=image&year_start=1920&year_end=2019';

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

exports.getOrigImageUrl = (imageCollectionUrl, callback) => {

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
    https.get(imageUrl, response => {

        let fileWriteStream = fs.createWriteStream(filename);
        response.pipe(fileWriteStream);
    });
};