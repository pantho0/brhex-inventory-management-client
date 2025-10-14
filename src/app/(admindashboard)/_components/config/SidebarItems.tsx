import { LucideIcon, Package, Trash, Utensils } from "lucide-react";
import { FileText, HelpCircle, User, UserCog } from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
}

type NavSection = {
  [key: string]: NavItem[];
};

export const sidebarAdminNavItems: NavSection = {
  category: [
    {
      href: "/admin-management/add-category",
      label: "Add Category",
      icon: Utensils,
    },
    {
      href: "/admin-management/get-all-category",
      label: "View All Category",
      icon: Trash,
    },
  ],
  product: [
    {
      href: "/admin-management/add-product",
      label: "Add Product",
      icon: Utensils,
    },
    {
      href: "/admin-management/get-all-product",
      label: "View All Product",
      icon: Trash,
    },
  ],
  inventory: [
    {
      href: "/admin-management/add-inventory",
      label: "Add Inventory",
      icon: Utensils,
    },
    {
      href: "/admin-management/get-all-inventory",
      label: "View All Inventory",
      icon: Trash,
    },
  ],
  invoice: [
    {
      href: "/admin-management/create-invoice",
      label: "Create Invoice",
      icon: User,
    },
    {
      href: "/admin-management/get-all-invoice",
      label: "View All Invoice",
      icon: UserCog,
    },
    {
      href: "/admin-management/update-payment",
      label: "Update Payment",
      icon: UserCog,
    },
  ],
  account: [
    {
      href: "/admin-management/profile",
      label: "Profile",
      icon: User,
    },
    {
      href: "/admin-management/create-user",
      label: "Create User",
      icon: UserCog,
    },
    {
      href: "/admin-management/user-management",
      label: "User Management",
      icon: UserCog,
    },
  ],
  service: [
    {
      href: "/admin-management/help",
      label: "Help Center",
      icon: HelpCircle,
    },
    {
      href: "/admin-management/terms",
      label: "Terms & Conditions",
      icon: FileText,
    },
  ],
};

export const sidebarUserNavItems: NavSection = {
  invoice: [
    {
      href: "/seller-management/create-invoice",
      label: "Create Invoice",
      icon: User,
    },
    {
      href: "/seller-management/get-all-invoice",
      label: "View All Invoice",
      icon: UserCog,
    },
    {
      href: "/seller-management/update-payment",
      label: "Update Payment",
      icon: UserCog,
    }, 
  ],
  account: [
    {
      href: "/seller-management/profile",
      label: "Profile",
      icon: User,
    },
   
  ],
};
