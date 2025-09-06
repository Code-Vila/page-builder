import "./style.css";
import innerSectionHTML from "./element.html?raw";
import innerSectionCSS from "./style.css?raw";

export const InnerSectionBlock = {
  id: "inner-section",
  label: "Inner Section",
  category: "Layout",
  media: `
    <svg viewBox="0 0 24 24" style="width: 48px; height: 48px; fill: #8b5cf6;">
      <path d="M6 4h12v16H6V4zm2 2v12h8V6H8z"/>
    </svg>
  `,
  content: innerSectionHTML,
  attributes: {
    class: "gjs-block-inner-section",
    title: "Arraste para adicionar uma seção interna",
  },
};

export { innerSectionCSS };
export default InnerSectionBlock;
