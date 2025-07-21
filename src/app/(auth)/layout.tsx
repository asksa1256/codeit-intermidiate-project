export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-gray-100 min-h-screen flex items-center justify-center">
      {children}
    </main>
  );
}
