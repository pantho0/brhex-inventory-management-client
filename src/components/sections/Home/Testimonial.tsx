"use client";
import React from "react";
import { Star, Plus, Minus } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"; // Adjust path if needed

// Sample data for testimonials
const testimonials = [
  {
    quote:
      "This bermiz restaurant has left the best impressions! Hospitable hosts, delicious dishes, beautiful presentation, wide wine list and wonderful dessert. I recommend to everyone! I would like to come back here again and again.",
    author: "Paul Sergeo",
  },
  {
    quote:
      "The ambiance is just perfect for a quiet, romantic dinner. The food was exquisite, and the service was impeccable. A truly five-star experience from start to finish. We will definitely be returning soon.",
    author: "Jane Doe",
  },
  {
    quote:
      "I celebrated my birthday here and it was an unforgettable night. The staff went above and beyond to make it special. Every dish was a work of art and tasted even better. Highly recommended for any occasion.",
    author: "John Smith",
  },
];

const Testimonials = () => {
  return (
    <section
      className="w-full py-20 md:py-32 text-white bg-cover bg-center bg-no-repeat"
      style={{
        // Using an inline style for the background image URL is a common and easy way
        backgroundImage: `
          linear-gradient(180deg, #0B1315 0%, rgba(11, 19, 21, 0.7) 49.35%, #0B1315 100%),
          url('/images/testimonialbg.png')
        `,
      }}
    >
      {/* Content */}
      <div className="container mx-auto max-w-4xl px-5 text-center">
        {/* Section Title */}
        <div className="flex items-center justify-center space-x-2 text-white mb-4">
          <Star size={16} fill="currentColor" />
          <h3 className="text-xl font-sans uppercase tracking-widest">
            TESTIMONIALS
          </h3>
          <Star size={16} fill="currentColor" />
        </div>

        {/* Main Heading */}
        <h2 className="text-4xl font-elsie text-white font-medium leading-tight sm:text-5xl lg:text-5xl mb-12">
          The Reviews Of Customers When Coming To Our Restaurant!
        </h2>

        {/* Shadcn Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full relative" // Added relative here to position buttons correctly
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <div className="flex flex-col items-center justify-center space-y-6">
                    <blockquote className="text-lg md:text-xl text-white font-elsie leading-relaxed max-w-3xl">
                      “{testimonial.quote}”
                    </blockquote>
                    <cite className="text-lg font-elsie text-white not-italic tracking-wider">
                      {testimonial.author}
                    </cite>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Custom Navigation Buttons */}
          <CarouselPrevious className="absolute left-[-20px] md:left-[-80px] top-1/2 -translate-y-1/2 h-12 w-12 bg-transparent border-neutral-500 text-white hover:bg-primary hover:text-black transition-colors duration-300">
            <Minus className="h-6 w-6" />
          </CarouselPrevious>
          <CarouselNext className="absolute right-[-20px] md:right-[-80px] top-1/2 -translate-y-1/2 h-12 w-12 bg-transparent border-neutral-500 text-white hover:bg-primary hover:text-black transition-colors duration-300">
            <Plus className="h-6 w-6" />
          </CarouselNext>
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
