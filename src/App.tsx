import React from 'react';
import { useState, useRef } from 'react';
import { motion, MotionValue, useMotionValue, useTransform, useSpring } from 'framer-motion';
import useMeasure from 'react-use-measure';
import './App.scss';

function Dock() {
  let mouseX = useMotionValue(0);

  function AppIcon({ mouseX }: { mouseX?: MotionValue<number> }) {
    const [ref, bounds] = useMeasure();
    const defaultMotionValue = useMotionValue(Infinity);
    const distance = useTransform(
      mouseX ?? defaultMotionValue,
      (val) => val - bounds.left - bounds.width / 2
    );

    const widthSync = useTransform(distance, [-200, 0, 200], [40, 80, 40]);
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    const scaleSync = useTransform(distance, [-200, 0, 200], [1, 1.15, 1]);
    const scale = useSpring(scaleSync, { mass: 0.1, stiffness: 150, damping: 12 });

    return (
      <>
    <motion.div
  ref={ref}
  style={{ width, scale, zIndex: 1, transformOrigin: 'bottom' }}
  className="w-10 aspect-square bg-gray-500 rounded-full"
/>




      </>
    );
  }

  return (
    <motion.div
      onMouseLeave={() => mouseX.set(Infinity)}
      onMouseMove={(e) => mouseX.set(e.pageX)}
      className="testing mx-auto pb-5 rounded-2xl bg-gray-700 flex items-end gap-4 p-4 h-20 relative"


    >
      {[...Array(8).keys()].map((i) => (
        <AppIcon mouseX={mouseX} key={i} />
      ))}
    </motion.div>
  );
}

function App() {
  return (
    <>
      <Dock />
    </>
  );
}

export default App;
