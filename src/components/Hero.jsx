import React from "react";

export default function Hero({
  title,
  subtitle,
  imageSrc,
  imageAlt = "Hero Image",
}) {
  return (
    <div
      className="hero-container"
      style={{
        position: "relative",
        width: "calc(100vw - 4rem)",
        height: "60vh",
        margin: "0 2rem",
      }}
    >
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={imageAlt}
          loading="eager"
          decoding="sync"
          fetchpriority="high"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            borderRadius: "0",
          }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            background: "linear-gradient(45deg, #667eea, #764ba2)",
            borderRadius: "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            color: "white",
            opacity: "0.8",
          }}
        ></div>
      )}
      <div
        className="hero-overlay"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          background: "rgba(0, 0, 0, 0.4)",
          color: "white",
          padding: "2rem",
        }}
      >
        <h1
          className="hero-title"
          style={{
            fontSize: "4.5rem",
            margin: "0 0 1rem 0",
            fontWeight: "300",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
          }}
        >
          {title}
        </h1>
        <p
          className="hero-subtitle"
          style={{
            fontSize: "2.3rem",
            opacity: "0.9",
            margin: "0",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.7)",
          }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}
