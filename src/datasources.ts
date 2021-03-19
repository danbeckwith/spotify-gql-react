import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import getSpotifyToken from './spotifyClient';

class SpotifyAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spotify.com/v1';
  }

  willSendRequest = async (request: RequestOptions) => {
    const token = await getSpotifyToken();
    request.headers.set('Authorization', `Bearer ${token}`);
  };

  getArtist = async (id: number) => {
    return await this.get(`/artists/${id}`);
  };
}

export default SpotifyAPI;
