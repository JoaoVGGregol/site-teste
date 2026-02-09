import { Resend } from 'resend';

const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);

export const sendDiaryNotificationEmail = async (
  toEmails: string | string[],
  messageContent: string,
  timestamp: string
) => {
  try {
    // Converter para array se for string
    const emailList = Array.isArray(toEmails) ? toEmails : [toEmails];

    const result = await resend.emails.send({
      from: 'Nosso Cantinho Especial <onboarding@resend.dev>',
      to: emailList,
      subject: '✨ Novo pensamento no seu diário!',
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; color: #333;">
          <div style="background: white; border-radius: 10px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #667eea; margin: 0; font-size: 28px;">✨ Nosso Cantinho Especial</h1>
              <p style="color: #999; margin: 10px 0 0 0; font-size: 14px;">Um espaço para guardar sentimentos especiais</p>
            </div>

            <div style="background: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="color: #666; margin: 0; line-height: 1.6; font-size: 16px;">
                ${messageContent}
              </p>
              <p style="color: #999; margin: 15px 0 0 0; font-size: 12px;">
                📅 ${new Date(timestamp).toLocaleDateString('pt-BR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>

            <div style="text-align: center; margin-top: 30px;">
              <a href="${import.meta.env.VITE_SITE_URL}/diary" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: 600; transition: transform 0.2s;">
                📖 Abrir Diário
              </a>
            </div>

            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
            
            <div style="text-align: center; color: #999; font-size: 12px;">
              <p style="margin: 5px 0;">Você recebeu este email porque salvou um pensamento no seu diário.</p>
              <p style="margin: 5px 0;">💝 Guardando momentos especiais juntos</p>
            </div>
          </div>
        </div>
      `,
    });

    if (result.error) {
      console.error('Erro ao enviar email:', result.error);
      return { success: false, error: result.error };
    }

    console.log('Email enviado com sucesso:', result.data);
    return { success: true, data: result.data };
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return { success: false, error };
  }
};
