import type { Metadata } from "next";
import { UserProvider } from '@auth0/nextjs-auth0/client';

// These styles apply to every route in the application
import "./globals.css";

export const metadata: Metadata = {
  title: "Memo Match",
  description: "Revive your childhood memories",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (   
    <UserProvider>
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width" />
          <link rel="icon" type="image/svg+xml" href="/next.svg" />
        </head>

        <body>
          <main>
            <h1>Memomatch</h1>
            {children}
          </main>
        </body>
      </html>
    </UserProvider>
  );
}
