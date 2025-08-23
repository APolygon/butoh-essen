import React from "react";
import { marked } from "marked";
import GoogleMaps from "./GoogleMaps.jsx";

/**
 * Props:
 * - content: string (markdown content)
 * - title?: string (optional title)
 * - className?: string (optional additional classes)
 * - textColor?: string (optional text color, defaults to "#000")
 * - backgroundColor?: string (optional background color, defaults to "rgb(255, 255, 255)")
 * - imagePath?: string (optional image path)
 * - imagePosition?: "left" | "right" (optional, defaults to "right")
 * - imageAlt?: string (optional image alt text)
 * - mapsUrl?: string (optional Google Maps URL)
 */
/**
 * @param {Object} props
 * @param {string} [props.id]
 */
export default function ContentSection({
  content,
  title,
  className = "",
  textColor = "#000",
  backgroundColor = "rgb(255, 255, 255)",
  imagePath = "",
  imagePosition = "right",
  imageAlt = "",
  mapsUrl = "",
  noShadow = false,
  id = undefined,
}) {
  const hasImage = imagePath && imagePath.trim() !== "";
  const hasMap = mapsUrl && mapsUrl.trim() !== "";

  // Color shortcuts
  const getColor = (color) => {
    if (color === "black") return "rgb(0, 0, 0)";
    if (color === "white") return "rgb(255, 255, 255)";
    return color;
  };

  // Check if it's a color combination shortcut
  let finalTextColor = textColor;
  let finalBackgroundColor = backgroundColor;

  if (textColor === "black-on-white") {
    finalTextColor = "rgb(0, 0, 0)";
    finalBackgroundColor = "rgb(255, 255, 255)";
  } else if (textColor === "white-on-black") {
    finalTextColor = "rgb(255, 255, 255)";
    finalBackgroundColor = "rgb(0, 0, 0)";
  } else {
    finalTextColor = getColor(textColor);
    finalBackgroundColor = getColor(backgroundColor);
  }

  console.log("ContentSection props:", {
    content,
    title,
    mapsUrl,
    hasMap,
    hasImage,
  });

  return (
    <div
      id={id}
      className={`content-section ${className}`}
      style={{
        background: finalBackgroundColor,
        borderRadius: "0px",
        padding: "3rem",
        backdropFilter: "blur(10px)",
        marginBottom: "0",
        scrollMarginTop: "90px",
      }}
    >
      {title && (
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "600",
            marginBottom: "1.25rem",
            lineHeight: "1.2",
            color: finalTextColor,
            borderBottom: `2px solid ${finalTextColor}`,
            paddingBottom: "0.5rem",
          }}
        >
          {title}
        </h2>
      )}

      <div
        className="content-section-container"
        style={{
          display: hasImage || hasMap ? "flex" : "block",
          flexDirection: hasImage || hasMap ? "row" : "block",
          gap: hasImage || hasMap ? "2rem" : "0",
          alignItems: hasImage || hasMap ? "stretch" : undefined,
        }}
      >
        {/* Map container */}
        {hasMap && (
          <div
            className="content-section-map"
            style={{
              flex: hasImage ? "1 1 50%" : "1 1 100%",
              order: imagePosition === "left" ? 2 : 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "stretch",
              height: hasImage ? "400px" : "400px",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {console.log("Rendering map with URL:", mapsUrl)}
              {/* Direct iframe instead of GoogleMaps component */}
              <iframe
                src={mapsUrl}
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: "8px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        )}

        {/* Image container - can be used with maps too */}
        {hasImage && (
          <div
            className="content-section-image"
            style={{
              flex: "1 1 50%",
              order: imagePosition === "left" ? 1 : 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "stretch",
              height: hasMap ? "400px" : "auto",
            }}
          >
            <img
              src={imagePath}
              alt={imageAlt}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "8px",
                ...(noShadow
                  ? {}
                  : { boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" }),
              }}
            />
          </div>
        )}

        {/* Content container - only show if there's content or if it's not a map-only section */}
        {(content || (!hasMap && !hasImage)) && (
          <div
            className="content-section-text"
            style={{
              flex: hasImage || hasMap ? "1 1 50%" : "none",
              order: imagePosition === "left" ? 2 : 1,
              display: hasImage || hasMap ? "flex" : undefined,
              flexDirection: hasImage || hasMap ? "column" : undefined,
              justifyContent: hasImage || hasMap ? "center" : undefined,
              lineHeight: "1.8",
              color: finalTextColor,
              fontSize: "1.1rem",
            }}
            dangerouslySetInnerHTML={{ __html: marked(content || "") }}
          />
        )}
      </div>
    </div>
  );
}
