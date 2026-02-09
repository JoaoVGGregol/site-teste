export async function sendWhatsAppNotification(message: string) {
  const phoneNumberId = import.meta.env.VITE_WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = import.meta.env.VITE_WHATSAPP_ACCESS_TOKEN;
  const recipientPhoneNumber = import.meta.env.VITE_WHATSAPP_RECIPIENT_PHONE;

  if (!phoneNumberId || !accessToken || !recipientPhoneNumber) {
    console.warn("Credenciais do WhatsApp não configuradas");
    return;
  }

  try {
    const response = await fetch(
      `https://graph.instagram.com/v18.0/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: recipientPhoneNumber,
          type: "text",
          text: {
            body: message,
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error("Erro ao enviar mensagem WhatsApp:", error);
    } else {
      console.log("Mensagem WhatsApp enviada com sucesso!");
    }
  } catch (error) {
    console.error("Erro ao enviar WhatsApp:", error);
  }
}
