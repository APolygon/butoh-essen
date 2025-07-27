import React from "react";
import ContentSection from "./ContentSection.jsx";
// import WorkshopMeta from './WorkshopMeta.jsx'; // Uncomment when WorkshopMeta is migrated

/**
 * Props:
 * - section: {
 *     type: 'text' | 'meta' | 'gallery' | 'contact',
 *     title?: string,
 *     content?: string,
 *     date?: string,
 *     location?: string
 *   }
 */
export default function SectionRenderer({ section }) {
  if (section.type === "meta" && section.date && section.location) {
    // return <WorkshopMeta date={section.date} location={section.location} />;
    return (
      <div className="my-8 p-6 bg-blue-100 text-blue-900 rounded-lg border border-blue-200">
        <strong>WorkshopMeta placeholder:</strong> {section.date} @{" "}
        {section.location}
      </div>
    );
  }

  if (section.type === "text" && section.content) {
    return (
      <ContentSection>
        {section.title && <h2>{section.title}</h2>}
        {/* Render HTML content safely */}
        <div dangerouslySetInnerHTML={{ __html: section.content }} />
      </ContentSection>
    );
  }

  if (section.type === "gallery") {
    return (
      <ContentSection>
        {section.title && <h2>{section.title}</h2>}
        <p>Gallery component would go here</p>
      </ContentSection>
    );
  }

  if (section.type === "contact") {
    return (
      <ContentSection>
        {section.title && <h2>{section.title}</h2>}
        <p>Contact form would go here</p>
      </ContentSection>
    );
  }

  return null;
}
