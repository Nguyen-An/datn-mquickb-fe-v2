import type { Metadata } from "next";
import "./globals.css";
import Authentication from "@/components/authentication/Authentication";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Authentication></Authentication>
      </body>
    </html>
  );
}
