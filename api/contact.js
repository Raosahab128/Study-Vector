import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gfvqaowjvjstgbptcjlh.supabase.co';
const supabaseKey = 'sb_publishable_lrvVlwmEK2o1W5DtKFylMw_tjgotu0-';

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false }
});

export default async function handler(req, res) {
  // CORS headers enable karna taaki request block na ho
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method !== 'POST') {
      return res.status(400).json({ success: false, error: "Invalid request method. Only POST is allowed." });
    }

    // Body parsing safety (agar req.body string ho toh use parse karein)
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        // ignore parsing error, let destructuring handle or fail gracefully
      }
    }

    const name = body?.name;
    const email = body?.email;
    const message = body?.message;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: "Saari fields bharna zaroori hai!" });
    }
      
    const { data, error } = await supabase
      .from('contacts')
      .insert([{ name, email, message }]);

    if (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
      
    return res.status(200).json({ success: true, message: "Data saved successfully!" });

  } catch (error) {
    return res.status(500).json({ success: false, error: error.message || "Server error ho gaya." });
  }
}
