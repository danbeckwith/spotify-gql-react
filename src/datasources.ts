import { RESTDataSource } from 'apollo-datasource-rest';

class SpotifyAPI extends RESTDataSource {
  token: string;

  constructor (token: string) {
    super();
    this.baseURL = 'https://https://open.spotify.com';
    this.token = token;
  }

  async getArtist (id: string) {
    return this.get(`artist/${id}`);
  }
}
