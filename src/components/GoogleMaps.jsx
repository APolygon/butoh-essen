import React from "react";

export default function GoogleMaps({
  mapsUrl,
  title = null,
  className = "",
  showLink = false,
  linkText = "📍 Open in Google Maps",
}) {
  if (!mapsUrl) {
    return null;
  }

  return (
    <div className={`bg-white/10 rounded-lg p-4 ${className}`}>
      {title && (
        <h3 className="text-xl font-semibold text-white mb-3">📍 {title}</h3>
      )}
      <div className="aspect-video rounded-lg overflow-hidden bg-gray-800">
        <iframe
          src={mapsUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={title}
        ></iframe>
      </div>
      {showLink && (
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center mt-2 text-blue-300 hover:text-blue-200 transition-colors"
        >
          {linkText}
        </a>
      )}
    </div>
  );
}
