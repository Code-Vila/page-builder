import "./style.css";
import spacerHTML from "./element.html?raw";
import spacerCSS from "./style.css?raw";

export const SpacerBlock = {
  id: "spacer",
  label: "Spacer",
  category: "Layout",
  media: `
    <svg viewBox="0 0 24 24" style="width: 48px; height: 48px; fill: #9ca3af;">
      <path d="M2 8h20v2H2V8zm0 6h20v2H2v-2z"/>
      <path d="M8 4v16h2V4H8zm6 0v16h2V4h-2z" opacity="0.5"/>
    </svg>
  `,
  content: spacerHTML,
  attributes: {
    class: "gjs-block-spacer",
    title: "Arraste para adicionar espaçamento",
  },
};

export { spacerCSS };
export default SpacerBlock;
