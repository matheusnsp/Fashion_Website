// api/subscribe.js
export default async function handler(req, res) {
  // Só aceita POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { email } = req.body;

    // Validação básica
    if (!email || !email.includes("@")) {
      return res.status(400).json({ success: false, error: "Email inválido" });
    }

    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY, // ✅ seguro
      },
      body: JSON.stringify({
        email,
        listIds: [2],
        updateEnabled: true,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ success: false, error: data });
    }

    return res.status(200).json({ success: true, data });

  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}