"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FirstVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // It's good practice to register plugins outside the component or hook
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set initial state
    gsap.set(".first-vdo-wrapper", { opacity: 0 });

    // Responsive scroll distance (shorter on small/medium screens)
    const endStr =
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 1024px)").matches
        ? "+=350% bottom"
        : "+=180% bottom";

    const setupTimeline = () => {
      // Create the timeline ONLY after metadata is loaded
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".first-vdo-wrapper",
          start: "top top",
          end: endStr,
          scrub: true, // Using a number gives a smoother scrub
          pin: true,
          //   markers: true, // Uncomment to debug
        },
      });

      // 1. Fade in the video wrapper
      tl.to(".first-vdo-wrapper", {
        delay: 0.2,
        opacity: 1,
        ease: "power1.inOut",
      });

      // 2. Animate the video's currentTime at the same time
      tl.to(
        video,
        {
          currentTime: video.duration, // Now this value is guaranteed to exist
          ease: "power1.inOut",
        },
        "<" // Position parameter to start with the previous animation
      );
    };

    // This handles cases where the video is cached and metadata is already available
    if (video.readyState >= 1) {
      setupTimeline();
    } else {
      video.addEventListener("loadedmetadata", setupTimeline);
    }

    // Cleanup function to remove the event listener
    return () => {
      video.removeEventListener("loadedmetadata", setupTimeline);
    };
  }, []); // Empty dependency array ensures this runs only once

  return (
    <section className="first-vdo-wrapper relative w-full overflow-x-hidden h-[100svh] md:h-dvh">
      <div className="relative h-[100svh] md:h-dvh w-full">
        <video
          ref={videoRef}
          src="/videos/first-video.mp4"
          muted
          loop
          playsInline
          preload="auto"
          className="first-vdo absolute"
        />
      </div>
    </section>
  );
};

export default FirstVideo;
