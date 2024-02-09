import axios from 'axios';

export const API_URL = 'https://api.thecatapi.com/v1/';

export const fetch = axios.create({
  baseURL: API_URL,
});
