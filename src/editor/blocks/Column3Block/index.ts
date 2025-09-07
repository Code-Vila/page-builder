import "./style.css";
import column3HTML from "./element.html?raw";
import column3CSS from "./style.css?raw";

export const Column3Block = {
  id: "column3",
  label: "Três Colunas",
  category: "Layout",
  media: `
    <svg viewBox="0 0 24 24" style="width: 48px; height: 48px; fill: #8b5cf6;">
      <path d="M3 4h5v16H3V4zm7 0h5v16h-5V4zm7 0h5v16h-5V4z"/>
    </svg>
  `,
  content: column3HTML,
  attributes: {
    class: "gjs-block-column3",
    title: "Arraste para adicionar três colunas",
  },
};

export { column3CSS };
export default Column3Block;
