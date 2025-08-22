import React from "react";

export default function Hero({
  title,
  subtitle,
  imageSrc,
  imageAlt = "Hero Image",
}) {
  const normalizedSrc = imageSrc
    ? imageSrc.startsWith("/")
      ? imageSrc
      : `/${imageSrc}`
    : undefined;
  const responsiveWidths = [800, 1200, 1600, 1920];
  const isProd =
    typeof import.meta !== "undefined" &&
    import.meta &&
    import.meta.env &&
    import.meta.env.PROD;
  const toNetlify = (url, w, format) =>
    `/.netlify/images?url=${encodeURIComponent(url)}&w=${w}&fit=inside${
      format ? `&f=${format}` : ""
    }&q=70`;
  const avifSrcset = normalizedSrc
    ? responsiveWidths
        .map(
          (w) =>
            `${
              isProd ? toNetlify(normalizedSrc, w, "avif") : normalizedSrc
            } ${w}w`
        )
        .join(", ")
    : "";
  const webpSrcset = normalizedSrc
    ? responsiveWidths
        .map(
          (w) =>
            `${
              isProd ? toNetlify(normalizedSrc, w, "webp") : normalizedSrc
            } ${w}w`
        )
        .join(", ")
    : "";
  const jpegSrcset = normalizedSrc
    ? responsiveWidths
        .map(
          (w) =>
            `${
              isProd ? toNetlify(normalizedSrc, w, "jpeg") : normalizedSrc
            } ${w}w`
        )
        .join(", ")
    : "";
  const fallbackSrc = normalizedSrc
    ? isProd
      ? toNetlify(normalizedSrc, 1920, "jpeg")
      : normalizedSrc
    : undefined;
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
      {normalizedSrc ? (
        <picture>
          <source type="image/avif" srcSet={avifSrcset} sizes="100vw" />
          <source type="image/webp" srcSet={webpSrcset} sizes="100vw" />
          <img
            src={fallbackSrc}
            srcSet={jpegSrcset}
            sizes="100vw"
            alt={imageAlt}
            loading="eager"
            decoding="sync"
            fetchpriority="high"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
              borderRadius: "0",
            }}
          />
        </picture>
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
            fontSize: "3.8rem",
            lineHeight: "1.1",
            margin: "0 0 1rem 0",
            fontWeight: "300",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
          }}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <p
          className="hero-subtitle"
          style={{
            fontSize: "1.6rem",
            lineHeight: "1.35",
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
