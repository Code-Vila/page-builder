// GrapesJS Type Declarations
declare module "grapesjs" {
  export interface Editor {
    DomComponents: {
      addType(name: string, definition: any): void;
    };
    BlockManager: {
      add(id: string, definition: any): void;
      get(id: string): any;
      getAll(): any[];
    };
    on(event: string, callback: Function): void;
    off(event: string, callback?: Function): void;
    getHtml(): string;
    getCss(): string;
    getJs(): string;
    setComponents(components: string): void;
    setStyle(css: string): void;
    getContainer(): HTMLElement;
    render(): void;
    destroy(): void;
    Commands: {
      add(id: string, command: any): void;
      get(id: string): any;
    };
    Panels: {
      addPanel(definition: any): any;
      addButton(panelId: string, button: any): any;
    };
  }

  export interface Component {
    get(property: string): any;
    set(property: string, value: any): void;
    getEl(): HTMLElement;
    is(type: string): boolean;
    on(event: string, callback: Function): void;
    off(event: string, callback?: Function): void;
  }

  export interface EditorConfig {
    container: string | HTMLElement;
    fromElement?: boolean;
    height?: string;
    width?: string;
    storageManager?: any;
    blockManager?: any;
    styleManager?: any;
    layerManager?: any;
    traitManager?: any;
    selectorManager?: any;
    rteInlineMode?: boolean;
    noticeOnUnload?: boolean;
    showOffsets?: boolean;
    showOffsetsSelected?: boolean;
    forceClass?: boolean;
    height?: string;
    width?: string;
    log?: string[];
    baseCss?: string;
    protectedCss?: string;
    canvasCss?: string;
    defaultCommand?: string;
    showRulers?: boolean;
    showOffsetsSelected?: boolean;
    showOffsets?: boolean;
    noticeOnUnload?: boolean;
    height?: string;
    width?: string;
    autorender?: boolean;
  }

  function init(config: EditorConfig): Editor;
  export default { init };
}
