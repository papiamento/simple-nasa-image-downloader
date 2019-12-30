const downloader = require('./downloader');

test('that an image can be downloaded', () => {

    const imageUrl = 'https://images-assets.nasa.gov/image/PIA13339/PIA13339~orig.jpg';

    downloader.downloadImageAndSaveToDisk(imageUrl, 'file1.jpg');
});