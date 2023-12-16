export const DOMAIN_NAME =
  (process.env.NODE_ENV === 'development'
    ? import.meta.env.VITE_SERVER_ENDPOINT
    : import.meta.env.VITE_SERVER_ENDPOINT_PRODUCT) + '/api';

export const TOKEN = 'access_token';
export const TOKEN_GITHUB = 'access_token_github';
export const USER_LOGIN = 'user_login';
export const ID_USER = '_id';

export const STATUS_CODE = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  UN_AUTHOR: 403,
  CONFLICT: 409,
  SERVER_ERROR: 500,
};

export const DARK_THEME = 'dark';
export const LIGHT_THEME = 'light';
