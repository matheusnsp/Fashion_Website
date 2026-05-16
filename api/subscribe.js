export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }
  
    const { email } = req.body;
    if (!email || !email.includes("@")) {
      return res.status(400).json({ success: false, error: "Email inválido" });
    }
  
    try {
      const response = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.BREVO_API_KEY,
        },
        body: JSON.stringify({
          email: email,
          listIds: [2],
          updateEnabled: true,
        }),
      });
  
      // 204 = sucesso sem body, 201 = criado
      if (response.status === 204 || response.status === 201) {
        return res.status(200).json({ success: true });
      }
  
      const data = await response.json();
      return res.status(response.status).json({ success: false, error: data });
  
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }