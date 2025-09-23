"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SidebarContent } from "../_components/SidebarContent";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1 h-full">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-72 bg-black text-white overflow-y-auto left-0 bottom-0 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 hover:scrollbar-thumb-gray-500">
          <SidebarContent />
        </aside>

        {/* Mobile Sidebar Toggle */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="fixed left-2 top-20 z-40 bg-gray-800 text-white hover:bg-gray-700 border border-gray-600"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-72 p-0 bg-gray-800 text-white border-r-0 top-0 h-screen pt-0"
            style={{ "--tw-translate-y": "0" } as React.CSSProperties}
          >
            <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 hover:scrollbar-thumb-gray-500">
              <SidebarContent onLinkClick={() => setIsSheetOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>

        {/* Main Content - Only this area should scroll */}
        <main className="flex-1 bg-white dark:bg-gray-900 overflow-y-auto">
          <div className="min-h-[calc(100vh-4rem)]">
            <div className="p-4 sm:p-6">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
