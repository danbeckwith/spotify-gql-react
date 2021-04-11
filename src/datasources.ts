import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { getImplicitGrantToken } from './spotifyAuthClient';
import { Album, Artist } from './generated/graphql';

class SpotifyAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spotify.com/v1';
  }

  willSendRequest = async (request: RequestOptions): Promise<void> => {
    const token = await getImplicitGrantToken();
    request.headers.set('Authorization', `Bearer ${token}`);
  };

  getArtist = async (id: string): Promise<Artist> => {
    return this.get(`/artists/${id}`);
  };

  getAlbumsByArtistId = async (artistId: string): Promise<Album[]> => {
    return this.get(`/artists/${artistId}/albums`);
  };
}

export default SpotifyAPI;
