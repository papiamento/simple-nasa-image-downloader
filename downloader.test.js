const d = require('./downloader');

test('that a filename can be extract from a url', () => {

    const imageUrl = 'https://images-assets.nasa.gov/image/PIA13339/PIA13339~orig.jpg';

    const filename = d.extractFilenameFromUrl(imageUrl);

    expect(filename).toMatch('PIA13339~orig.jpg');
});

test('that an image can be downloaded', () => {

    const imageUrl = 'https://images-assets.nasa.gov/image/PIA13339/PIA13339~orig.jpg';

    d.downloadImageAndSaveToDisk(imageUrl, 'images/file1.jpg');
});

test('that we can get the image collection urls for each search result', (done) => {

    const imageAPISearchUrl = 'https://images-api.nasa.gov/search?q=space&page=1&media_type=image&year_start=1920&year_end=2019';

    d.searchAndGetResultItemsImageCollections(imageAPISearchUrl, (items) => {

        expect(items).not.toBeFalsy();
        expect(items.length).toBeGreaterThan(0);
        expect(items[0]).toMatch(/https:\/\/.*json/);
        done();
    });
});

test('that we can query the image collection and pick the original image', (done) => {

    const collectionUrl = 'https://images-assets.nasa.gov/image/201211020022HQ/collection.json';

    d.getOrigImageUrl(collectionUrl, (originalImageUrl) => {

        console.log(originalImageUrl);
        expect(originalImageUrl).not.toBeFalsy();
        expect(originalImageUrl).toMatch(/http.*orig.*/);
        done();
    });
});

test('that we can download all image when searching for orion', (done) => {

    d.downloadAllSearchedImages('apollo', () => {

        done();
    });
});