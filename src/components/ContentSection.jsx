import React from "react";
import { marked } from "marked";

/**
 * Props:
 * - content: string (markdown content)
 * - title?: string (optional title)
 * - className?: string (optional additional classes)
 * - textColor?: string (optional text color, defaults to "#000")
 * - backgroundColor?: string (optional background color, defaults to "rgb(255, 255, 255)")
 * - media?: Array<{
 *     type: "image" | "map",
 *     src: string,
 *     alt?: string,
 *     position?: "left" | "right" | "full",
 *     noShadow?: boolean
 *   }> (optional array of media items)
 * - imagePath?: string (legacy: image path)
 * - imagePosition?: "left" | "right" | "full" (legacy: image position)
 * - imageAlt?: string (legacy: image alt text)
 * - mapsUrl?: string (legacy: Google Maps URL)
 * - noShadow?: boolean (legacy: disable shadow on image)
 */
export default function ContentSection({
  content,
  title,
  className = "",
  textColor = "#000",
  backgroundColor = "rgb(255, 255, 255)",
  media = [],
  id = undefined,
  imagePath,
  imagePosition,
  imageAlt,
  mapsUrl,
  mapPosition,
  noShadow,
}) {
  // Convert legacy props to media array if provided
  if (imagePath || mapsUrl) {
    const imagePaths = Array.isArray(imagePath) ? imagePath : [imagePath];
    const imagePositions = Array.isArray(imagePosition)
      ? imagePosition
      : [imagePosition];
    const imageAlts = Array.isArray(imageAlt) ? imageAlt : [imageAlt];
    const mapsUrls = Array.isArray(mapsUrl) ? mapsUrl : [mapsUrl];
    const mapPositions = Array.isArray(mapPosition)
      ? mapPosition
      : [mapPosition];

    // Handle images
    if (imagePath) {
      imagePaths.forEach((path, index) => {
        if (path) {
          media.push({
            type: "image",
            src: path,
            alt: imageAlts[index] || "",
            position: imagePositions[index] || "right",
            noShadow: noShadow || false,
          });
        }
      });
    }

    // Handle maps
    if (mapsUrl) {
      mapsUrls.forEach((url, index) => {
        if (url) {
          media.push({
            type: "map",
            src: url,
            position: mapPosition || "right", // Use mapPosition instead of mapPositions array
          });
        }
      });
    }
  }
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

  // Group media items by position
  const mediaByPosition = media.reduce((acc, item) => {
    const position = item.position || "right";
    if (!acc[position]) acc[position] = [];
    acc[position].push(item);
    return acc;
  }, {});

  const renderMediaItem = (item, index) => {
    const isMap = item.type === "map";
    return (
      <div
        key={`${item.type}-${index}`}
        className={`content-section-${item.type}`}
        style={{
          flex: "1 1 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          height: isMap ? "100%" : "auto",
          width: "100%",
          marginBottom: "1rem",
        }}
      >
        {isMap ? (
          <div style={{ width: "100%", height: "100%" }}>
            <iframe
              src={item.src}
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: "8px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        ) : (
          <img
            src={item.src}
            alt={item.alt || ""}
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              borderRadius: "8px",
              ...(item.noShadow
                ? {}
                : { boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" }),
            }}
          />
        )}
      </div>
    );
  };

  const renderMediaGroup = (position, itemsOverride, orderOverride) => {
    const items = itemsOverride ?? mediaByPosition[position];
    if (!items || items.length === 0) return null;

    return (
      <div
        className={`content-section-media-group ${position}`}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          flex: position === "full" ? "1 1 100%" : "0 0 auto",
          width: position === "full" ? "100%" : "calc(50% - 1rem)",
          order: orderOverride ?? (position === "left" ? 1 : 3),
          marginLeft: position === "right" ? "auto" : undefined,
        }}
      >
        {items.map(renderMediaItem)}
      </div>
    );
  };

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
        scrollMarginTop: "120px", // 70px (main navbar) + 44px (mini navbar) + 6px buffer
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
          display: "flex",
          flexDirection: "row",
          gap: "2rem",
          flexWrap: "wrap",
        }}
      >
        {/* Left media split into first and remaining to support quadrant layout */}
        {(() => {
          const leftItems = mediaByPosition.left || [];
          const firstLeft = leftItems.slice(0, 1);
          const remainingLeft = leftItems.slice(1);
          return (
            <>
              {renderMediaGroup("left", firstLeft, 1)}
              {/* Content (top-right) rendered below */}
              {content && (
                <div
                  className="content-section-text"
                  style={{
                    flex: "0 0 auto",
                    width:
                      (mediaByPosition.left && mediaByPosition.left.length) ||
                      (mediaByPosition.right && mediaByPosition.right.length)
                        ? "calc(50% - 1rem)"
                        : "100%",
                    order: 2,
                    lineHeight: "1.8",
                    color: finalTextColor,
                    fontSize: "1.1rem",
                  }}
                  dangerouslySetInnerHTML={{ __html: marked(content || "") }}
                />
              )}
              {renderMediaGroup("left", remainingLeft, 3)}
              {renderMediaGroup("right", undefined, 3)}
            </>
          );
        })()}
        {/* Full-width media group */}
        {renderMediaGroup("full")}
      </div>
    </div>
  );
}
