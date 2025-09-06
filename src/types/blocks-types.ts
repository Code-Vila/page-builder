// types.ts - Definições de tipos para o sistema de blocos

export interface BlockDefinition {
  id: string;
  label: string;
  category: string;
  media: string;
  content: string;
  attributes?: Record<string, any>;
}

export interface BlockModule {
  default?: BlockDefinition;
  [key: string]: any; // Para blocos com nomes específicos como SectionBlock
}

export interface ComplexBlockModule {
  (editor: any): void;
}

export interface BlockConfig {
  type: "simple" | "complex" | "interactive";
  hasCSS: boolean;
  hasComponent?: boolean;
}

export const BlockCategory = {
  LAYOUT: "Layout",
  BASIC: "Básico",
  INTERACTIVE: "Interativo",
  WIDGETS: "Widgets",
  TEXT: "Texto",
  FORMS: "Formulários",
  MEDIA: "Mídia",
} as const;

export type BlockCategoryType =
  (typeof BlockCategory)[keyof typeof BlockCategory];

export interface AutoDiscoveredBlock {
  name: string;
  path: string;
  config: BlockConfig;
  module: any;
  css?: string;
}
