const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

const getSpotifyToken = async () => {
    try {
        const data = await spotifyApi.clientCredentialsGrant();
        spotifyApi.setAccessToken(data.body['access_token']);
        console.log('Spotify token refreshed');
    } catch (error) {
        console.error('Something went wrong when retrieving an access token', error);
    }
};

// Get a token immediately and then refresh it every hour
getSpotifyToken();
setInterval(getSpotifyToken, 1000 * 60 * 60);

const searchAlbums = async (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ message: 'Search query is required' });
    }

    try {
        const data = await spotifyApi.searchAlbums(query, { limit: 20 });
        res.json(data.body.albums.items);
    } catch (error) {
        console.error('Spotify Search Error:', error);
        res.status(500).json({ message: 'Failed to search Spotify' });
    }
};

const getAlbumById = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await spotifyApi.getAlbum(id);
        res.json(data.body);
    } catch (error) {
        console.error('Spotify Get Album Error:', error);
        res.status(500).json({ message: 'Failed to get album details from Spotify' });
    }
};


module.exports = { searchAlbums, getAlbumById };