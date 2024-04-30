import DesktopSidebar from "@/components/sidebar/DesktopSidebar";
import Sidebar from "@/components/sidebar/Sidebar";

export default function UsersLayout({
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
