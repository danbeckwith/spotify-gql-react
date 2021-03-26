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

  getArtist = async (id: string) => {
    return await this.get(`/artists/${id}`)
  };

  getAlbumsByArtistId = async (artistId: string) => {
    return await this.get(`/artists/${artistId}/albums`) 
  };
}

export default SpotifyAPI;
