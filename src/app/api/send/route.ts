import { NextResponse } from "next/server";
import {Resend} from 'resend'
import { EmailTemplate } from '@/components/email-template';


const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    const {Nombre} = await request.json();
  try {
    const data = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: ['luisjuarezcc9@gmail.com'],
        subject: 'Hello world',
        react: EmailTemplate({ Nombre: 'John' }) as string,
      });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
