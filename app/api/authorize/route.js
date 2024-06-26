import process from 'next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss';
import { nanoid } from 'nanoid';
import { getSession } from '@/app/api-utils/get-session';

export const GET = async () => {
  const state = nanoid();

  const session = await getSession();
  session.state = state;

  const url = 'https://github.com/login/oauth/authorize'
    + `?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}`
    + '&scope=read:user'
    + `&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}`
    + `&stste=${state}`;

  return Response.json({}, {
    status: 307,
    headers: {
      Location: url,
    },
  });
};
