"use client";

import { useState, useEffect, useRef } from "react";

const ROLES = ["AI/ML Engineer", "RAG Specialist", "Automation Builder"];

const TYPE_DURATION = 1500;
const DELETE_DURATION = 1500;
const PAUSE_DURATION = 2500;

export function TypingRole() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const frameRef = useRef(0);
  const startRef = useRef(0);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];

    const step = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;

      if (!isDeleting) {
        const progress = Math.min(elapsed / TYPE_DURATION, 1);
        const charsToShow = Math.floor(progress * currentRole.length);
        setText(currentRole.slice(0, charsToShow));

        if (progress >= 1) {
          setTimeout(() => {
            setIsDeleting(true);
            startRef.current = 0;
          }, PAUSE_DURATION);
          return;
        }
      } else {
        const progress = Math.min(elapsed / DELETE_DURATION, 1);
        const charsToShow = Math.floor((1 - progress) * currentRole.length);
        setText(currentRole.slice(0, charsToShow));

        if (progress >= 1) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
          startRef.current = 0;
          return;
        }
      }

      frameRef.current = requestAnimationFrame(step);
    };

    frameRef.current = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(frameRef.current);
      startRef.current = 0;
    };
  }, [roleIndex, isDeleting]);

  return (
    <span className="gradient-text">
      {text}
      <span className="cursor-blink ml-1 inline-block h-[1em] w-[3px] translate-y-[2px] bg-accent" />
    </span>
  );
}
