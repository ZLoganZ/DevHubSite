export function GetGitHubUrl() {
  const rootURl = 'https://github.com/login/oauth/authorize';

  const options = {
    client_id: import.meta.env.VITE_GITHUB_OAUTH_CLIENT_ID as string,
    redirect_uri: (process.env.NODE_ENV === 'development'
      ? import.meta.env.VITE_GITHUB_OAUTH_REDIRECT_URL
      : import.meta.env.VITE_GITHUB_OAUTH_REDIRECT_URL_PRODUCT) as string,
    scope: 'user,repo',
  };

  const qs = new URLSearchParams(options);

  return `${rootURl}?${qs.toString()}`;
}
