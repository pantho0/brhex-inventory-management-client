"use client";
import React, { useRef } from "react";
import { Star, Sun, Moon, Cake, UtensilsCrossed } from "lucide-react";

// GSAP Imports
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger globally once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Data for the services
const services = [
  {
    icon: <Sun className="h-10 w-10 text-primary" />,
    title: "Lunch",
    description:
      "Lacus, risus, diam sit gravida phasellus pretium sodales. Cursus rutrum lorem nulla eu amet mattis.",
  },
  {
    icon: <Moon className="h-10 w-10 text-primary" />,
    title: "Dinner",
    description:
      "Amet, ac enim sed morbi pretium. Scelerisque id in nisi ullamcorper. Bibendum sit viverra enim.",
  },
  {
    icon: <Cake className="h-10 w-10 text-primary" />,
    title: "Birthday",
    description:
      "Lacus, risus, diam sit gravida phasellus pretium sodales. Cursus rutrum lorem nulla eu amet mattis.",
  },
  {
    icon: <UtensilsCrossed className="h-10 w-10 text-primary" />,
    title: "Catering",
    description:
      "Nullam quis tristique scelerisque proin. Ultricies augue hac eu aliquet in. Urna mattis a gravida.",
  },
];

const WhyChooseUs = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      // --- Entrance Animation for Content ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          toggleActions: "play pause resume reset",
        },
      });

      tl.from(".section-header > *", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.2,
      });

      tl.from(
        ".service-item",
        {
          opacity: 0,
          y: 50,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.2,
        },
        "-=0.3"
      );

      // --- Parallax Effect for Background ---
      gsap.to(container.current, {
        backgroundPosition: "50% 100%", // Move background vertically
        ease: "none", // Linear movement
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom", // Start when the top of the section hits the bottom of the viewport
          end: "bottom top", // End when the bottom of the section hits the top of the viewport
          scrub: true, // Link animation progress directly to scrollbar
        },
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="text-primary py-20 md:py-28"
      style={{
        backgroundImage: `url('/images/whychooseusbg.png')`,
        backgroundSize: "cover",
        // Set the initial background position
        backgroundPosition: "50% 0%",
      }}
    >
      <div className="container mx-auto max-w-7xl px-5 text-center">
        {/* Section Header */}
        <div className="mb-16 section-header">
          <div className="flex items-center justify-center space-x-2 text-primary mb-4">
            <Star size={16} fill="currentColor" />
            <h3 className="text-sm font-sans text-primary uppercase tracking-widest">
              SERVICES
            </h3>
            <Star size={16} fill="currentColor" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-elsie font-medium">
            Why Choose Us
          </h1>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-6 service-item"
            >
              <div className="flex h-24 w-24 text-primary items-center justify-center rounded-full border-2 border-primary/50 bg-black/20 transition-all duration-300 hover:border-primary hover:bg-primary/10">
                {service.icon}
              </div>
              <div className="space-y-3">
                <h2 className="text-3xl font-elsie text-primary">
                  {service.title}
                </h2>
                <p className="text-secondary leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
