import { clientId, clientSecret, clientCredentialsEndpoint } from './config';
import axios from 'axios';
import { stringify } from 'querystring';

const getAuthString = () =>
  Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

const data = stringify({
  grant_type: 'client_credentials',
});

let token;

// TODO add some unit testing
export const getImplicitGrantToken = async () => {
  if (token) return token;

  const res = await axios.post(
    clientCredentialsEndpoint,
    data,
    {
      headers: {
        Authorization: `Basic ${getAuthString()}`,
      },
    },
  );

  token = res.data.access_token;
  return res.data.access_token;
};
