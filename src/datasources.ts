import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { getImplicitGrantToken } from './spotifyAuthClient';

class SpotifyAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spotify.com/v1';
  }

  willSendRequest = async (request: RequestOptions) => {
    const token = await getImplicitGrantToken();
    request.headers.set('Authorization', `Bearer ${token}`);
  };

  getArtist = async (id: number) => {
    return await this.get(`/artists/${id}`);
  };
}

export default SpotifyAPI;
