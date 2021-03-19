import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import getSpotifyToken from './spotifyClient';

class SpotifyAPI extends RESTDataSource {
  token: string;

  constructor() {
    super();
    this.baseURL = 'https://api.spotify.com/v1';
  }

  willSendRequest = async (request: RequestOptions) => {
    const token = await getSpotifyToken();
    request.headers.set('Authorization', `Bearer ${token}`);
  };

  getArtist = async () => {
    return await this.get('/artists/0oSGxfWSnnOXhD2fKuz2Gy');
  };
}

export default SpotifyAPI;
