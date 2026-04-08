export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body || {};
  const correctPassword = process.env.APP_PASSWORD;

  if (!correctPassword) {
    return res.status(500).json({ error: 'Password not configured' });
  }

  if (password === correctPassword) {
    const token = Buffer.from(correctPassword + ':' + Date.now()).toString('base64');
    return res.status(200).json({ success: true, token: token });
  }

  return res.status(401).json({ success: false, error: 'Wrong password' });
}
