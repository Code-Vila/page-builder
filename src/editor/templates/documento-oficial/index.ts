import type { TemplateDefinition } from "../index";
import templateHTML from "./template.html?raw";
import templateCSS from "./template.css?raw";

const template: TemplateDefinition = {
  id: "documento-oficial",
  label: "Documento Oficial",
  category: "Documentos",
  description:
    "Template para declarações, certificados e documentos oficiais com papel timbrado",
  thumbnail: `data:image/svg+xml;base64,${btoa(`
    <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="200" fill="#ffffff" stroke="#e5e7eb"/>
      <rect x="20" y="20" width="260" height="30" fill="#1e40af" rx="4"/>
      <rect x="20" y="60" width="200" height="4" fill="#6b7280" rx="2"/>
      <rect x="20" y="75" width="180" height="4" fill="#6b7280" rx="2"/>
      <rect x="20" y="90" width="220" height="4" fill="#6b7280" rx="2"/>
      <rect x="20" y="120" width="160" height="4" fill="#6b7280" rx="2"/>
      <rect x="20" y="135" width="190" height="4" fill="#6b7280" rx="2"/>
      <rect x="200" y="160" width="80" height="20" fill="#059669" rx="4"/>
      <text x="150" y="40" text-anchor="middle" fill="white" font-size="10">DOCUMENTO OFICIAL</text>
    </svg>
  `)}`,
  content: templateHTML,
  css: templateCSS,
};

export default template;
