import * as React from "react";
interface EmailTemplateProps {
  Nombre: string;
  Correo: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  Nombre,
  Correo,
}) => (
  <div>
    <h1>Hola, {Nombre}.</h1>
    <h3>{Correo}</h3>
    <p>
      Agradecemos sinceramente su contacto.
      <br>Hemos</br> recibido su mensaje y le
      aseguramos que nuestro equipo responderá con prontitud.
    </p>
  </div>
);
