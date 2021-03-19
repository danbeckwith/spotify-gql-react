import { config } from 'dotenv';

config();

export const clientSecret = process.env.CLIENT_SECRET;
export const clientId = process.env.CLIENT_ID;
export const clientCredentialsEndpoint = process.env.CLIENT_CREDENTIALS_ENDPOINT;
