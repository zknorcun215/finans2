export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const { token } = req.query || {};
  const correctPassword = process.env.APP_PASSWORD;

  if (!token || !correctPassword) {
    return res.status(401).json({ valid: false });
  }

  try {
    const decoded = Buffer.from(token, 'base64').toString('utf8');
    const parts = decoded.split(':');
    if (parts[0] === correctPassword) {
      return res.status(200).json({ valid: true });
    }
  } catch(e) {}

  return res.status(401).json({ valid: false });
}
