import { API_URL } from '@/config/index';

export default async (req, res) => {
  const djangoRes = await fetch(`${API_URL}/account/csrf/`, {
    headers: {
      "Content-Type": 'application/json'
    },
  });

  console.log(djangoRes);

  console.log(djangoRes.headers);

  const c = djangoRes.headers.get('set-cookie')
  console.log(c);
  res.status(200).json({ name: '' })
}
