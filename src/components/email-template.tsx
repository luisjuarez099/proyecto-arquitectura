import * as React from "react";

interface EmailTemplateProps {
  Nombre: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  Nombre,
 
}) => (
  <div>
    <h1>Welcome, {Nombre}!</h1>
    <p>
      Asunto: ¡Bienvenido a la familia de Ninja shocks! Estimado/a,
        En nombre de todo el equipo de Ninja Shocks, te
      damos la bienvenida a nuestra familia. Estamos muy contentos de que te
      hayas unido a nosotros y esperamos que disfrutes de tu trabajo. Sabemos
      que los shocks son un producto importante para nuestros clientes, y
      estamos seguros de que tú serás una gran representante de nuestra empresa.
      Te capacitaremos para que conozcas a fondo nuestros productos y cómo
      venderlos de manera efectiva.
    </p>
  </div>
);
