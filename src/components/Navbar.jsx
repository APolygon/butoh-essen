import React, { useState, useRef, useEffect } from "react";
import { useTranslations, getLangFromUrl } from "../i18n/ui";
import { getRelativeLocaleUrl, getPathWithoutLocale } from "../i18n/utils";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langDropdownRef = useRef(null);

  // Get current language from URL
  const currentLang =
    typeof window !== "undefined"
      ? getLangFromUrl(new URL(window.location.href))
      : "de";

  const t = useTranslations(currentLang);

  const handleToggle = () => setMenuOpen((open) => !open);
  const handleClose = () => setMenuOpen(false);

  const handleLangToggle = (e) => {
    e.stopPropagation();
    setLangMenuOpen((open) => !open);
    // Close mobile menu when language dropdown is opened
    if (menuOpen) {
      setMenuOpen(false);
    }
  };

  // Debug function to log URL generation
  const debugUrl = (locale) => {
    if (typeof window !== "undefined") {
      let url;
      if (locale === "de") {
        // Remove /en/ prefix if present, otherwise keep as is
        url = window.location.pathname.replace(/^\/en/, "");
      } else {
        // Add /en/ prefix if not present
        url = window.location.pathname.startsWith("/en")
          ? window.location.pathname
          : `/en${window.location.pathname}`;
      }
      console.log(
        `Switching to ${locale}: ${window.location.pathname} → ${url}`
      );
      return url;
    }
    return locale === "de" ? "/" : "/en/";
  };

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target)
      ) {
        setLangMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getLocalizedPath = (path) => {
    if (typeof window === "undefined") return path;
    // For German (default), use path as is
    if (currentLang === "de") {
      return path;
    }
    // For English, add language prefix
    return `/en${path}`;
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <a href={getLocalizedPath("/")} className="brand-link">
              <span className="brand-text">Butoh</span>
              <span className="brand-subtitle">Essen</span>
            </a>
          </div>
          {/* Desktop menu */}
          <div className="nav-menu" style={{ left: menuOpen ? 0 : undefined }}>
            <a
              href={getLocalizedPath("/")}
              className="nav-link"
              onClick={handleClose}
            >
              {t("nav.workshops")}
            </a>
            <a
              href={getLocalizedPath("/contact")}
              className="nav-link"
              onClick={handleClose}
            >
              {t("nav.contact")}
            </a>
            <a
              href={getLocalizedPath("/impressum")}
              className="nav-link"
              onClick={handleClose}
            >
              {t("nav.impressum")}
            </a>

            {/* Language switcher */}
            <div className="lang-switcher" ref={langDropdownRef}>
              <button
                className="lang-button"
                onClick={handleLangToggle}
                aria-label={t("nav.language")}
              >
                {currentLang === "de" ? "🇩🇪" : "🇺🇸"} {currentLang.toUpperCase()}
                <span className={`lang-arrow ${langMenuOpen ? "rotated" : ""}`}>
                  ▼
                </span>
              </button>
              {langMenuOpen && (
                <div className="lang-dropdown">
                  <a
                    href={debugUrl("de")}
                    className="lang-option"
                    onClick={() => setLangMenuOpen(false)}
                  >
                    🇩🇪 {t("nav.language.de")}
                  </a>
                  <a
                    href={debugUrl("en")}
                    className="lang-option"
                    onClick={() => setLangMenuOpen(false)}
                  >
                    🇺🇸 {t("nav.language.en")}
                  </a>
                </div>
              )}
            </div>
          </div>
          {/* Mobile menu toggle */}
          <div
            className={`nav-toggle${menuOpen ? " active" : ""}`}
            id="nav-toggle"
            onClick={handleToggle}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(19, 21, 26, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          z-index: 1000;
          padding: 0;
        }
        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 70px;
        }
        .nav-brand {
          display: flex;
          align-items: center;
        }
        .brand-link {
          text-decoration: none;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .brand-text {
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: 1px;
        }
        .brand-subtitle {
          font-size: 0.8rem;
          color: #667eea;
          font-weight: 400;
          letter-spacing: 2px;
          text-transform: uppercase;
        }
        .nav-menu {
          display: flex;
          gap: 2rem;
          align-items: center;
          transition: left 0.3s ease;
        }
        .nav-link {
          color: #e2e8f0;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          position: relative;
          padding: 0.5rem 0;
        }
        .nav-link:hover {
          color: #667eea;
        }
        .nav-link::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(45deg, #667eea, #764ba2);
          transition: width 0.3s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        
        /* Language switcher styles */
        .lang-switcher {
          position: relative;
        }
        .lang-button {
          background: none;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #e2e8f0;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }
        .lang-button:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: #667eea;
        }
        .lang-arrow {
          font-size: 0.7rem;
          transition: transform 0.3s ease;
        }
        .lang-arrow.rotated {
          transform: rotate(180deg);
        }
        .lang-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          background: rgba(19, 21, 26, 0.98);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 0.5rem 0;
          margin-top: 0.5rem;
          min-width: 150px;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          z-index: 1001;
          animation: dropdownFadeIn 0.2s ease-out;
        }
        @keyframes dropdownFadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .lang-option {
          display: block;
          padding: 0.75rem 1rem;
          color: #e2e8f0;
          text-decoration: none;
          transition: background 0.3s ease;
          font-size: 0.9rem;
        }
        .lang-option:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #667eea;
        }
        
        .nav-toggle {
          display: none;
          flex-direction: column;
          cursor: pointer;
          gap: 4px;
        }
        .nav-toggle span {
          width: 25px;
          height: 3px;
          background: #e2e8f0;
          transition: all 0.3s ease;
          border-radius: 2px;
        }
        .nav-toggle:hover span {
          background: #667eea;
        }
        @media (max-width: 768px) {
          .nav-menu {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: rgba(19, 21, 26, 0.98);
            backdrop-filter: blur(10px);
            flex-direction: column;
            justify-content: flex-start;
            padding-top: 2rem;
            gap: 1rem;
          }
          .nav-menu[style*="left: 0"] {
            left: 0;
          }
          .nav-link {
            font-size: 1.1rem;
            padding: 1rem 0;
            width: 100%;
            text-align: center;
          }
          .lang-switcher {
            margin-top: 1rem;
          }
          .lang-dropdown {
            position: static;
            background: rgba(255, 255, 255, 0.05);
            border: none;
            margin-top: 0.5rem;
            border-radius: 6px;
          }
          .nav-toggle {
            display: flex;
          }
          .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
          }
          .nav-toggle.active span:nth-child(2) {
            opacity: 0;
          }
          .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
          }
        }
      `}</style>
    </>
  );
}
