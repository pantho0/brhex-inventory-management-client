"use client";
import React, { useRef } from "react";
import { Star } from "lucide-react";
import Image from "next/image";

// GSAP Imports
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger globally once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Data for the owners
const owners = [
  {
    name: "Eleanor Vance",
    speciality: "Head Chef & Visionary",
    image: "/images/female.webp", // Replace with your owner image 1
    alt: "Smiling female owner chef",
  },
  {
    name: "Arthur Vance",
    speciality: "Operations Manager",
    image: "/images/male.webp", // Replace with your owner image 2
    alt: "Smiling male owner in kitchen",
  },
];

const MeetTheOwners = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%", // Animation starts when 80% of the section is visible
          toggleActions: "play pause resume reset", // Replays animation on scroll
          // markers: true, // Uncomment for debugging
        },
      });

      // Animate the header text
      tl.from(".owners-header > *", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.2,
      });

      // Animate the owner cards with a stagger effect
      tl.from(
        ".owner-card",
        {
          opacity: 0,
          y: 50,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.3, // Stagger effect for each owner card
        },
        "-=0.3" // Starts slightly before the header animation ends
      );
    },
    { scope: container }
  );

  return (
    <section ref={container} className="text-primary py-20 md:py-28">
      <div className="container mx-auto max-w-5xl px-5 text-center">
        {/* Section Header */}
        <div className="mb-16 owners-header">
          <div className="flex items-center justify-center space-x-2 text-primary mb-4">
            <Star size={16} fill="currentColor" />
            <h3 className="text-sm font-sans uppercase tracking-widest">
              AMAZING TEAM
            </h3>
            <Star size={16} fill="currentColor" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-elsie font-medium">
            Meet The Owners
          </h1>
        </div>

        {/* Owners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
          {owners.map((owner, index) => (
            <div
              key={index}
              className="owner-card flex flex-col items-center max-w-sm"
            >
              <div className="relative w-full h-80 overflow-hidden rounded-lg shadow-lg mb-6">
                <Image
                  src={owner.image}
                  alt={owner.alt}
                  fill
                  objectFit="cover"
                  className="transition-transform duration-500 hover:scale-105"
                />
              </div>
              <h2 className="text-3xl font-elsie text-primary mb-2">
                {owner.name}
              </h2>
              <p className="text-secondary font-sans">{owner.speciality}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetTheOwners;
