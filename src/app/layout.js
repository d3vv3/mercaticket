import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "MercaTicket",
  description: "Estadísticas para tus tickets de Mercadona. Obtén información nutricional de tus compras, optimiza lo que gastas en comer por cada día y encuentra los productos más caros que menos alimentan!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script defer src="https://analytics.sgn.space/script.js" data-website-id="9854cb81-7a17-4417-be8e-94c21b0ad91f"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
