import "./style.css";
import headingHTML from "./element.html?raw";
import headingCSS from "./style.css?raw";

export const HeadingBlock = {
  id: "heading",
  label: "Heading",
  category: "Básico",
  media: `
    <svg viewBox="0 0 24 24" style="width: 48px; height: 48px; fill: #1f2937;">
      <path d="M3 4h2v6h6V4h2v16h-2v-8H5v8H3V4zm14 0h5v2h-5V4zm0 4h4v2h-4V8zm0 4h5v2h-5v-2zm0 4h4v2h-4v-2z"/>
    </svg>
  `,
  content: headingHTML,
  attributes: {
    class: "gjs-block-heading",
    title: "Arraste para adicionar um título",
  },
};

export { headingCSS };
export default HeadingBlock;
