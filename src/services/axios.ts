import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { API_URL } from 'env';
import { camelizeKeys } from 'humps';
import { enqueueSnackbar } from 'notistack';
import { signOut } from 'reducers/profileSlice';
import { store } from 'reducers/store';

const beforeRequest = (config: InternalAxiosRequestConfig) => {
  const { isLoggedIn, accessToken }: ProfileType = store.getState().profile;
  if (isLoggedIn) {
    Object.assign(config.headers as any, {
      Authorization: `Bearer ${accessToken}`,
    });
  }
  try {
    if (config.data instanceof FormData) {
      Object.assign(config.headers as any, { 'Content-Type': 'multipart/form-data' });
    }
  } catch {}
  return config;
};

const onResponse = ({ data }: AxiosResponse) => {
  return data;
};

const onError = async (error: AxiosError<ErrorResponse>) => {
  const { response } = error;
  if (response) {
    const { data, status } = response;
    enqueueSnackbar(data.message, { variant: 'error' });
    if (status === 401) {
      store.dispatch(signOut());
    }
  } else {
    enqueueSnackbar('Cannot connect to Server', { variant: 'error' });
  }
  return Promise.reject(response?.data);
};

const client = axios.create({ baseURL: API_URL });
client.interceptors.request.use(beforeRequest);
client.interceptors.response.use(onResponse, onError);

const clientOembed = axios.create({
  baseURL: 'https://www.youtube.com',
  transformResponse: [...(axios.defaults.transformResponse as []), (data) => camelizeKeys(data)],
});
clientOembed.interceptors.response.use(onResponse);

export { client, clientOembed };
