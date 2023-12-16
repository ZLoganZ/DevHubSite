import PusherClient from 'pusher-js';

export const pusherClient = new PusherClient(import.meta.env.VITE_PUSHER_APP_KEY, {
  channelAuthorization: {
    headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
    endpoint:
      (process.env.NODE_ENV === 'development'
        ? import.meta.env.VITE_SERVER_ENDPOINT
        : import.meta.env.VITE_SERVER_ENDPOINT_PRODUCT) + '/api/pusher/auth',
    transport: 'ajax',
  },
  cluster: 'ap1',
});
