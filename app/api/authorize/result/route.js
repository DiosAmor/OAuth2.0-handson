import axios from 'axios';
import process from 'next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss';
import { getSession } from '@/app/api-utils/get-session';

export const GET = async (request) => {
  const session = await getSession();
  const code = request.nextUrl.searchParams.get('code');
  const state = request.nextUrl.searchParams.get('state');
  const error = request.nextUrl.searchParams.get('error');

  if (error) {
    return Response.json({}, {
      status: 307,
      headers: {
        Location: `/fail?reason=${error}`,
      },
    });
  }

  if (!state || session.state !== state) {
    return Response.json({}, {
      status: 307,
      headers: {
        Location: '/fail?reason=state_missmatch',
      },
    });
  }

  session.state = undefined;

  const { data } = await axios.post('https://github.com/login/oauth/access_token', {
    code,
    client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
  }, {
    headers: {
      accept: 'application/json',

    },
  });

  session.accessToken = data.access_token;

  return Response.json({}, {
    status: 307,
    headers: {
      Location: '/',
    },
  });
};
