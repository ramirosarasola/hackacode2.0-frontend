import Sidebar from "../ui/admin-sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Sidebar/>
      {children}
    </div>
  );
}