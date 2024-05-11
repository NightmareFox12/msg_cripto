import './globals.css';

export const metadata = {
  title: 'Iniciar Sesión',
  description: 'Mensajería Criptografica',
};

export default function RootLayout({children}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
