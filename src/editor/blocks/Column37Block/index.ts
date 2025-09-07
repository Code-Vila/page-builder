import "./style.css";
import column37HTML from "./element.html?raw";
import column37CSS from "./style.css?raw";

export const Column37Block = {
  id: "column3-7",
  label: "Colunas 3-7",
  category: "Layout",
  media: `
    <svg viewBox="0 0 24 24" style="width: 48px; height: 48px; fill: #ef4444;">
      <path d="M3 4h6v16H3V4zm8 0h10v16H11V4z"/>
    </svg>
  `,
  content: column37HTML,
  attributes: {
    class: "gjs-block-column3-7",
    title: "Arraste para adicionar colunas 3-7 (3/7 e 4/7)",
  },
};

export { column37CSS };
export default Column37Block;
