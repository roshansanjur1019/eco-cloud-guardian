
import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  CloudCog, 
  Settings, 
  ShieldCheck, 
  Users, 
  LayoutPanelLeft 
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const navItems = [
    { icon: LayoutDashboard, name: "Dashboard", path: "/" },
    { icon: CloudCog, name: "Cloud Accounts", path: "/cloud-accounts" },
    { icon: ShieldCheck, name: "Governance", path: "/governance" },
    { icon: LayoutPanelLeft, name: "Cost Management", path: "/cost-management" },
    { icon: Users, name: "Team", path: "/team" },
    { icon: Settings, name: "Settings", path: "/settings" },
  ];

  return (
    <aside
      className={cn(
        "h-screen bg-white shadow-lg transition-all duration-300 border-r border-gray-100 flex flex-col",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-cloud-teal to-cloud-blue flex items-center justify-center">
              <span className="text-white font-bold">EG</span>
            </div>
            <span className="text-lg font-semibold text-cloud-dark">EcoGuard</span>
          </div>
        )}
        {collapsed && (
          <div className="h-8 w-8 mx-auto rounded-full bg-gradient-to-r from-cloud-teal to-cloud-blue flex items-center justify-center">
            <span className="text-white font-bold">EG</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "p-1 rounded-full hover:bg-gray-100 transition-all",
            collapsed && "mx-auto"
          )}
        >
          {collapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          )}
        </button>
      </div>

      <nav className="flex-1 py-6 px-3">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center space-x-2 p-3 rounded-lg transition-all",
                    isActive
                      ? "bg-cloud-blue/10 text-cloud-blue"
                      : "hover:bg-gray-100 text-gray-600",
                    collapsed && "justify-center"
                  )
                }
              >
                <item.icon size={20} />
                {!collapsed && <span>{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className={cn(
          "flex items-center p-3 space-x-3 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition-all",
          collapsed && "justify-center"
        )}>
          <div className="h-8 w-8 rounded-full bg-cloud-indigo/20 flex items-center justify-center">
            <span className="text-cloud-indigo font-medium">JS</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-700 truncate">John Smith</p>
              <p className="text-xs text-gray-500 truncate">john@company.com</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
