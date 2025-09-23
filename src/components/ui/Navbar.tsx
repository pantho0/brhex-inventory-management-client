import Image from "next/image";
import logo from "../../../public/images/logo.png";

import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Menu } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const navItems = [
    { key: "/", label: "Home" },
    { key: "/menu", label: "Menu" },
    { key: "/reservation", label: "Reservation" },
    { key: "/about", label: "About" },
    { key: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary">
      <div className="flex justify-between max-w-6xl mx-auto p-4 items-center">
        <div>
          <Image
            width={200}
            height={150}
            src={logo}
            alt="logo"
            className="md:w-[200px] w-[120px]"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:hidden lg:flex gap-2 items-center">
          <ul className="flex gap-5 font-medium text-xl hover:cursor-pointer items-center">
            {navItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.key}
                  className="text-primary-foreground hover:font-semibold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:flex lg:hidden items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:block lg:hidden"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-primary border-border p-2"
            >
              {navItems.map((item) => (
                <DropdownMenuItem
                  key={item.key}
                  className="text-base cursor-pointer p-3 hover:bg-accent hover:text-accent-foreground text-foreground"
                >
                  <Link href={item.key}>{item.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
