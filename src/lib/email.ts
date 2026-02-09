export const sendDiaryNotificationEmail = async (
  toEmails: string | string[],
  messageContent: string,
  timestamp: string
) => {
  try {
    // Converter para array se for string
    const emailList = Array.isArray(toEmails) ? toEmails : [toEmails];

    // Chamar a Supabase Edge Function
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    const response = await fetch(`${supabaseUrl}/functions/v1/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify({
        emails: emailList,
        message: messageContent,
        timestamp: timestamp,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Erro ao enviar email:", error);
      return { success: false, error };
    }

    const data = await response.json();
    console.log("Email enviado com sucesso:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return { success: false, error };
  }
};
