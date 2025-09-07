import "./style.css";
import column2HTML from "./element.html?raw";
import column2CSS from "./style.css?raw";

export const Column2Block = {
  id: "column2",
  label: "Duas Colunas",
  category: "Layout",
  media: `
    <svg viewBox="0 0 24 24" style="width: 48px; height: 48px; fill: #f59e0b;">
      <path d="M3 4h8v16H3V4zm10 0h8v16h-8V4z"/>
    </svg>
  `,
  content: column2HTML,
  attributes: {
    class: "gjs-block-column2",
    title: "Arraste para adicionar duas colunas",
  },
};

export { column2CSS };
export default Column2Block;
