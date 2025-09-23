"use client";
import React, { useRef } from "react";
import { Soup, Star, Store } from "lucide-react";
import Image from "next/image";
import restaurant from "../../../../public/images/restaurant.png";
import food from "../../../../public/images/food1.jpg";

// GSAP Imports
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger globally once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Exceptional = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      // Animation for images and text content
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%", // Animation starts when 75% of the section is visible
          toggleActions: "play pause resume reset", // Replay on scroll in/out
          // markers: true, // Uncomment for debugging scroll trigger
        },
      });

      // Animate the main title and subtitle
      tl.from(".exceptional-hero > *", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2,
      });

      // Animate the "Quiet Environment" feature
      tl.from(
        ".quiet-environment-feature",
        {
          opacity: 0,
          x: -50,
          duration: 0.8,
          ease: "power2.out",
        },
        "<0.3" // Starts 0.3s after the previous animation
      );

      // Animate the first image
      tl.from(
        ".left-column-image",
        {
          opacity: 0,
          scale: 0.8,
          duration: 1,
          ease: "power2.out",
        },
        "<0.3"
      ); // Starts 0.3s after the previous animation

      // Animate the main description paragraph
      tl.from(
        ".main-description-text",
        {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power2.out",
        },
        "<0.3"
      );

      // Animate the "Hygienic Food" feature
      tl.from(
        ".hygienic-food-feature",
        {
          opacity: 0,
          x: 50,
          duration: 0.8,
          ease: "power2.out",
        },
        "<0.3"
      );

      // Animate the second image
      tl.from(
        ".right-column-image",
        {
          opacity: 0,
          scale: 0.8,
          duration: 1,
          ease: "power2.out",
        },
        "<0.3"
      );

      // Animate the "Explore Us" button
      tl.from(
        ".explore-us-button",
        {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power2.out",
        },
        "<0.3"
      );
    },
    { scope: container }
  );

  return (
    <section ref={container} className="text-white py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column */}
          <div className="flex flex-col space-y-10">
            <div className="space-y-6 exceptional-hero">
              <div className="flex items-center space-x-2 text-primary">
                <Star size={16} fill="currentColor" />
                <h3 className="text-xl font-sans text-primary uppercase tracking-widest">
                  OUR RESTAURANT
                </h3>
                <Star size={16} fill="currentColor" />
              </div>
              <h1 className="text-4xl text-primary sm:text-5xl lg:text-6xl font-elsie font-medium leading-tight">
                The Perfect Place For An Exceptional Experience
              </h1>
            </div>

            {/* Quiet Environment Feature */}
            <div className="flex gap-8 quiet-environment-feature">
              <div className="flex-shrink-0 border-neutral-700 p-3">
                <Store className="text-primary size-20" strokeWidth={1.5} />
              </div>
              <div className="space-y-2">
                <h4 className="text-3xl text-primary font-elsie">
                  Quiet Environment
                </h4>
                <p className="text-secondary leading-relaxed text-lg">
                  Objectively transition virtual functionalities via
                  enterprise-wide benefits.
                </p>
              </div>
            </div>

            {/* Left Column Image with fixed height */}
            <div className="relative w-full h-[400px] sm:h-[450px] lg:h-[500px] rounded-lg overflow-hidden left-column-image">
              <Image
                src={restaurant}
                alt="Delicious burger and fries on a table"
                fill // Use fill to make image cover its parent div
                objectFit="cover" // Ensure it covers without distortion
                className="rounded-lg shadow-lg"
              />
              {/* If you have the award emblem, you'd place it here */}
              {/* <div className="absolute top-4 right-4 h-24 w-24 flex items-center justify-center z-10">
                <img
                  src="/images/award-emblem.svg" // Path to your circular award emblem SVG
                  alt="Restaurant of the year award"
                  className="h-full w-full"
                />
              </div> */}
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col space-y-10">
            <p className="text-secondary leading-relaxed text-lg main-description-text">
              Elementum, interdum arcu pulvinar vitae aenean arcu rutrum locus.
              Cursus phasellus tempus nunc netus. Non, viverra quisque commodo
              porttitor imperdiet pretium, congue.
              <br />
              <br />
              Tempor felis eget quisque ultrices aliquam dolor id vel. Diam
              facilisi vitae suspendisse dolor at congue amet. Lorem convallis
              erat a, accumsan id nam curabitur turpis magna. Sagittis, posuere
              rhoncus diam facilisi consectetur suspendisse elementum ipsum
              nisi.
            </p>

            {/* Hygienic Food Feature */}
            <div className="flex gap-8 hygienic-food-feature">
              <div className="flex-shrink-0 border-neutral-700 p-3">
                <Soup className="text-primary size-20" strokeWidth={1.5} />
              </div>
              <div className="space-y-2">
                <h4 className="text-3xl text-primary font-elsie">
                  Hygienic Food
                </h4>
                <p className="text-secondary leading-relaxed text-lg">
                  Objectively transition virtual functionalities via
                  enterprise-wide benefits. Sagittis molestie nulla morbi
                  ultrices.
                </p>
              </div>
            </div>

            {/* Right Column Image with fixed height */}
            <div className="relative w-full h-[400px] sm:h-[450px] lg:h-[500px] rounded-lg overflow-hidden right-column-image">
              <Image
                src={food} // Using the food image you provided
                alt="Friends enjoying a meal at the restaurant"
                fill // Use fill to make image cover its parent div
                objectFit="cover" // Ensure it covers without distortion
                className="rounded-lg shadow-lg"
              />
            </div>
            {/* <div className="flex justify-start explore-us-button">
              <Button className="bg-primary px-8 py-7 text-base text-black hover:bg-secondary hover:border hover:border-primary rounded-none hover:text-foreground">
                Explore Us
              </Button>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Exceptional;
