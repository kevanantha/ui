"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { stagger, useAnimate, motion, animate } from "framer-motion";
import { useState } from "react";

let STAR_LENGTH = 10;

type AnimationSequence = Parameters<typeof animate>[0];

let randomNumberBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default function ButtonPage() {
  let [label, setLabel] = useState("motion_xxx");
  let [scope, animate] = useAnimate();

  function handleClick() {
    let stars = Array.from({ length: STAR_LENGTH });

    let starAnimation: AnimationSequence = stars.map((_, i) => {
      return [
        `.star-${i}`,
        {
          y: randomNumberBetween(-100, 100),
          x: randomNumberBetween(-100, 100),
          scale: [0, 1, 1, 0.5, 0],
          opacity: [0, 1],
        },
        {
          duration: 0.7,
          type: "spring",
          stiffness: 100,
          damping: 20,
          mass: 1,
          delay: 0.1,
          at: "<",
        },
      ];
    });

    let starResetAnimation: AnimationSequence = stars.map((_, i) => {
      return [
        `.star-${i}`,
        {
          y: 0,
          x: 0,
        },
        {
          duration: 0.00000000001,
        },
      ];
    });

    let starFadeOutAnimation: AnimationSequence = stars.map((_, i) => {
      return [
        `.star-${i}`,
        {
          scale: 0,
          opacity: 0,
        },
        {
          duration: 0.2,
          delay: 0.5,
          at: "<",
        },
      ];
    });

    animate([
      ...starResetAnimation,
      [
        ".letter",
        { y: -14 },
        {
          type: "spring",
          stiffness: 200,
          damping: 15,
          mass: 0.5,
          delay: stagger(0.04),
        },
      ],
      ...starAnimation,
      [".letter", { y: 0 }, { duration: 0.00000000001 }],
      ...starFadeOutAnimation,
    ]);
  }

  return (
    <div className="h-screen grid place-items-center">
      <Input
        onChange={(e) => setLabel(e.target.value)}
        value={label}
        className="fixed top-4 mx-auto w-fit"
        maxLength={10}
      />
      <div ref={scope}>
        <motion.div
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          className="flex justify-center"
        >
          <Button
            onClick={handleClick}
            className="rounded-full h-fit"
            variant="outline"
          >
            <span className="sr-only uppercase">{label}</span>
            <span aria-hidden className="overflow-hidden leading-none">
              {label.split("").map((letter, i) => (
                <span
                  key={`${letter}-${i}`}
                  data-letter={letter}
                  className="inline-block uppercase letter relative after:absolute after:left-0 after:top-[14px] after:content-[attr(data-letter)]"
                >
                  {letter}
                </span>
              ))}
            </span>
            <span aria-hidden className="absolute -z-10 pointer-events-none">
              {Array.from({ length: STAR_LENGTH }).map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`w-5 h-5 star-${i} absolute left-1/2 top-1/2 opacity-0`}
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
            </span>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
