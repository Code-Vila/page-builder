/**
 * Configurações globais para otimização de performance
 * Reduz warnings de passive event listeners
 */

/**
 * Otimiza configurações do GrapesJS para reduzir warnings de performance
 */
export function optimizeGrapesJSPerformance() {
  // Interceptar addEventListener global para adicionar passive por padrão
  const originalAddEventListener = EventTarget.prototype.addEventListener;

  EventTarget.prototype.addEventListener = function (
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ) {
    // Lista de eventos que devem ser passive por padrão
    const passiveEvents = [
      "scroll",
      "wheel",
      "touchstart",
      "touchmove",
      "touchend",
      "mousewheel",
      "mouseover",
      "mouseout",
      "mouseenter",
      "mouseleave",
      "pointermove",
      "pointerover",
      "pointerout",
      "pointerenter",
      "pointerleave",
    ];

    // Eventos que precisam de preventDefault (não devem ser passive)
    const nonPassiveEvents = [
      "submit",
      "keydown",
      "keyup",
      "keypress",
      "dragstart",
      "drop",
      "dragover",
      "dragenter",
      "dragleave",
      "contextmenu",
    ];

    let finalOptions: AddEventListenerOptions;

    if (typeof options === "boolean") {
      finalOptions = { capture: options };
    } else {
      finalOptions = options || {};
    }

    // Se não foi especificado passive e o evento pode ser passive
    if (
      finalOptions.passive === undefined &&
      passiveEvents.includes(type) &&
      !nonPassiveEvents.includes(type)
    ) {
      finalOptions.passive = true;
    }

    return originalAddEventListener.call(this, type, listener, finalOptions);
  };
}

/**
 * Configurações específicas do GrapesJS para reduzir load de eventos
 */
export function configureGrapesJSOptions() {
  return {
    // Configurações de canvas para reduzir eventos
    canvas: {
      styles: [],
      scripts: [],
      // Reduzir eventos de resize
      notTextable: ["button", "a", "input[type=checkbox]", "input[type=radio]"],
    },

    // Configurações do Style Manager para reduzir eventos
    styleManager: {
      // Reduzir atualizações automáticas
      highlightChanged: false,
      highlightComputed: false,
    },

    // Configurações do Trait Manager
    traitManager: {
      // Reduzir eventos de mudança
      textareaAutoResize: false,
    },

    // Configurações do Device Manager
    deviceManager: {
      // Reduzir eventos de resize
      devices: [
        {
          name: "Desktop",
          width: "",
        },
        {
          name: "Tablet",
          width: "768px",
          widthMedia: "992px",
        },
        {
          name: "Mobile",
          width: "320px",
          widthMedia: "768px",
        },
      ],
    },

    // Configurações do Editor para performance
    richTextEditor: {
      // Reduzir eventos do editor de texto
      actions: ["bold", "italic", "underline", "strikethrough"],
    },

    // Configurações dos painéis para reduzir eventos
    panels: {
      defaults: [],
    },

    // Configurações do Selector Manager
    selectorManager: {
      // Reduzir eventos de seleção
      componentFirst: true,
    },
  };
}

/**
 * Throttle customizado para eventos de alta frequência
 */
export function setupEventThrottling() {
  // Throttle eventos de scroll globalmente
  let scrollTimeout: number | null = null;
  const originalScrollHandler = window.onscroll;

  window.addEventListener(
    "scroll",
    (e) => {
      if (scrollTimeout) {
        return;
      }

      scrollTimeout = window.setTimeout(() => {
        if (originalScrollHandler) {
          originalScrollHandler.call(window, e as any);
        }
        scrollTimeout = null;
      }, 16); // ~60fps
    },
    { passive: true }
  );

  // Throttle eventos de resize
  let resizeTimeout: number | null = null;
  const originalResizeHandler = window.onresize;

  window.addEventListener(
    "resize",
    (e) => {
      if (resizeTimeout) {
        return;
      }

      resizeTimeout = window.setTimeout(() => {
        if (originalResizeHandler) {
          originalResizeHandler.call(window, e as any);
        }
        resizeTimeout = null;
      }, 100);
    },
    { passive: true }
  );
}

/**
 * Remove listeners desnecessários quando possível
 */
export function cleanupUnusedListeners() {
  // Remove listeners de eventos que não são mais necessários
  const elementsToClean = document.querySelectorAll("[data-gjs-type]");

  elementsToClean.forEach((element) => {
    // Clone o elemento para remover todos os listeners
    const newElement = element.cloneNode(true);
    if (element.parentNode) {
      element.parentNode.replaceChild(newElement, element);
    }
  });
}
