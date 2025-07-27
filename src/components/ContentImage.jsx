import React, { useRef, useEffect, useState } from "react";

export default function ContentImage({
  src,
  alt,
  caption,
  width,
  height,
  className = "",
  transition = "default",
  delay = "none",
  noShadow = false,
}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  // Build transition classes
  const transitionClasses = [];
  if (transition !== "none") {
    transitionClasses.push("section-transition");
    if (transition !== "default") transitionClasses.push(transition);
    if (delay !== "none") transitionClasses.push(`delay-${delay}`);
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
      className={`content-image ${transitionClasses.join(" ")} ${className}`}
    >
      <img src={src} alt={alt} width={width} height={height} loading="lazy" />
      {caption && <p className="image-caption">{caption}</p>}
      <style jsx>{`
        .content-image {
          margin: 2rem 0;
          text-align: center;
        }
        .content-image img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          ${!noShadow ? "box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);" : ""}
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .content-image img:hover {
          transform: translateY(-2px);
          ${!noShadow ? "box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);" : ""}
        }
        .image-caption {
          margin-top: 0.75rem;
          font-size: 0.9rem;
          color: #a8b2d1;
          font-style: italic;
          line-height: 1.4;
        }
        @media (max-width: 768px) {
          .content-image {
            margin: 1.5rem 0;
          }
          .content-image img {
            border-radius: 6px;
          }
          .image-caption {
            font-size: 0.85rem;
            margin-top: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}
