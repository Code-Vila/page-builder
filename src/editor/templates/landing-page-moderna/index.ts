// templates/landing-page-moderna/index.ts
import templateHTML from "./element.html?raw";
import templateCSS from "./style.css?raw";

const landingPageModernaTemplate = {
  id: "landing-page-moderna",
  label: "Landing Page Moderna",
  category: "Templates",
  description:
    "Uma landing page moderna com hero section, features e call-to-action",
  thumbnail: `data:image/svg+xml;base64,${btoa(`
    <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="200" fill="#1e293b"/>
      <rect x="20" y="20" width="260" height="40" fill="#3b82f6" rx="4"/>
      <rect x="20" y="80" width="120" height="30" fill="#64748b" rx="4"/>
      <rect x="160" y="80" width="120" height="30" fill="#64748b" rx="4"/>
      <rect x="20" y="130" width="80" height="20" fill="#22c55e" rx="4"/>
      <text x="150" y="45" text-anchor="middle" fill="white" font-size="12">Landing Page</text>
    </svg>
  `)}`,
  // Template simplificado - remova o CSS inline e use classes
  content: templateHTML,
};

export { templateCSS };
export default landingPageModernaTemplate;
