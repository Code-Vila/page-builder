import "./style.css";
import containerHTML from "./element.html?raw";
import containerCSS from "./style.css?raw";

export const ContainerBlock = {
  id: "container",
  label: "Container",
  category: "Layout",
  media: `
    <svg viewBox="0 0 24 24" style="width: 48px; height: 48px; fill: #6366f1;">
      <path d="M4 4h16v16H4V4zm2 2v12h12V6H6z"/>
    </svg>
  `,
  content: containerHTML,
  attributes: {
    class: "gjs-block-container",
    title: "Arraste para adicionar um container",
  },
};

export { containerCSS };
export default ContainerBlock;
