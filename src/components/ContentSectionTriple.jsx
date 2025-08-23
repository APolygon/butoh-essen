import React, { useRef, useEffect, useState } from "react";

/**
 * Props:
 * - className?: string
 * - variant?: 'default' | 'image-heavy' | 'text-only'
 * - transition?: 'default' | 'slide-left' | 'slide-right' | 'scale-up' | 'fade-in' | 'none'
 * - delay?: 'none' | '100' | '200' | '300' | '400' | '500'
 * - columns?: Array<{title: string, content: string}>
 */
export default function ContentSectionTriple({
  className = "",
  variant = "default",
  transition = "default",
  delay = "none",
  columns = [],
}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  // Variant classes
  const variantClasses = {
    default: "p-8",
    "image-heavy": "p-6",
    "text-only": "p-10",
  };

  // Transition classes
  const transitionClasses = [];
  if (transition && transition !== "none") {
    transitionClasses.push("section-transition");
    if (transition !== "default") transitionClasses.push(transition);
    if (delay && delay !== "none") transitionClasses.push(`delay-${delay}`);
  }
  if (inView) transitionClasses.push("in-view");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`bg-white/5 rounded-xl my-6 md:my-8 lg:my-10 backdrop-blur-md border border-white/10 ${
        variantClasses[variant] || ""
      } ${transitionClasses.join(" ")} ${className}`}
      style={{
        marginLeft: 0,
        marginRight: 0,
      }}
    >
      <div
        className="flex flex-col md:flex-row gap-8 w-full"
        style={{ background: "rgba(255,0,0,0.1)" }}
      >
        {columns.map((col, idx) => (
          <div key={idx} className="flex-1 min-w-0 p-4">
            <h2 className="text-xl font-bold mb-4">{col.title}</h2>
            <div
              className=""
              dangerouslySetInnerHTML={{ __html: col.content }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
