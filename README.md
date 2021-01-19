# bandcamp-fetch

A JS library for scraping Bandcamp content; inspired by [bandcamp-scraper](https://github.com/masterT/bandcamp-scraper).

# Installation

```
npm i bandcamp-fetch --save
```

# Usage

```
const bcfetch = require('bandcamp-fetch');

bcfetch.discover(...).then( results => {
    ...
});
```

# API

Each function returns a Promise which resolves to the fetched data.

### discover([params], [options])

[**Example**](examples/discover.js) ([output](examples/discover_output.txt))

Fetches albums through Bandcamp Discover.

- `params` (optional) - object specifying params to be passed to Bandcamp Discover
    - genre
    - subgenre: only valid when genre is something other than 'all'
    - location
    - sortBy
    - artistRecommendationType: only valid when sortBy is 'rec' (artist recommended)
    - format
    - time
    - page

  All properties are optional. Possible values for each property can be obtained with the `getDiscoverOptions()` function.

- `options` (optional) - object specifying options to be used when formulating results:
    - albumImageFormat: name, Id or object referring to an image format.
    - artistImageFormat

  All properties are optional. Image formats can be obtained with the `getImageFormats()` function.

### getDiscoverOptions()

[**Example**](examples/getDiscoverOptions.js) ([output](examples/getDiscoverOptions_output.txt))

Fetches Bandcamp Discover options that can be passed back to `discover()`.

### getImageFormats([filter])

[**Example**](examples/getImageFormats.js) ([output](examples/getImageFormats_output.txt))

Fetches the list of image formats used in Bandcamp.

- `filter` (optional) - 'artist' or 'album'. If specified, narrows down the result to include only formats applicable to the specified value.

### getImageFormat(idOrName)

Fetches the image format that matches Id or name. If none is found, the result will be `null`.

### getArtistOrLabelInfo(artistOrLabelUrl, [options])

[**Example**](examples/getArtistOrLabelInfo.js) ([output](examples/getArtistOrLabelInfo_output.txt))

Fetches information about an artist or label.

- `artistOrLabelUrl`
- `options` (optional)
    - imageFormat

### getLabelArtists(labelUrl, [options])

[**Example**](examples/getLabelArtists.js) ([output](examples/getLabelArtists_output.txt))

Fetches the list of artists belonging to a label.

- `labelUrl`
- `options` (optional)
    - imageFormat

### getDiscography(artistOrLabelUrl, [options])

[**Example**](examples/getDiscography.js) ([output](examples/getDiscography_output.txt))

Fetches the list of albums and standalone tracks belonging to an artist or label.

- `artistOrLabelUrl`
- `options` (optional)
    - imageFormat

### getAlbumInfo(albumUrl, [options])

[**Example**](examples/getAlbumInfo.js) ([output](examples/getAlbumInfo_output.txt))

Fetches information about an album.

- `albumUrl`
- `options` (optional)
    - albumImageFormat
    - artistImageFormat
    - includeRawData

### getTrackInfo(trackUrl, [options])

[**Example**](examples/getTrackInfo.js) ([output](examples/getTrackInfo_output.txt))

Fetches information about a track.

- `trackUrl`
- `options` (optional)
    - albumImageFormat
    - artistImageFormat
    - includeRawData

### getAlbumHighlightsByTag(tagUrl, [options])

[**Example**](examples/getAlbumHighlightsByTag.js) ([output](examples/getAlbumHighlightsByTag_output.txt))

Fetches album highlights for the tag referred to by `tagUrl`. The result is an array of album collections, with each collection corresponding to a highlight category such as 'new and notable' and 'all-time best selling'.

- `tagUrl`

  Tag URLs can be obtained with the `getTags()` function.

- `options` (optional)
    - imageFormat

### getTags()

[**Example**](examples/getTags.js) ([output](examples/getTags_output.txt))

Fetches Bandcamp tags. The result is an object with the following properties:
- `tags`: non-location tags
- `locations`: location tags

### search(params, [options])

[**Example**](examples/search.js) ([output](examples/search_output.txt))

Searches for `params.query`.

- `params`
    - query: search string
    - page (1 if omitted)
- `options` (optional)
    - albumImageFormat
    - artistImageFormat

# License

MIT