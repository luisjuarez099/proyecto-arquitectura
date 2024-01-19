import { EmailTemplate } from '@/components/email-template';
import { Resend } from 'resend';

const resend = new Resend('re_8Wx5t6xC_7etkGzjEK4Qdp3un78dP4Uys');
export async function POST() {
  try {
    const corresSaludo = await resend.emails.send({
        from:"Acme <onboarding@resend.dev>",
        to: "luisjuarezcc9@gmail.com",
        subject: "Hola, Bienvenido a ninja shocks",
        react: EmailTemplate({Nombre:""}),
        text: "",
      });

    return Response.json(corresSaludo);
  } catch (error) {
    return Response.json({ error });
  }
}
