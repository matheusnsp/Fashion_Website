exports.handler = async (event) => {
    try {
      const { email } = JSON.parse(event.body);
  
      const response = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.BREVO_API_KEY,
        },
        body: JSON.stringify({
          email: email,
          listIds: [2], // 👈 ID da lista no Brevo
          updateEnabled: true,
        }),
      });
  
      const data = await response.json();
  
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, data }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message }),
      };
    }
  };