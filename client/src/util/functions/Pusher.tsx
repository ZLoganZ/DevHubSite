import PusherClient from 'pusher-js';

export const pusherClient = new PusherClient('d086b4a963d8b1004838', {
  channelAuthorization: {
    headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
    endpoint: 'https://dev-hub-pro.herokuapp.com/api/pusher/auth',
    transport: 'ajax',
  },
  cluster: 'ap1',
});
