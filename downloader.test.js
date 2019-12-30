const d = require('./downloader');

test('that an image can be downloaded', () => {

    const imageUrl = 'https://images-assets.nasa.gov/image/PIA13339/PIA13339~orig.jpg';

    d.downloadImageAndSaveToDisk(imageUrl, 'file1.jpg');
});

test('that we can get the image collection for each search result', (done) => {

    const imageAPISearchUrl = 'https://images-api.nasa.gov/search?q=space&page=1&media_type=image&year_start=1920&year_end=2019';

    d.searchAndGetResultItemsImageCollections(imageAPISearchUrl, (items) => {

        expect(items).not.toBeFalsy;
        done();
    });
});