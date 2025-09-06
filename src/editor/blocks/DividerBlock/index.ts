import "./style.css";
import dividerHTML from "./element.html?raw";
import dividerCSS from "./style.css?raw";

export const DividerBlock = {
  id: "divider",
  label: "Divider",
  category: "Básico",
  media: `
    <svg viewBox="0 0 24 24" style="width: 48px; height: 48px; fill: #6b7280;">
      <path d="M2 12h20v2H2v-2z"/>
    </svg>
  `,
  content: dividerHTML,
  attributes: {
    class: "gjs-block-divider",
    title: "Arraste para adicionar um divisor",
  },
};

export { dividerCSS };
export default DividerBlock;
