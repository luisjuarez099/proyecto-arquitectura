import * as React from "react";

interface EmailTemplateProps {
  Nombre: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  Nombre,
}) => (
  <div>
    <h1>Bienvenido/a, Ninja Shocks!</h1>
    <p className="text-justify  text-xl">
      Estimado/a , <b>{Nombre}</b>. 
      Su mensaje ha sido
      recibido y será atendido a la brevedad. Entendemos que su tiempo es
      valioso, por lo que nos comprometemos a brindarle una respuesta rápida y
      satisfactoria. Mientras tanto, si tiene alguna pregunta o inquietud, no
      dude en ponerse en contacto con nosotros.
    </p>
  </div>
);
