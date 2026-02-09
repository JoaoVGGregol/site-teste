const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { 
        status: 405, 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders 
        } 
      }
    );
  }

  try {
    const { emails, message, timestamp } = await req.json();

    if (!emails || !message || !timestamp) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { 
          status: 400, 
          headers: { 
            "Content-Type": "application/json",
            ...corsHeaders 
          } 
        }
      );
    }

    const apiKey = Deno.env.get("RESEND_API_KEY");
    const siteUrl = Deno.env.get("SITE_URL");

    const emailBody = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; color: #333;">
        <div style="background: white; border-radius: 10px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #667eea; margin: 0; font-size: 28px;">✨ Nosso Cantinho Especial</h1>
            <p style="color: #999; margin: 10px 0 0 0; font-size: 14px;">Um espaço para guardar sentimentos especiais</p>
          </div>

          <div style="background: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #666; margin: 0; line-height: 1.6; font-size: 16px;">
              ${message}
            </p>
            <p style="color: #999; margin: 15px 0 0 0; font-size: 12px;">
              📅 ${new Date(timestamp).toLocaleDateString("pt-BR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <a href="${siteUrl}/diary" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: 600; transition: transform 0.2s;">
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
    `;

    // Call Resend API directly via fetch
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Nosso Cantinho Especial <onboarding@resend.dev>",
        to: emails,
        subject: "✨ Novo pensamento no seu diário!",
        html: emailBody,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Erro ao enviar email:", result);
      return new Response(
        JSON.stringify({ error: result }),
        { 
          status: response.status, 
          headers: { 
            "Content-Type": "application/json",
            ...corsHeaders 
          } 
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: result }),
      { 
        status: 200, 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders 
        } 
      }
    );
  } catch (error) {
    console.error("Erro ao processar requisição:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send email" }),
      { 
        status: 500, 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders 
        } 
      }
    );
  }
});
