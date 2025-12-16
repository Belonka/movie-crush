import React from "react";
import { motion } from "framer-motion";

export default function ClapperLogo({ size = 40, className, speed = 1.4 }) {
  const hingeOrigin = "50% 25%"; 
   return(
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 130 130"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ overflow: "visible" }}
    >
      
      <g id="bottom">
        <rect x="8" y="36" width="104" height="64" rx="4" fill="#222" />
        
        <g fill="#333">
          <rect x="18" y="46" width="22" height="14" />
          <rect x="46" y="46" width="22" height="14" />
          <rect x="74" y="46" width="22" height="14" />
          <rect x="18" y="64" width="78" height="10" />
        </g>
      </g>

     
      <motion.g
        id="top"
        style={{ transformOrigin: hingeOrigin }}
        animate={{
          rotate: [0, -45, 0], 
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "loop",
          repeatDelay: 0.9,
        }}
      >
        
        <rect x="6" y="6" width="108" height="28" rx="3" fill="#111" />
        <g fill="#fafafa" opacity="0.95">
          <rect x="12" y="10" width="18" height="8" rx="1" />
          <rect x="36" y="10" width="18" height="8" rx="1" />
          <rect x="60" y="10" width="18" height="8" rx="1" />
          <rect x="84" y="10" width="18" height="8" rx="1" />
        </g>
        <rect x="6" y="6" width="108" height="2" fill="#000" opacity="0.2" />
      </motion.g>
    </svg>
  );
}
