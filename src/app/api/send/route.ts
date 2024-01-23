import { EmailTemplate } from '@/components/email-template';
import { Resend } from 'resend';

const resend = new Resend('re_en2zknuu_LWxcH5Bja4MJnqsYfo8kkrkY');
export async function POST(request: Request) {
  const { Nombre, Correo } = await request.json();
  try {
    const corresSaludo = await resend.emails.send({
        from:'Acme <onboarding@resend.dev>',
        to: "luisjuarezcc9@gmail.com",
        subject: "Hola, Bienvenido a ninja shocks",
        react: EmailTemplate({Nombre:Nombre, Correo:Correo}),
        text: "saludos",
      });
    return Response.json(corresSaludo);
  } catch (error) {
    return Response.json({ error });
  }
}
