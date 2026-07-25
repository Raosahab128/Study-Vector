import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  try {
    const sql = neon(process.env.STORAGE_POSTGRES_URL || process.env.DATABASE_URL);

    if (req.method === 'POST') {
      const { name, email, message } = req.body;
      
      // Table agar nahi bani hogi toh yeh automatically bana lega
      await sql`
        CREATE TABLE IF NOT EXISTS contacts (
          id SERIAL PRIMARY KEY,
          name TEXT,
          email TEXT,
          message TEXT
        );
      `;

      // Form ka data table mein insert karega
      await sql`
        INSERT INTO contacts (name, email, message) 
        VALUES (${name}, ${email}, ${message})
      `;
      
      return res.status(200).json({ success: true, message: "Data saved successfully!" });
    }
    
    return res.status(400).json({ success: false, message: "Invalid request method" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
