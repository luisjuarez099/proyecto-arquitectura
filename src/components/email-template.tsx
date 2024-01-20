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
    <h1>Hola, {Nombre}!</h1>
    <p>
      Gracias por contactarnos. Hemos recibido su mensaje y le responderemos lo
      antes posible. Estaremos en contacto con {Correo}
    </p>

    <p>
      Le escribo para agradecerle por su comentario sobre nuestros productos o
      servicios. Apreciamos su tiempo y esfuerzo al compartir sus pensamientos
      con nosotros. Lo leeremos detenidamente y tomaremos sus comentarios en consideración.
    </p>
  </div>
);
