import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import getSpotifyToken from './spotifyClient';

class SpotifyAPI extends RESTDataSource {
  token: string;

  constructor() {
    super();
    this.token =
      'BQBgzp1gyXQmIp2MqlZqcnOBA5oux2Rgv_kaxjYOyf2YFWYuDjKlJGK9u42Pl-hZN_EICP7rZlJn_vr_J1w';
    this.baseURL = 'https://https://open.spotify.com';
  }

  //   willSendRequest(request: RequestOptions) {
  //     console.log('hello');
  //     // if (!this.token) {
  //     //   const newToken = await getSpotifyToken();
  //     //   console.log('new token', newToken);
  //     //   this.token = newToken;
  //     // }
  //     // console.log(this.token);
  //     request.headers.set('Authorization', `Bearer ${this.token}`);
  //   }

  async getArtist() {
    console.log('hello!!!!');
    let res;
    try {
      console.log('attempting');
      res = await this.get('/artist/0oSGxfWSnnOXhD2fKuz2Gy');
    } catch (e) {
      console.log(e);
    }
    console.log('result', res);
    return '123';
  }
}

export default SpotifyAPI;
