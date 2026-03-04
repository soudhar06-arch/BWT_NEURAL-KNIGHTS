import { Link, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FolderGit2,
  History,
  Settings,
  LogOut,
  BrainCircuit,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Layout() {
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: FolderGit2, label: "Projects", href: "/projects" },
    { icon: History, label: "Sessions", href: "/sessions" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <div className="flex h-screen bg-transparent">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-background/40 backdrop-blur-xl flex flex-col">
        <div className="p-6 flex items-center gap-2">
          <div className="bg-primary text-primary-foreground p-1.5 rounded-md">
            <BrainCircuit size={24} />
          </div>
          <span className="font-bold text-xl tracking-tight">SAHA</span>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.href ||
              (item.href !== "/" && location.pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
                )}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <button className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-secondary/50 hover:text-foreground w-full transition-colors">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
