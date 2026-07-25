import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gfvqaowjvjstgbptcjlh.supabase.co';
const supabaseKey = 'sb_publishable_lrvVlwmEK2o1W5DtKFylMw_tjgotu0-';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        body = {};
      }
    }

    const name = body?.name;
    const email = body?.email;
    const message = body?.message;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false }
    });

    const { error } = await supabase
      .from('contacts')
      .insert([{ name, email, message }]);

    if (error) {
      return res.status(500).json({ success: false, error: error.message });
    }

    return res.status(200).json({ success: true, message: 'Data saved successfully!' });

  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || 'Internal Server Error' });
  }
}
