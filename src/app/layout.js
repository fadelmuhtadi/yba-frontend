import "./globals.css";

export const metadata = {
  title: "Manajemen Stok Mobil",
  description: "Sistem Manajemen Stok Mobil",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}