import React from "react";
import GoogleMaps from "./GoogleMaps.jsx";
import { marked } from "marked";

export default function CurrentWorkshop({
  date,
  title,
  location,
  registrationUrl,
  mapsUrl = null,
  calendarUrl = null,
  moreInfoUrl = null,
  backgroundColor = "white",
  textColor = "black",
  signalColor = null,
  content = "",
}) {
  const formatDate = (dateString) => {
    // Handle custom date format like "07.- 09. November 2025"
    if (dateString.includes(".-")) {
      // This is a date range, return as is
      return dateString;
    }

    // Try to parse as a standard date
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      // If parsing fails, return the original string
      return dateString;
    }

    return date.toLocaleDateString("de-DE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      style={{
        background: backgroundColor,
        borderRadius: "1rem",
        margin: "1.5rem 5rem",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          background: signalColor || "transparent",
          padding: signalColor ? "0.5rem" : "0",
          marginBottom: "1rem",
        }}
      >
        <h2
          className="text-2xl md:text-3xl lg:text-4xl font-bold"
          style={{
            color: textColor,
            textAlign: "center",
            margin: "0",
          }}
        >
          {title}
        </h2>
      </div>

      {/* Content Layout - Flexbox with 3 columns */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        {/* Desktop: 2 columns side by side */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          {/* Left Column - Info (2/3 width) */}
          <div
            style={{
              flex: "2 1 400px",
              minWidth: "400px",
            }}
          >
            <div className="space-y-4 md:space-y-6">
              <div
                style={{
                  marginTop: "1.5rem",
                  lineHeight: "1.6",
                  fontSize: "1.1rem",
                  color: textColor === "white" ? "#d1d5db" : textColor,
                }}
                dangerouslySetInnerHTML={{
                  __html: content ? marked(content) : "No content available",
                }}
              />
            </div>
          </div>

          {/* Right Column - Maruska Image (1/3 width) */}
          <div
            style={{
              flex: "1 1 200px",
              minWidth: "200px",
            }}
          >
            <div className="space-y-4 md:space-y-6">
              <div
                className="rounded-lg overflow-hidden"
                style={{
                  background:
                    textColor === "white"
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(0, 0, 0, 0.1)",
                  border:
                    textColor === "white"
                      ? "1px solid rgba(255, 255, 255, 0.1)"
                      : "1px solid rgba(0, 0, 0, 0.1)",
                }}
              >
                <img
                  src="/images/Maruska_Ronchi.jpg"
                  alt="Maruska Ronchi - Butoh Dancer and Choreographer"
                  className="w-full h-auto object-cover"
                  style={{
                    minHeight: "200px",
                    maxHeight: "250px",
                    width: "100%",
                  }}
                />
              </div>
              <div
                style={{
                  textAlign: "center",
                  color: textColor === "white" ? "#e5e7eb" : textColor,
                  fontSize: "0.9rem",
                  fontStyle: "italic",
                }}
              >
                Maruska Ronchi - Butoh Dancer & Choreographer
              </div>
            </div>
          </div>
        </div>

        {/* Centered Action Button at Bottom */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          {moreInfoUrl && (
            <a
              href={moreInfoUrl}
              style={{
                padding: "0.5rem",
                borderRadius: "0.5rem",
                fontSize: "1.2rem",
                fontWeight: "bold",
                textAlign: "center",
                textDecoration: "none",
                border: "none",
                background:
                  signalColor ||
                  (textColor === "white" ? "#667eea" : "#3b82f6"),
                color: "black",
                textDecoration: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              Mehr Info
            </a>
          )}
        </div>
      </div>

      {/* Mobile-friendly bottom actions */}
      <div
        className="mt-6 pt-4 md:hidden"
        style={{
          borderTop:
            textColor === "white"
              ? "1px solid rgba(255, 255, 255, 0.2)"
              : "1px solid rgba(0, 0, 0, 0.2)",
        }}
      ></div>
    </div>
  );
}
