"use client";

import { LogOut, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "../../../../public/images/logo.png";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import { Badge } from "@/components/ui/badge";
import { sidebarAdminNavItems, sidebarUserNavItems } from "./config/SidebarItems";
import { useUser } from "@/context/user.provider";
import { logoutUser } from "@/services/auth";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface NavItemProps {
  href: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

export function SidebarContent({ onLinkClick }: { onLinkClick?: () => void }) {
  const { user, loading, setLoading, setUser } = useUser();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [clickedLogout, setClickedLogut] = useState(false);

  const NavItem = ({ href, label, icon: Icon, badge }: NavItemProps) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    const handleClick = () => {
      if (onLinkClick) onLinkClick();
    };

    return (
      <Button
        asChild
        variant={isActive ? "secondary" : "ghost"}
        className={`w-full justify-start rounded-lg transition-colors ${
          isActive
            ? "bg-gray-700 text-white hover:bg-gray-600"
            : "text-gray-300 hover:bg-gray-700 hover:text-white"
        }`}
        onClick={handleClick}
      >
        <Link href={href}>
          <Icon className="mr-3 h-5 w-5" />
          <span className="flex-grow text-left">{label}</span>
          {badge && (
            <Badge className="ml-auto bg-red-500 text-white hover:bg-red-600">
              {badge}
            </Badge>
          )}
        </Link>
      </Button>
    );
  };

  const handleLogout = async () => {
    setClickedLogut(true);
    logoutUser();
    router.push("/");
    setLoading(true);
    setUser(null);
    setClickedLogut(false);
  };

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <>
      {mounted && (
        <div className="flex h-full flex-col p-4 text-gray-300 md:mt-8">
          {clickedLogout && (
            <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg bg-white/50">
              <div className="flex flex-col items-center text-white">
                <svg
                  className="animate-spin h-8 w-8 text-gray-800"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <p className="mt-3 text-lg text-blue-500">Logging out...</p>
              </div>
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center h-full">
              <HashLoader color="#fff" />
            </div>
          ) : (
            <>
              <div className="space-y-6">
                <div className="flex justify-center">
                  <Image src={Logo} alt="Logo" width={130} height={100} />
                </div>
                {/* User Profile */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-700/30">
                  <Avatar className="border-2 border-gray-600">
                    <AvatarImage
                      src="https://placehold.co/40x40/E2E8F0/4A5568?text=SG"
                      alt="User"
                      className="bg-gray-600"
                    />
                    <AvatarFallback className="bg-gray-600">US</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    {loading || !user ? (
                      <div className="space-y-2 w-full">
                        <div className="h-4 w-32 bg-gray-600 rounded animate-pulse"></div>
                        <div className="h-3 w-40 bg-gray-600 rounded animate-pulse"></div>
                      </div>
                    ) : (
                      <div className="min-w-0">
                        <p className="font-semibold text-white truncate">
                          {user.firstName || user.lastName 
                            ? `${user.firstName || ''} ${user.lastName || ''}`.trim() 
                            : 'User'}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {user.email || 'user@example.com'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-4">
                 {
                  user?.role === "admin" ?
                   <>
                   <NavItem
                    key={"/dashboard"}
                    href={"/dashboard"}
                    label="Dashboard"
                    icon={UserIcon}
                  />
                  <NavItem
                    key={"/admin-management/sales-statement"}
                    href={"/admin-management/sales-statement"}
                    label="Sales Statement"
                    icon={UserIcon}
                  />
                  <NavItem
                    key={"/admin-management/income-statement"}
                    href={"/admin-management/income-statement"}
                    label="Income Statement"
                    icon={UserIcon}
                  />
                  <NavItem
                    key={"/admin-management/show-inventory"}
                    href={"/admin-management/show-inventory"}
                    label="View Inventory"
                    icon={UserIcon}
                  />
                  <NavItem
                    key={"/admin-management/create-invoice"}
                    href={"/admin-management/create-invoice"}
                    label="Create Invoice"
                    icon={UserIcon}
                  /> 
                  <NavItem
                    key={"/admin-management/create-barcode"}
                    href={"/admin-management/create-barcode"}
                    label="Create Barcode"
                    icon={UserIcon}
                  />
                  
                  
                  
                  </> :
                       <>
                       <NavItem
                    key={"/dashboard"}
                    href={"/dashboard"}
                    label="Dashboard"
                    icon={UserIcon}
                  />
                  <NavItem
                    key={"/seller-management/show-inventory"}
                    href={"/seller-management/show-inventory"}
                    label="View Inventory"
                    icon={UserIcon}
                  />
                  <NavItem
                    key={"/seller-management/create-invoice"}
                    href={"/seller-management/create-invoice"}
                    label="Create Invoice"
                    icon={UserIcon}
                  />
                  
                 </>
                 }
                 {
                  user?.role === "admin" ?  <Accordion type="multiple" className="w-full">
                    {/* Category Management */}
                    <AccordionItem value="category" className="border-b-0">
                      <AccordionTrigger className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Category Management
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-1 px-4">
                          {sidebarAdminNavItems.category.map((item: any) => (
                            <NavItem key={item.href} {...item} />
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Product Management */}
                    <AccordionItem value="product" className="border-b-0">
                      <AccordionTrigger className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Product Management
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-1 px-4">
                          {sidebarAdminNavItems.product.map((item: any) => (
                            <NavItem key={item.href} {...item} />
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Inventory Management */}
                    <AccordionItem value="inventory" className="border-b-0">
                      <AccordionTrigger className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Inventory Management
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-1 px-4">
                          {sidebarAdminNavItems.inventory.map((item: any) => (
                            <NavItem key={item.href} {...item} />
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Invoice Management */}
                    <AccordionItem value="invoice" className="border-b-0">
                      <AccordionTrigger className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Invoice Management
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-1 px-4">
                          {sidebarAdminNavItems.invoice.map((item: any) => (
                            <NavItem key={item.href} {...item} />
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Manage Account */}
                    <AccordionItem value="account" className="border-b-0">
                      <AccordionTrigger className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Manage Account
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-1 px-4">
                          {sidebarAdminNavItems.account.map((item: any) => (
                            <NavItem key={item.href} {...item} />
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Customer Service */}
                    <AccordionItem value="service" className="border-b-0">
                      <AccordionTrigger className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Customer Service
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-1 px-4">
                          {sidebarAdminNavItems.service.map((item: any) => (
                            <NavItem key={item.href} {...item} />
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion> : 
                  <Accordion type="multiple" className="w-full">
          
                    {/* Invoice Management */}
                    <AccordionItem value="invoice" className="border-b-0">
                      <AccordionTrigger className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Invoice Management
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-1 px-4">
                          {sidebarUserNavItems.invoice.map((item: any) => (
                            <NavItem key={item.href} {...item} />
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Manage Account */}
                    <AccordionItem value="account" className="border-b-0">
                      <AccordionTrigger className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Manage Account
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-1 px-4">
                          {sidebarUserNavItems.account.map((item: any) => (
                            <NavItem key={item.href} {...item} />
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

           
                  </Accordion>
                 }
                </nav>
              </div>

              <Button
                onClick={handleLogout}
                variant="ghost"
                className="w-full justify-start mt-auto text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg cursor-pointer"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Log out
              </Button>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default SidebarContent;
