import { clientId, clientSecret, clientCredentialsEndpoint } from './config';
import axios from 'axios';
import { stringify } from 'querystring';

const getAuthString = () =>
  Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

const data = stringify({
  grant_type: 'client_credentials',
});

export default async () =>
  axios.post(clientCredentialsEndpoint, data, {
    headers: {
      Authorization: `Basic ${getAuthString()}`,
    },
  });
