import "./style.css";
import column1HTML from "./element.html?raw";
import column1CSS from "./style.css?raw";

export const Column1Block = {
  id: "column1",
  label: "Coluna Única",
  category: "Layout",
  media: `
    <svg viewBox="0 0 24 24" style="width: 48px; height: 48px; fill: #10b981;">
      <path d="M3 4h18v16H3V4zm2 2v12h14V6H5z"/>
    </svg>
  `,
  content: column1HTML,
  attributes: {
    class: "gjs-block-column1",
    title: "Arraste para adicionar uma coluna única",
  },
};

export { column1CSS };
export default Column1Block;
