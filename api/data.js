export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_KEY;
  const headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': 'Bearer ' + SUPABASE_KEY,
    'Content-Type': 'application/json',
    'Prefer': 'return=minimal'
  };

  try {
    // VERİ ÇEKME
    if (req.method === 'GET') {
      const r = await fetch(
        SUPABASE_URL + '/rest/v1/user_data?id=eq.main&select=data',
        { headers }
      );
      const rows = await r.json();
      if (rows && rows.length > 0) {
        return res.status(200).json(rows[0].data);
      }
      return res.status(200).json({acc:[],cc:[],pay:[],col:[],re:[],sec:[],fx:[]});
    }

    // VERİ KAYDETME
    if (req.method === 'POST') {
      const body = req.body;
      const r = await fetch(
        SUPABASE_URL + '/rest/v1/user_data?id=eq.main',
        {
          method: 'PATCH',
          headers: { ...headers, 'Prefer': 'return=minimal' },
          body: JSON.stringify({ data: body, updated_at: new Date().toISOString() })
        }
      );
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
