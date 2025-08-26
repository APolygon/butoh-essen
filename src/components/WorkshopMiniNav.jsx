import React, { useEffect, useState, useMemo, useRef } from "react";

/**
 * Props:
 * - sections: Array<{ id: string, title: string }>
 */
export default function WorkshopMiniNav({ sections = [] }) {
  const [activeId, setActiveId] = useState(null);
  const [fixed, setFixed] = useState(false);
  const [navHeight, setNavHeight] = useState(44);
  const navRef = useRef(null);
  const anchorRef = useRef(null);
  const listRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const sectionIds = useMemo(() => sections.map((s) => s.id), [sections]);

  useEffect(() => {
    if (sectionIds.length === 0) return;
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        } else {
          // Fallback: find the closest section above viewport
          const top = window.scrollY;
          let closestId = activeId;
          for (const el of elements) {
            if (el.offsetTop <= top + 120) {
              closestId = el.id;
            }
          }
          if (closestId) setActiveId(closestId);
        }
      },
      {
        root: null,
        rootMargin: "-120px 0px -50% 0px", // Match scroll-margin-top (70px + 44px + 6px)
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  // Center the active item within the horizontal list
  const centerItem = (id) => {
    if (!id || !listRef.current) return;
    const container = listRef.current;
    const el = container.querySelector(`[data-id="${id}"]`);
    if (!el) return;
    const elLeft = el.offsetLeft;
    const elWidth = el.offsetWidth;
    const target = elLeft - (container.clientWidth - elWidth) / 2;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const left = Math.max(0, Math.min(target, maxScroll));
    container.scrollTo({ left, behavior: "smooth" });
  };

  useEffect(() => {
    centerItem(activeId);
  }, [activeId]);

  // Fixed-on-scroll fallback to ensure sticky behavior below main navbar
  useEffect(() => {
    const onScroll = () => {
      const topOffset = window.innerWidth <= 1024 ? 70 : 70; // align exactly under navbar
      if (navRef.current) setNavHeight(navRef.current.offsetHeight || 44);
      const anchorEl = anchorRef.current;
      if (!anchorEl) return;
      const rect = anchorEl.getBoundingClientRect();
      // When the anchor reaches the navbar bottom, fix the nav
      setFixed(rect.top <= topOffset);
      // Update horizontal scroll availability
      if (listRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = listRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
      }
    };
    const onResize = () => onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const handleClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;

    // Scroll the element into view - this will work with CSS scroll-snap
    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    centerItem(id);

    // Update hash without immediate jump
    if (history.pushState) {
      history.pushState(null, "", `#${id}`);
    } else {
      window.location.hash = id;
    }
  };

  if (!sections || sections.length === 0) return null;

  return (
    <>
      {/* Anchor to detect when to fix the nav and to reserve space when fixed */}
      <div ref={anchorRef} />
      <nav
        ref={navRef}
        className={`workshop-mini-nav${fixed ? " fixed" : ""}`}
        style={fixed ? { top: 70, left: 0, right: 0 } : undefined}
      >
        <button
          className={`mini-nav-arrow left${canScrollLeft ? "" : " disabled"}`}
          aria-label="Scroll left"
          onClick={() => {
            if (!listRef.current) return;
            listRef.current.scrollBy({ left: -200, behavior: "smooth" });
          }}
        >
          ◀
        </button>
        <ul
          className="mini-nav-list"
          ref={listRef}
          onScroll={(e) => {
            const el = e.currentTarget;
            setCanScrollLeft(el.scrollLeft > 0);
            setCanScrollRight(
              el.scrollLeft + el.clientWidth < el.scrollWidth - 1
            );
          }}
        >
          {sections.map((s) => (
            <li
              key={s.id}
              data-id={s.id}
              className={activeId === s.id ? "active" : ""}
            >
              <a href={`#${s.id}`} onClick={(e) => handleClick(e, s.id)}>
                {s.title}
              </a>
            </li>
          ))}
        </ul>
        <button
          className={`mini-nav-arrow right${canScrollRight ? "" : " disabled"}`}
          aria-label="Scroll right"
          onClick={() => {
            if (!listRef.current) return;
            listRef.current.scrollBy({ left: 200, behavior: "smooth" });
          }}
        >
          ▶
        </button>
        <style>{`
        .workshop-mini-nav {
          position: sticky;
          position: -webkit-sticky;
          top: 70px;
          z-index: 900;
          background: rgba(19, 21, 26, 0.85);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          margin-top: 0;
        }
        .workshop-mini-nav.fixed {
          position: fixed;
          z-index: 999;
        }
        .mini-nav-list {
          display: flex;
          gap: 1rem;
          overflow-x: auto;
          overflow-y: hidden;
          scrollbar-width: none;
          white-space: nowrap;
          list-style: none;
          margin: 0;
          padding: 0.5rem 1rem;
          flex: 1 1 auto;
        }
        .mini-nav-list::-webkit-scrollbar { display: none; }
        .mini-nav-arrow {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          color: #e2e8f0;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          margin: 0 6px;
        }
        .mini-nav-arrow.disabled { opacity: 0.35; cursor: default; }
        .mini-nav-list li a {
          color: #cbd5e1;
          text-decoration: none;
          padding: 0.4rem 0.6rem;
          border-radius: 6px;
          border: 1px solid transparent;
          transition: color .2s ease, border-color .2s ease, background .2s ease;
          font-size: 0.95rem;
        }
        .mini-nav-list li a:hover {
          color: #8b5cf6;
          border-color: rgba(139, 92, 246, 0.35);
          background: rgba(139, 92, 246, 0.08);
        }
        .mini-nav-list li.active a {
          color: #fff;
          border-color: rgba(99, 102, 241, 0.5);
          background: rgba(99, 102, 241, 0.15);
        }
        @media (max-width: 768px) {
          .workshop-mini-nav { top: 70px; }
          .mini-nav-list { gap: 0.5rem; padding: 0.5rem 0.5rem; }
          .mini-nav-arrow { width: 26px; height: 26px; margin: 0 4px; }
          .mini-nav-list li a { font-size: 0.9rem; padding: 0.35rem 0.5rem; }
        }
      `}</style>
      </nav>
      {fixed && <div style={{ height: navHeight }} />}
    </>
  );
}
