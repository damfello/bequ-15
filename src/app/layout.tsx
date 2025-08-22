import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Assistant for MedTech",
  description: "Powered by BQS GmbH",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/*
        El favicon SVG se inserta aquí.
        No es necesario un archivo separado, ya que el SVG está codificado como un URI de datos.
      */}
      <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M50 0 A 50 50 0 0 0 50 100 A 50 50 0 0 0 50 0' fill='%232563EB'/%3E%3Ctext x='50' y='65' font-family='Arial, Helvetica, sans-serif' font-size='50' fill='%23FFFFFF' text-anchor='middle'%3EBQ%3C/text%3E%3C/svg%3E" />
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
          `,
        }}
      />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
