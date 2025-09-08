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

const VideoComponent = (editor: any) => {
  editor.DomComponents.addType("video", {
    isComponent: (el: HTMLElement) => el.classList?.contains("video-widget"),

    model: {
      defaults: {
        tagName: "div",
        classes: ["video-widget"],
        content: videoHTML,
        traits: [
          {
            type: "text",
            name: "id",
            label: "ID",
            placeholder: "meu-video",
            changeProp: 1,
          },
          {
            type: "text",
            name: "title",
            label: "Título",
            placeholder: "Título do vídeo",
            changeProp: 1,
          },
          {
            type: "select",
            name: "video-type",
            label: "Tipo de Vídeo",
            options: [
              { value: "youtube", name: "YouTube" },
              { value: "vimeo", name: "Vimeo" },
              { value: "file", name: "Arquivo Local" },
              { value: "embed", name: "Código Embed" },
            ],
            changeProp: 1,
          },
          {
            type: "text",
            name: "video-url",
            label: "URL do Vídeo",
            placeholder: "https://www.youtube.com/watch?v=...",
            changeProp: 1,
          },
          {
            type: "text",
            name: "video-id",
            label: "ID do Vídeo (YouTube/Vimeo)",
            placeholder: "dQw4w9WgXcQ",
            changeProp: 1,
          },
          {
            type: "select",
            name: "video-size",
            label: "Tamanho do Vídeo",
            options: [
              { value: "small", name: "Pequeno (400px)" },
              { value: "medium", name: "Médio (600px)" },
              { value: "large", name: "Grande (800px)" },
              { value: "full", name: "Largura Completa" },
            ],
            changeProp: 1,
          },
          {
            type: "select",
            name: "video-aspect",
            label: "Proporção",
            options: [
              { value: "16:9", name: "16:9 (Widescreen)" },
              { value: "4:3", name: "4:3 (Padrão)" },
              { value: "1:1", name: "1:1 (Quadrado)" },
            ],
            changeProp: 1,
          },
          {
            type: "checkbox",
            name: "autoplay",
            label: "Reprodução Automática",
            changeProp: 1,
          },
          {
            type: "checkbox",
            name: "controls",
            label: "Mostrar Controles",
            changeProp: 1,
          },
          {
            type: "checkbox",
            name: "loop",
            label: "Repetir Vídeo",
            changeProp: 1,
          },
          {
            type: "textarea",
            name: "custom-css",
            label: "CSS Personalizado",
            placeholder: ".minha-classe { border-radius: 8px; }",
            changeProp: 1,
          },
        ],
        script: function () {
          const widget = this as unknown as HTMLElement;

          const initVideo = () => {
            const videoType =
              widget.getAttribute("data-video-type") || "youtube";
            const videoUrl = widget.getAttribute("data-video-url") || "";
            const videoId = widget.getAttribute("data-video-id") || "";
            const autoplay = widget.getAttribute("data-autoplay") === "true";
            const controls = widget.getAttribute("data-controls") !== "false";
            const loop = widget.getAttribute("data-loop") === "true";

            if (videoType === "youtube" && (videoUrl || videoId)) {
              let embedId = videoId;

              // Extrair ID do YouTube da URL se não foi fornecido diretamente
              if (!embedId && videoUrl) {
                const youtubeRegex =
                  /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
                const match = videoUrl.match(youtubeRegex);
                if (match) {
                  embedId = match[1];
                }
              }

              if (embedId) {
                const autoplayParam = autoplay ? "&autoplay=1" : "";
                const controlsParam = controls ? "" : "&controls=0";
                const loopParam = loop ? `&loop=1&playlist=${embedId}` : "";

                const embedUrl = `https://www.youtube.com/embed/${embedId}?rel=0${autoplayParam}${controlsParam}${loopParam}`;

                widget.innerHTML = `
                  <div class="video-container">
                    <iframe 
                      src="${embedUrl}" 
                      frameborder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowfullscreen>
                    </iframe>
                  </div>
                `;
              }
            } else if (videoType === "vimeo" && (videoUrl || videoId)) {
              let embedId = videoId;

              if (!embedId && videoUrl) {
                const vimeoRegex = /vimeo\.com\/(\d+)/;
                const match = videoUrl.match(vimeoRegex);
                if (match) {
                  embedId = match[1];
                }
              }

              if (embedId) {
                const autoplayParam = autoplay ? "&autoplay=1" : "";
                const controlsParam = controls ? "" : "&controls=0";
                const loopParam = loop ? "&loop=1" : "";

                const embedUrl = `https://player.vimeo.com/video/${embedId}?${autoplayParam}${controlsParam}${loopParam}`;

                widget.innerHTML = `
                  <div class="video-container">
                    <iframe 
                      src="${embedUrl}" 
                      frameborder="0" 
                      allow="autoplay; fullscreen; picture-in-picture" 
                      allowfullscreen>
                    </iframe>
                  </div>
                `;
              }
            } else if (videoType === "file" && videoUrl) {
              widget.innerHTML = `
                <div class="video-container">
                  <video 
                    controls="${controls}" 
                    autoplay="${autoplay}" 
                    loop="${loop}"
                    style="width: 100%; height: 100%;">
                    <source src="${videoUrl}" type="video/mp4">
                    Seu navegador não suporta vídeos HTML5.
                  </video>
                </div>
              `;
            } else if (videoType === "embed" && videoUrl) {
              widget.innerHTML = `
                <div class="video-container">
                  ${videoUrl}
                </div>
              `;
            }
          };

          // Inicializar imediatamente
          initVideo();

          // Re-inicializar após um delay para garantir que o DOM esteja pronto
          setTimeout(initVideo, 100);
        },
      },
      init() {
        // Aplicar CSS personalizado quando o trait for alterado
        (this as any).on("change:custom-css", (_model: any, value: string) => {
          if (value && value.trim()) {
            const componentId = (this as any).getId();
            const customStyleId = `custom-css-${componentId}`;
            const existingStyle = document.getElementById(customStyleId);
            if (existingStyle) {
              existingStyle.remove();
            }
            const style = document.createElement("style");
            style.id = customStyleId;
            style.textContent = `#${componentId} { ${value} }`;
            document.head.appendChild(style);
          }
        });

        // Aplicar mudanças de vídeo
        (this as any).on(
          "change:video-type change:video-url change:video-id change:video-size change:video-aspect change:autoplay change:controls change:loop",
          () => {
            const videoType = (this as any).get("video-type");
            const videoUrl = (this as any).get("video-url");
            const videoId = (this as any).get("video-id");
            const videoSize = (this as any).get("video-size");
            const videoAspect = (this as any).get("video-aspect");
            const autoplay = (this as any).get("autoplay");
            const controls = (this as any).get("controls");
            const loop = (this as any).get("loop");

            const view = (this as any).getView();
            if (view) {
              const el = view.el;

              // Aplicar classes de tamanho e proporção
              el.classList.remove("small", "medium", "large", "full");
              el.classList.remove("aspect-16-9", "aspect-4-3", "aspect-1-1");
              if (videoSize && videoSize !== "medium")
                el.classList.add(videoSize);
              if (videoAspect && videoAspect !== "16:9")
                el.classList.add(`aspect-${videoAspect.replace(":", "-")}`);

              // Definir atributos de dados
              el.setAttribute("data-video-type", videoType || "youtube");
              el.setAttribute("data-video-url", videoUrl || "");
              el.setAttribute("data-video-id", videoId || "");
              el.setAttribute("data-autoplay", autoplay ? "true" : "false");
              el.setAttribute(
                "data-controls",
                controls !== false ? "true" : "false"
              );
              el.setAttribute("data-loop", loop ? "true" : "false");

              // Re-inicializar o vídeo
              setTimeout(() => {
                const script = (this as any).get("script");
                if (script) {
                  script.call(this);
                }
              }, 100);
            }
          }
        );
      },
    },
  });
};

export { videoCSS };
export { VideoComponent };
export default VideoBlock;
