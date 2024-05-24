import axios from 'axios';
import { getSession } from '@/app/api-utils/get-session';

export const GET = async () => {
  const session = await getSession();
  if (!session.accessToken) {
    return Response.json({
      message: '권한이 없습니다.',
    }, {
      status: 401,
    });
  }

  const { data } = await axios.get('https://api.github.com/user', {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  return Response.json(
    {
      profile: data.avatar_url,
    },
  );
};
