import templateHTML from "./element.html?raw";
import templateCSS from "./style.css?raw";

// Configuração do bloco template
export const DocumentoOficialDebugTemplate = {
  id: "documento-oficial-debug",
  label: "Documento Debug",
  category: "Templates",
  media: `
    <svg viewBox="0 0 24 24" style="width: 48px; height: 48px; fill: #10b981;">
      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
    </svg>
  `,
  content: templateHTML,
  attributes: {
    class: "gjs-block-template",
    title: "Arraste para adicionar um template de documento",
  },
};

export { templateCSS };
export default DocumentoOficialDebugTemplate;
