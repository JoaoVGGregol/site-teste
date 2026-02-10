import emailjs from '@emailjs/browser';

// Inicializar EmailJS com a Public Key
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

export const sendDiaryNotificationEmail = async (
  toEmails: string | string[],
  messageContent: string,
  timestamp: string
) => {
  try {
    // Converter para array se for string
    const emailList = Array.isArray(toEmails) ? toEmails : [toEmails];

    // Formatar a data
    const formattedDate = new Date(timestamp).toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // Enviar email para cada destinatário
    const promises = emailList.map(email => 
      emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          to_email: email,
          message: messageContent,
          date: formattedDate,
          site_url: window.location.origin,
        }
      )
    );

    await Promise.all(promises);
    
    console.log("Email enviado com sucesso para:", emailList);
    return { success: true, data: { sent_to: emailList } };
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return { success: false, error };
  }
};
