let unirest = require('unirest');
let https = require('https');
let fs = require('fs');



function main() {

// here is the spec for "items"
// https://images-api.nasa.gov/search?q=orion&page=1&media_type=image&year_start=1920&year_end=2019

// each item contains links, data, a href
// href contains url's to images of different sizes, including metadata

let url = 'https://images-api.nasa.gov/search?q=space&page=1&media_type=image&year_start=1920&year_end=2019';

let imageCollections = [];

// TODO: SLOW HTTP CALL
unirest.get(url).end(response => {

    let items = response.body.collection.items;

    items.forEach(item => {
        imageCollections.push(item.href)
    });

    // TODO: BIG LOOP
    imageCollections.forEach(imageCollection => {

        // TODO: SLOW HTTP CALL
        unirest.get(imageCollection).end(imageCollectionResponse => {

            let urls = imageCollectionResponse.body

            let imageUrls = [];
            urls.forEach(url => {
                if (url.match(/orig/)) {

                    // TODO: for now we just test this in here, we need a testing utility
                    downloadImageAndSaveToDisk(url, 'file1.jpg');
                    imageUrls.push(url);
                }
            });

            // TODO: SLOW HTTP CALL
            console.log(imageUrls);
        }); 
    });
});
}

exports.downloadImageAndSaveToDisk = (imageUrl, filename) => {
    https.get(imageUrl, response => {

        let fileWriteStream = fs.createWriteStream(filename);
        response.pipe(fileWriteStream);
    });
};

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