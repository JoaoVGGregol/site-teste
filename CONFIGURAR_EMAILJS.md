# 📧 Como Configurar o EmailJS

## Passo 1: Criar Conta no EmailJS

1. Acesse: https://www.emailjs.com/
2. Clique em **"Sign Up"** (ou **"Get Started"**)
3. Crie sua conta (pode usar seu Google)

---

## Passo 2: Adicionar um Email Service

1. No Dashboard, vá em **"Email Services"** no menu lateral
2. Clique em **"Add New Service"**
3. Escolha seu provedor de email:
   - **Gmail** (recomendado se você usa Gmail)
   - Outlook
   - Yahoo
   - Ou outro

4. **Para Gmail:**
   - Clique em **"Connect Account"**
   - Faça login com sua conta do Gmail
   - Autorize o EmailJS

5. Dê um nome para o serviço (ex: "Gmail Pessoal")
6. Clique em **"Create Service"**
7. **COPIE o Service ID** (ex: `service_abc123`) - você vai precisar!

---

## Passo 3: Criar um Template de Email

1. Vá em **"Email Templates"** no menu lateral
2. Clique em **"Create New Template"**
3. Configure o template:

### Subject (Assunto):
```
✨ Novo pensamento no seu diário!
```

### Content (HTML):
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px;">
  <div style="background: white; border-radius: 10px; padding: 30px;">
    <h1 style="color: #667eea; text-align: center;">✨ Nosso Cantinho Especial</h1>
    <p style="color: #999; text-align: center;">Um espaço para guardar sentimentos especiais</p>
    
    <div style="background: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <p style="color: #666; line-height: 1.6;">{{message}}</p>
      <p style="color: #999; font-size: 12px; margin-top: 15px;">📅 {{date}}</p>
    </div>
    
    <div style="text-align: center; margin-top: 30px;">
      <a href="{{site_url}}/diary" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: 600;">
        📖 Abrir Diário
      </a>
    </div>
    
    <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
    
    <div style="text-align: center; color: #999; font-size: 12px;">
      <p>💝 Guardando momentos especiais juntos</p>
    </div>
  </div>
</div>
```

### Settings (Configurações):
- **To email:** `{{to_email}}`
- **From name:** `Nosso Cantinho Especial`
- **Reply to:** Seu email

4. Clique em **"Save"**
5. **COPIE o Template ID** (ex: `template_xyz789`)

---

## Passo 4: Obter a Public Key

1. Vá em **"Account"** → **"General"** (ou clique no seu nome no canto superior direito)
2. Procure por **"API Keys"** ou **"Public Key"**
3. **COPIE a Public Key** (ex: `abcD1234EfgH5678`)

---

## Passo 5: Atualizar o Arquivo .env

1. Abra o arquivo `.env` na raiz do projeto
2. Substitua as informações:

```env
VITE_EMAILJS_SERVICE_ID=seu_service_id_aqui
VITE_EMAILJS_TEMPLATE_ID=seu_template_id_aqui
VITE_EMAILJS_PUBLIC_KEY=sua_public_key_aqui
```

3. Salve o arquivo

---

## Passo 6: Configurar no Vercel (Produção)

1. Acesse: https://vercel.com/seu-projeto/settings/environment-variables
2. Adicione as 3 variáveis:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
3. Marque todos os ambientes (Production, Preview, Development)
4. Salve e faça redeploy

---

## Passo 7: Testar

1. Reinicie o servidor local:
   ```bash
   npm run dev
   ```

2. Vá para a página do Diário
3. Escreva uma mensagem
4. Use os emails de vocês dois
5. Envie!

Os emails devem chegar em ambas as caixas de entrada! 📬✨

---

## 🎯 Resumo do que você precisa copiar:

- ✅ **Service ID** (da seção Email Services)
- ✅ **Template ID** (da seção Email Templates)  
- ✅ **Public Key** (da seção Account/General)

---

## ⚠️ Importante:

- O plano gratuito permite **200 emails/mês**
- Perfeito para vocês dois!
- Não tem restrição de destinatários
- Os emails chegam instantaneamente

## 🆘 Problemas?

Se os emails não chegarem:
1. Verifique a pasta de SPAM
2. Certifique-se de que autorizou o EmailJS no Gmail
3. Verifique se as variáveis no `.env` estão corretas (sem espaços extras)
