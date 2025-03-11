"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div 
        className="rounded bg-gradient-to-r from-pink-500 to-violet-500 h-1.5 fixed top-0 left-0 z-50"
        style={{ width: `${scrollProgress}%` }}
      ></div>
      
      <header className="w-full">
        <div className="relative h-36 w-full overflow-hidden">
          <Image
            src="https://i.ibb.co/fGkHyBC1/channels4-banner.jpg"
            alt="tuubaa banner"
            fill
            priority
            className="object-cover object-[30%]"
          />
        </div>
      </header>
    </>
  );
}