import { API_URL } from 'env';
import { store } from 'reducers/store';
import { io } from 'socket.io-client';

let instance = io({ autoConnect: false });

export const socket = {
  connect: () => {
    const { isLoggedIn, accessToken }: ProfileType = store.getState().profile;
    if (isLoggedIn && !instance.connected) {
      instance = io(API_URL!, {
        auth: { token: `Bearer ${accessToken}` },
      });
      instance.connect();
    }
  },
  disconnect: () => {
    try {
      instance.disconnect();
    } catch {}
  },
  instance: () => instance,
};
