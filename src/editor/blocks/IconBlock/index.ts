import "./style.css";
import iconHTML from "./element.html?raw";
import iconCSS from "./style.css?raw";

export const IconBlock = {
  id: "icon",
  label: "Icon",
  category: "Básico",
  media: `
    <svg viewBox="0 0 24 24" style="width: 48px; height: 48px; fill: #667eea;">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  `,
  content: iconHTML,
  attributes: {
    class: "gjs-block-icon",
    title: "Arraste para adicionar um ícone",
  },
};

export { iconCSS };
export default IconBlock;
