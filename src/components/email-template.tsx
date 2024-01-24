import * as React from 'react';

interface EmailTemplateProps {
  Nombre: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  Nombre,
}) => (
  <div>
    <h1>Welcome, {Nombre}!</h1>
  </div>
);
