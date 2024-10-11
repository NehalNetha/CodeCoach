"use client"
import React from 'react';
import { motion } from 'framer-motion';

const EnhancedAIAnimation = () => {
  const nodeVariants = {
    pulse: {
      scale: [1, 1.2, 1],
      transition: { duration: 0.5, repeat: Infinity, repeatType: "reverse" }
    }
  };

  const lineVariants = {
    flow: {
      pathLength: [0, 1],
      pathOffset: [0, 1],
      transition: { duration: 2, repeat: Infinity, ease: "linear" }
    }
  };

  return (
    <motion.svg
      viewBox="0 0 200 200"
      className="w-[25rem] h-[25rem]"
    >
      {/* Background grid */}
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E5E7EB" strokeWidth="0.5" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#grid)" />

      {/* Neural network nodes */}
      {[[40,40], [40,100], [40,160], [100,70], [100,130], [160,100]].map(([cx, cy], i) => (
        <motion.circle key={i} cx={cx} cy={cy} r="6" fill="#34D399" 
          variants={nodeVariants} animate="pulse"
        />
      ))}

      {/* Connections */}
      {[[40,40,100,70], [40,40,100,130], [40,100,100,70], [40,100,100,130], 
        [40,160,100,70], [40,160,100,130], [100,70,160,100], [100,130,160,100]].map(([x1,y1,x2,y2], i) => (
        <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#34D399" strokeWidth="2"
          variants={lineVariants} animate="flow" 
        />
      ))}

      {/* Animated data points */}
      {[[70,55], [70,115], [130,85]].map(([cx, cy], i) => (
        <motion.circle key={i} cx={cx} cy={cy} r="3" fill="#3B82F6"
          animate={{
            x: [0, 30, 0],
            y: [0, 15, 0],
            scale: [1, 1.2, 0.8, 1],
            opacity: [1, 0.7, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 1
          }}
        />
      ))}

      {/* Central processing unit */}
      <motion.rect x="90" y="90" width="20" height="20" fill="#34D399" 
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </motion.svg>
  );
};

export default EnhancedAIAnimation;
