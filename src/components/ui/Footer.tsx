"use client";
import React from "react";
import { Facebook, Twitter, Instagram, Youtube, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo2 from "../../../public/images/logo2.png";

const Footer = () => {
  return (
    <footer className="text-neutral-400 font-sans">
      <div className="container mx-auto max-w-7xl px-5 py-20">
        {/* Top Section: Logo */}
        <div className="flex justify-center mb-16">
          <div>
            <Image
              width={200}
              height={150}
              src={logo2}
              alt="logo"
              className="md:w-[200px] w-[120px]"
            />
          </div>
        </div>

        {/* Middle Section: Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 text-center md:text-left">
          {/* Column 1: About Bermiz */}
          <div className="flex flex-col items-center md:items-start space-y-6">
            <h2 className="text-lg font-semibold uppercase tracking-wider text-primary">
              About Kutum
            </h2>
            <p className="leading-relaxed max-w-sm text-secondary">
              Vitae neque libero ullamcorper gravida fusce donec feugiat massa
              dui. Turpis massa et ipsum orci, sem commodo. Sapien hendrerit
              cursus eros.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                aria-label="Facebook"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Newsletter */}
          <div className="flex flex-col items-center md:items-start space-y-6">
            <h2 className="text-lg font-semibold uppercase tracking-wider text-primary">
              Newsletter
            </h2>
            <p className="leading-relaxed text-secondary">
              Subscribe & get 10% discount. Get E-mail updates about our latest
              shop and special offers.
            </p>
            <form className="w-full max-w-sm relative">
              <Input
                type="email"
                placeholder="Your Email Address"
                className="bg-transparent border-0 border-b border-neutral-600 rounded-none placeholder:text-neutral-500 py-6 pl-0"
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-primary hover:bg-transparent"
              >
                <Send size={20} />
              </Button>
            </form>
          </div>

          {/* Column 3: Contact Us */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h2 className="text-lg font-semibold uppercase tracking-wider text-primary">
              Contact Us
            </h2>
            <address className="not-italic leading-relaxed space-y-4 text-secondary">
              <p>Kutum Restaurant, 71 Madison Ave, New York, USA</p>
              <p>
                <a
                  href="tel:+12345678899"
                  className="hover:text-primary/80 text-secondary transition-colors"
                >
                  +1(234)567 8899
                </a>
              </p>
              <p>
                <a
                  href="mailto:booking@bermiz.com"
                  className="hover:text-primary/80 text-secondary transition-colors"
                >
                  booking@bermiz.com
                </a>
              </p>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary">
        <div className="container mx-auto max-w-7xl px-5 py-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="mb-4 md:mb-0">
            © Copyright Kutum Theme for Restaurant & Cafe.
          </p>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-secondary hover:text-primary/80 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-secondary hover:text-primary/80 transition-colors"
            >
              Terms Of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
