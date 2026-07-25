import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const { name, email, message } = req.body;
      
      const { data, error } = await supabase
        .from('contacts')
        .insert([{ name, email, message }]);

      if (error) {
        throw error;
      }
      
      return res.status(200).json({ success: true, message: "Data saved successfully!" });
    }
    
    return res.status(400).json({ success: false, message: "Invalid request method" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
