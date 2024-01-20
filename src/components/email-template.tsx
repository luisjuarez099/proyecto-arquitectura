import * as React from "react";

interface EmailTemplateProps {
  Nombre: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  Nombre,
}) => (
  <div>
    <h1>Hola, {Nombre}!</h1>
    <p>
      Le escribo para agradecerle por su comentario sobre nuestros productos o
      servicios. Apreciamos su tiempo y esfuerzo al compartir sus pensamientos
      con nosotros. Su comentario es muy valioso para nosotros, ya que nos ayuda
      a mejorar nuestros productos y servicios. Lo leeremos detenidamente y
      tomaremos sus comentarios en consideración. También nos complace saber que
      está interesado en [producto o servicio]. Estamos comprometidos a brindar
      a nuestros clientes la mejor experiencia posible, y nos esforzaremos por
      superar sus expectativas. Gracias nuevamente por su comentario. Valoramos
      su negocio y nos encantaría seguir trabajando con usted en el futuro.
    </p>
  </div>
);
