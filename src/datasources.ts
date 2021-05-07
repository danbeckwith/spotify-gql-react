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

  getArtistById = async (id: string): Promise<Artist> => {
    return this.get(`/artists/${id}`);
  };

  getAlbumsByArtistId = async (artistId: string): Promise<Album[]> => {
    const res = await this.get(`/artists/${artistId}/albums`);
    return res.items;
  };

  searchArtistByName = async (name: string): Promise<Artist[]> => {
    const res = await this.get(`/search/?query=${name}&type=artist`);
    return res.artists.items;
  };
}

export default (): { spotify: SpotifyAPI } => ({
  spotify: new SpotifyAPI(),
});

