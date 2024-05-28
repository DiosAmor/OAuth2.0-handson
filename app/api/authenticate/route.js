import process from 'next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss';

export const GET = async () => {
  const url = 'https://github.com/login/oauth/authorize'
    + `?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}`
    + '&scope=read:user'
    + `&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}`
    + `&stste=${state}`;
};
