"use client";
import React, { useRef } from "react";
import { Star } from "lucide-react"; // Only Star is used from lucide-react in this design
import Image from "next/image";
import { Button } from "@/components/ui/button"; // Assuming your Button component
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import sprinklesalt from "../../../../public/images/food1.jpg";
import restaurantInterior from "../../../../public/images/restaurant.png";
import Link from "next/link";

const imgFoodSalt = sprinklesalt;
const imgRestaurantInterior = restaurantInterior;

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Quality = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
          toggleActions: "play pause resume reset",
        },
      });

      tl.from(".chef-secret-image-1", {
        opacity: 0,
        x: -100,
        duration: 0.8,
        ease: "power2.out",
      });

      tl.from(
        ".chef-secret-image-2",
        {
          opacity: 0,
          x: 100,
          duration: 0.8,
          ease: "power2.out",
        },
        "<+0.2"
      );

      tl.from(
        ".chef-secret-text-content > *",
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
        },
        "<0.3"
      );
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="container mx-auto px-5 md:px-0 max-w-6xl py-12 md:py-28 text-white"
    >
      {/* Main Heading */}
      <h1 className="text-center text-4xl sm:text-5xl text-primary font-bold lg:text-6xl font-elsie leading-tight mb-16 px-4">
        Various Quality Specialities Made With A Personal Touch
      </h1>

      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Left Column: Image Composition */}
        <div className="relative h-[550px] w-full sm:h-[650px] lg:h-[600px] flex justify-center items-center">
          {/* Image 1: Food with salt */}
          <div className="absolute left-0 top-0 h-2/5 w-2/3 transform transition-transform duration-500 hover:scale-105">
            <Image
              src={imgFoodSalt}
              alt="Hand sprinkling salt over food"
              width={400}
              height={300}
              className="h-full w-full rounded-lg object-cover shadow-lg chef-secret-image-1"
              priority // For images in the initial viewport
            />
          </div>

          {/* Image 2: Restaurant Interior */}
          <div className="absolute bottom-0 right-0 h-4/5 w-4/5 transform transition-transform duration-500 hover:scale-105">
            <Image
              src={imgRestaurantInterior}
              alt="Cozy restaurant interior with tables and chairs"
              width={500}
              height={600}
              className="h-full w-full rounded-lg object-cover shadow-2xl chef-secret-image-2"
              priority
            />
          </div>
        </div>

        {/* Right Column: Text Content */}
        <div className="mt-20 md:mt-0 flex flex-col justify-center space-y-7 chef-secret-text-content">
          <div className="flex items-center space-x-2 text-primary">
            <Star size={18} fill="currentColor" />
            <h3 className="text-sm font-sans uppercase md:text-2xl">
              CHEFS SECRETS
            </h3>
            <Star size={18} fill="currentColor" />
          </div>

          <h2 className="text-4xl font-elsie text-primary leading-tight sm:text-5xl lg:text-6xl">
            Truly Exotic & Appetizing Cuisine For Thous Special Moments In Life
          </h2>

          <p className="text-secondary md:text-lg font-sans">
            Nam turpis quis fermentum egestas nibh diam feugiat faucibus.
            Commodo tellus lorem fames mauris, at praesent gravida. Porttitor eu
            eu sed vestibulum, tortor cursus nunc. Sit egestas diam quam integer
            augue cum erat egestas convallis.
          </p>

          <div className="space-y-2 pt-4">
            <p className="text-secondary font-sans text-lg">Booking Request</p>
            <h4 className="text-4xl font-elsie text-primary">
              +01-2345-678-990
            </h4>
          </div>

          <div className="pt-2 flex justify-center md:justify-start">
            <Link href="/reservation">
              <Button className="bg-primary px-8 py-8 text-base text-white hover:bg-primary/80 rounded-none hover:text-white hover:cursor-pointer">
                Make A Reservation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quality;
