export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <head className="bg-background p-4 fixed inset-x-0 top-0"></head>
      <main>{children}</main>
    </div>
  );
}
