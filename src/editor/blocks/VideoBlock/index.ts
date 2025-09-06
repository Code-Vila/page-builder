import "./style.css";
import videoHTML from "./element.html?raw";
import videoCSS from "./style.css?raw";

export const VideoBlock = {
  id: "video",
  label: "Video",
  category: "Mídia",
  media: `
    <svg viewBox="0 0 24 24" style="width: 48px; height: 48px; fill: #dc2626;">
      <path d="M8 5v14l11-7z"/>
      <path d="M0 2v20h24V2H0zm22 18H2V4h20v16z"/>
    </svg>
  `,
  content: videoHTML,
  attributes: {
    class: "gjs-block-video",
    title: "Arraste para adicionar um vídeo",
  },
};

export { videoCSS };
export default VideoBlock;
