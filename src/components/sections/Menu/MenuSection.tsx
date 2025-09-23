/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Star,
  Utensils,
  Coffee,
  Salad,
  Soup,
  CakeSlice,
  GlassWater,
} from "lucide-react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// GSAP Imports
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGetMenu } from "@/hooks/menu.hook";
import { MenuItemCardProps } from "@/components/adminDashboard/MenuItemCard";
import { useGetCategory } from "@/hooks/category.hook";

// Register ScrollTrigger globally once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const MenuSection = () => {
  const container = useRef(null);
  const menuGridRef = useRef(null);
  const [activeTab, setActiveTab] = useState("");

  const { mutate: getAllMenu, data } = useGetMenu();
  const { data: categoryData } = useGetCategory();

  const menuTabs = categoryData?.data.map((item: any) => item.catName);
  console.log(menuTabs);

  const menuItems: MenuItemCardProps[] = data?.data?.data;

  useEffect(() => {
    if (activeTab === "all") {
      getAllMenu({});
    } else {
      getAllMenu({ category: activeTab });
    }
  }, [getAllMenu, activeTab]);

  // GSAP animation for tab changes
  useEffect(() => {
    if (menuGridRef.current) {
      gsap.fromTo(
        // @ts-ignore
        menuGridRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
    }
  }, [activeTab]);

  useGSAP(
    () => {
      // Entrance animation for the whole section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          toggleActions: "play pause resume reset",
        },
      });

      tl.from(".menu-header > *", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.2,
      });

      tl.from(
        ".menu-tabs-list",
        {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.3"
      );
    },
    { scope: container }
  );

  return (
    <section ref={container} className="text-white py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-5">
        {/* Header */}
        <div className="text-center mb-12 menu-header">
          <div className="flex items-center justify-center space-x-2 text-primary mb-4">
            <Star size={16} fill="currentColor" />
            <h3 className="text-sm font-sans text-primary uppercase tracking-widest">
              OUR MENU
            </h3>
            <Star size={16} fill="currentColor" />
          </div>
          <h1 className="text-4xl text-primary sm:text-5xl lg:text-6xl font-elsie font-medium mb-4">
            Tasty With Good Price
          </h1>
          <p className="max-w-3xl mx-auto text-secondary leading-relaxed">
            Diam leo massa pellentesque a neque turpis cum mi gravida. Amet
            massa adipiscing mi dictum urna commodo. Fringilla ipsum etiam
            habitasse dolor lacus viverra.
          </p>
        </div>
        {/* tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 h-auto bg-transparent p-0 mb-12 menu-tabs-list">
            <TabsTrigger
              key={"all"}
              value={"all"}
              onChange={() => setActiveTab("all")}
              className="flex flex-col items-center cursor-pointer justify-center gap-2 h-28 text-neutral-400 data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none transition-colors duration-300"
            >
              <Utensils />
              <span className="text-lg font-medium">{"ALL"}</span>
            </TabsTrigger>
            {menuTabs?.map((tab: string) => (
              <TabsTrigger
                key={tab}
                value={tab}
                onChange={() => setActiveTab(tab)}
                className="flex flex-col items-center cursor-pointer justify-center gap-2 h-28 text-gray-600 data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none transition-colors duration-300"
              >
                {(tab === "all" && <Utensils />) ||
                  (tab === "breakfast" && <Coffee />) ||
                  (tab === "lunch" && <Salad />) ||
                  (tab === "dinner" && <Soup />) ||
                  (tab === "dessert" && <CakeSlice />) ||
                  (tab === "drinks" && <GlassWater />) || <Utensils />}
                <span className="text-lg font-medium">{tab.toUpperCase()}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab}>
            <div
              ref={menuGridRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {menuItems?.length === 0 ? (
                <div className="col-span-12">
                  <p className="text-center text-secondary">
                    No menu items found
                  </p>
                </div>
              ) : (
                menuItems?.map((item, index) => (
                  <div
                    key={`${item.itemName}-${index}`}
                    className="flex items-center gap-6"
                  >
                    <div className="flex-shrink-0 w-28 h-28">
                      <Image
                        src={item.image}
                        alt={item.itemName}
                        width={112}
                        height={112}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-2xl font-elsie text-primary">
                        {item.itemName}
                      </h3>
                      <p className="my-2 text-secondary">{item.description}</p>
                      <p className="text-xl font-bold text-primary">
                        ${item.price}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default MenuSection;
