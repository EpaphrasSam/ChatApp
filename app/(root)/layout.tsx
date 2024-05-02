import Sidebar from "@/components/sidebar/Sidebar";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full">
      <Sidebar>{children}</Sidebar>
    </div>
  );
}
