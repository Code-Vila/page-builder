<template>
  <div class="editor-container bg-gray-900 text-gray-100">
    <!-- Barra de ferramentas superior reorganizada -->
    <div
      class="editor-toolbar bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700 shadow-lg"
    >
      <div class="px-4 py-3">
        <div class="flex items-center justify-between">
          <!-- Logo/Título e Ações Principais -->
          <div class="flex items-center space-x-6">
            <div class="flex items-center space-x-3">
              <div
                class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
                  />
                </svg>
              </div>
              <h1 class="text-lg font-semibold text-white">Site Builder</h1>
            </div>

            <!-- Grupo: Ações de Arquivo -->
            <div class="flex items-center bg-gray-750 rounded-lg p-1 space-x-1">
              <button
                @click="savePage"
                :disabled="isSaving"
                :class="[
                  'px-3 py-2 rounded-md flex items-center space-x-2 text-sm font-medium transition-all duration-200',
                  isSaving
                    ? 'bg-blue-500 text-white cursor-not-allowed'
                    : 'text-gray-300 hover:text-white hover:bg-gray-600',
                ]"
                :title="isSaving ? 'Salvando...' : 'Salvar projeto (Ctrl+S)'"
              >
                <svg
                  v-if="isSaving"
                  class="animate-spin h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <svg
                  v-else
                  class="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span class="hidden sm:inline">{{
                  isSaving ? "Salvando..." : "Salvar"
                }}</span>
              </button>

              <button
                @click="exportHTML"
                class="px-3 py-2 rounded-md flex items-center space-x-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-600 transition-all duration-200"
                title="Exportar como HTML"
              >
                <svg
                  class="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span class="hidden sm:inline">Exportar</span>
              </button>
            </div>

            <!-- Grupo: Visualização -->
            <div class="flex items-center bg-gray-750 rounded-lg p-1 space-x-1">
              <button
                @click="previewPage"
                class="px-3 py-2 rounded-md flex items-center space-x-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-600 transition-all duration-200"
                title="Visualizar página"
              >
                <svg
                  class="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <span class="hidden sm:inline">Preview</span>
              </button>

              <button
                @click="togglePreviewMode"
                :class="[
                  'px-3 py-2 rounded-md flex items-center space-x-2 text-sm font-medium transition-all duration-200',
                  previewMode
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-gray-600',
                ]"
                :title="
                  previewMode ? 'Voltar para edição' : 'Modo visualização'
                "
              >
                <svg
                  class="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.636 6.636M9.878 9.878a3 3 0 105.304-.943M20.5 20.5l-9.75-9.75"
                  />
                </svg>
                <span class="hidden sm:inline">{{
                  previewMode ? "Editar" : "Visualizar"
                }}</span>
              </button>
            </div>

            <!-- Grupo: Ferramentas de Desenvolvimento -->
            <div class="flex items-center bg-gray-750 rounded-lg p-1 space-x-1">
              <button
                @click="toggleCodeViewer"
                :class="[
                  'px-3 py-2 rounded-md flex items-center space-x-2 text-sm font-medium transition-all duration-200',
                  showCodeViewer
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-gray-600',
                ]"
                title="Visualizar código fonte"
              >
                <svg
                  class="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
                <span class="hidden sm:inline">Código</span>
              </button>

              <button
                @click="toggleRulers"
                :class="[
                  'px-3 py-2 rounded-md flex items-center space-x-2 text-sm font-medium transition-all duration-200',
                  rulersEnabled
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-gray-600',
                ]"
                title="Mostrar/ocultar réguas"
              >
                <svg
                  class="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <span class="hidden sm:inline">Réguas</span>
              </button>
            </div>
          </div>

          <!-- Controles de Dispositivo e Configurações -->
          <div class="flex items-center space-x-3">
            <!-- Seletor de Dispositivo -->
            <div class="flex items-center bg-gray-750 rounded-lg p-1 relative">
              <div
                :class="[
                  'absolute left-1 top-1 bottom-1 w-2 rounded-sm transition-all duration-200',
                  selectedDevice === 'Desktop'
                    ? 'bg-green-500'
                    : selectedDevice === 'Tablet'
                    ? 'bg-blue-500'
                    : 'bg-purple-500',
                ]"
              ></div>
              <select
                v-model="selectedDevice"
                @change="changeDevice"
                class="bg-transparent border-none text-white text-sm font-medium px-3 py-2 pl-5 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                title="Selecionar dispositivo"
              >
                <option value="Desktop" class="bg-gray-800">🖥️ Desktop</option>
                <option value="Tablet" class="bg-gray-800">📱 Tablet</option>
                <option value="Mobile" class="bg-gray-800">📱 Mobile</option>
              </select>
            </div>

            <!-- Divider -->
            <div class="w-px h-6 bg-gray-600"></div>

            <!-- Botão Tela Cheia -->
            <button
              @click="toggleFullscreen"
              class="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-600 transition-all duration-200"
              title="Alternar tela cheia"
            >
              <svg
                class="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
            </button>

            <!-- Menu de Configurações -->
            <div class="relative">
              <button
                @click="showSettingsMenu = !showSettingsMenu"
                class="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-600 transition-all duration-200"
                title="Configurações"
              >
                <svg
                  class="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Área principal do editor -->
    <div class="editor-content flex-1 relative flex">
      <!-- Painel lateral esquerdo -->
      <div class="gjs-left-panel w-64 bg-gray-800 border-r border-gray-700">
        <!-- Abas dos painéis -->
        <div class="gjs-panel-tabs border-b border-gray-700">
          <div class="flex">
            <button
              class="gjs-tab-blocks flex-1 p-3 text-sm font-medium text-gray-300 hover:text-white border-b-2"
              :class="
                leftActiveTab === 'blocks'
                  ? 'border-blue-500 text-white'
                  : 'border-transparent'
              "
              data-tab="blocks"
              @click="switchLeftTab('blocks')"
            >
              Blocos
            </button>
            <button
              class="gjs-tab-templates flex-1 p-3 text-sm font-medium text-gray-300 hover:text-white border-b-2"
              :class="
                leftActiveTab === 'templates'
                  ? 'border-blue-500 text-white'
                  : 'border-transparent'
              "
              data-tab="templates"
              @click="switchLeftTab('templates')"
            >
              Templates
            </button>
            <button
              class="gjs-tab-layers flex-1 p-3 text-sm font-medium text-gray-300 hover:text-white border-b-2"
              :class="
                leftActiveTab === 'layers'
                  ? 'border-blue-500 text-white'
                  : 'border-transparent'
              "
              data-tab="layers"
              @click="switchLeftTab('layers')"
            >
              Camadas
            </button>
          </div>
        </div>

        <!-- Conteúdo dos painéis -->
        <div class="gjs-panel-content h-full overflow-y-auto">
          <!-- Painel de blocos -->
          <div
            id="blocks-container"
            class="gjs-blocks-container p-3"
            :style="{ display: leftActiveTab === 'blocks' ? 'block' : 'none' }"
          ></div>

          <!-- Painel de templates -->
          <div
            id="templates-container"
            class="gjs-templates-container p-3"
            :style="{
              display: leftActiveTab === 'templates' ? 'block' : 'none',
            }"
          >
            <!-- Seção de Upload de Documentos -->
            <div class="mb-6">
              <DocUploader @templateCreated="handleTemplateCreated" />
            </div>

            <div
              v-if="
                !templatesReady || !getTemplatesByCategory('Templates').length
              "
              class="text-gray-400 text-center py-8"
            >
              <div class="text-4xl mb-2">📄</div>
              {{
                !templatesReady
                  ? "Carregando templates..."
                  : "Nenhum template encontrado"
              }}
            </div>

            <div v-else>
              <div
                v-for="category in templateCategories"
                :key="category"
                class="mb-6"
              >
                <h3
                  class="text-gray-300 font-medium mb-3 text-sm uppercase tracking-wide"
                >
                  {{ category }}
                </h3>

                <div class="grid grid-cols-1 gap-3">
                  <div
                    v-for="template in getTemplatesByCategory(category)"
                    :key="template.get('id')"
                    class="template-item bg-gray-700 rounded-lg p-3 cursor-pointer hover:bg-gray-600 transition-colors border border-gray-600 hover:border-blue-500"
                    :draggable="true"
                    @dragstart="handleTemplateDragStart($event, template)"
                    @dragend="handleTemplateDragEnd($event)"
                  >
                    <div class="flex items-start space-x-3">
                      <div
                        class="template-thumbnail w-12 h-12 bg-gray-600 rounded flex items-center justify-center flex-shrink-0"
                        v-html="template.get('media')"
                      ></div>

                      <div class="flex-1 min-w-0">
                        <h4 class="text-white font-medium text-sm mb-1">
                          {{ template.get("label") }}
                        </h4>
                        <p class="text-gray-400 text-xs leading-relaxed">
                          Arraste para o canvas para usar
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Painel de camadas -->
          <div
            id="layers-container"
            class="gjs-layers-container p-3"
            :style="{ display: leftActiveTab === 'layers' ? 'block' : 'none' }"
          ></div>
        </div>
      </div>

      <!-- Área do canvas com régua -->
      <div
        class="gjs-canvas-container flex-1 relative flex items-center justify-center bg-gray-900"
      >
        <div id="gjs" class="h-full w-full"></div>

        <!-- Réguas de medida (posicionadas sobre o canvas) -->
        <div
          v-if="rulersEnabled"
          class="rulers-container absolute inset-0 pointer-events-none z-50"
        >
          <!-- Régua horizontal -->
          <div
            class="horizontal-ruler absolute top-0 left-8 right-0 h-8 bg-gray-800 bg-opacity-95 border-b-2 border-gray-500 shadow-lg"
          ></div>

          <!-- Régua vertical -->
          <div
            class="vertical-ruler absolute left-0 top-8 bottom-0 w-8 bg-gray-800 bg-opacity-95 border-r-2 border-gray-500 shadow-lg"
          ></div>

          <!-- Canto superior esquerdo -->
          <div
            class="absolute top-0 left-0 w-8 h-8 bg-gray-800 bg-opacity-95 border-r-2 border-b-2 border-gray-500 flex items-center justify-center shadow-lg z-50"
          >
            <span class="text-xs text-gray-300 font-medium">cm</span>
          </div>
        </div>
      </div>

      <!-- Painel lateral direito -->
      <div class="gjs-right-panel w-64 bg-gray-800 border-l border-gray-700">
        <!-- Abas do painel direito -->
        <div class="gjs-panel-tabs border-b border-gray-700">
          <div class="flex">
            <button
              class="gjs-tab-styles flex-1 p-3 text-sm font-medium text-gray-300 hover:text-white border-b-2 border-blue-500"
              data-tab="styles"
              @click="switchRightTab('styles')"
            >
              🎨 Estilos
            </button>
            <button
              class="gjs-tab-traits flex-1 p-3 text-sm font-medium text-gray-300 hover:text-white border-b-2 border-transparent"
              data-tab="traits"
              @click="switchRightTab('traits')"
            >
              Props
            </button>
          </div>
        </div>

        <!-- Conteúdo dos painéis direitos -->
        <div class="gjs-panel-content h-full overflow-y-auto">
          <!-- Preview/Info do elemento selecionado -->
          <div class="p-4 border-b border-gray-700">
            <div v-if="selectedElementInfo" class="text-center">
              <div class="bg-gray-700 rounded-lg p-3 mb-3">
                <h4 class="text-white text-sm font-medium mb-2">
                  🎯 Elemento Selecionado
                </h4>
                <div class="text-blue-400 text-sm font-medium">
                  {{ selectedElementInfo.type }}
                </div>
                <div class="text-gray-400 text-xs mt-1">
                  {{ selectedElementInfo.classes || "Sem classes" }}
                </div>
              </div>
            </div>
            <div v-else class="text-center py-8 text-gray-400">
              <svg
                class="mx-auto h-12 w-12 mb-3 opacity-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a4 4 0 004-4V5z"
                />
              </svg>
              <p class="text-sm font-medium">Nenhum elemento selecionado</p>
              <p class="text-xs mt-1">
                Clique em um elemento no canvas para ver suas propriedades
              </p>
            </div>
          </div>

          <!-- Painel de estilos nativo -->
          <div
            id="styles-container"
            class="gjs-styles-container"
            style="display: block"
          ></div>

          <!-- Painel de traits -->
          <div
            id="traits-container"
            class="gjs-traits-container p-3"
            style="display: none"
          >
            <!-- Informações do elemento selecionado -->
            <div
              v-if="selectedElementInfo"
              class="mb-4 p-3 bg-gray-700 rounded-lg"
            >
              <h4 class="text-white font-medium mb-2">Elemento Selecionado</h4>
              <div class="text-sm text-gray-300">
                <div>
                  <strong>Tipo:</strong>
                  {{
                    (selectedElementInfo as any).tagName ||
                    selectedElementInfo.type
                  }}
                </div>
                <div>
                  <strong>ID:</strong>
                  {{ (selectedElementInfo as any).id || "Nenhum" }}
                </div>
                <div>
                  <strong>Classes:</strong>
                  {{ selectedElementInfo.classes || "Nenhuma" }}
                </div>
              </div>
            </div>

            <!-- Ajuda para traits -->
            <div class="mb-4 p-3 bg-blue-900 bg-opacity-50 rounded-lg">
              <h4 class="text-blue-300 font-medium mb-2">💡 Dicas</h4>
              <div class="text-sm text-blue-200">
                <div>• <strong>Links:</strong> Configure URL, target e rel</div>
                <div>
                  • <strong>Botões:</strong> Defina ações e redirecionamentos
                </div>
                <div>
                  • <strong>CSS:</strong> Adicione estilos personalizados
                </div>
                <div>
                  • <strong>Imagens:</strong> Configure src, alt e links
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Visualizador de código modal -->
    <div
      v-if="showCodeViewer"
      class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
    >
      <div class="bg-gray-800 rounded-lg w-11/12 h-5/6 max-w-4xl flex flex-col">
        <div
          class="flex justify-between items-center p-4 border-b border-gray-700"
        >
          <h3 class="text-lg font-semibold text-white">Código Gerado</h3>
          <button
            @click="toggleCodeViewer"
            class="text-gray-400 hover:text-white"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div class="flex-1 overflow-auto p-4">
          <div class="mb-4">
            <h4 class="text-white mb-2">HTML:</h4>
            <pre
              class="bg-gray-900 p-4 rounded overflow-x-auto text-sm text-green-400"
            ><code>{{ generatedHTML }}</code></pre>
          </div>

          <div class="mb-4">
            <h4 class="text-white mb-2">CSS:</h4>
            <pre
              class="bg-gray-900 p-4 rounded overflow-x-auto text-sm text-blue-400"
            ><code>{{ generatedCSS }}</code></pre>
          </div>

          <div>
            <h4 class="text-white mb-2">JavaScript:</h4>
            <pre
              class="bg-gray-900 p-4 rounded overflow-x-auto text-sm text-yellow-400"
            ><code>{{ generatedJS }}</code></pre>
          </div>
        </div>

        <div class="p-4 border-t border-gray-700 flex justify-end space-x-2">
          <button
            @click="copyCode('html')"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Copiar HTML
          </button>
          <button
            @click="copyCode('css')"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Copiar CSS
          </button>
          <button
            @click="copyCode('js')"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Copiar JS
          </button>
          <button
            @click="downloadAllCode"
            class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Baixar Tudo
          </button>
        </div>
      </div>
    </div>

    <!-- Notificações -->
    <div v-if="notification.show" class="fixed top-4 right-4 z-50 max-w-sm">
      <div
        :class="[
          'p-4 rounded-lg shadow-lg',
          notification.type === 'success'
            ? 'bg-green-600 text-white'
            : 'bg-red-600 text-white',
        ]"
      >
        <div class="flex items-center space-x-2">
          <svg
            v-if="notification.type === 'success'"
            class="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          <svg v-else class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
          <span>{{ notification.message }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, reactive, ref, nextTick } from "vue";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import type { Editor } from "grapesjs";

// Importar configuração do editor
import { setupGrapesEditor } from "../editor/index";
import {
  optimizeGrapesJSPerformance,
  setupEventThrottling,
} from "../editor/utils/performanceUtils";
import DocUploader from "./DocUploader.vue";

// Gerenciador de Event Listeners otimizado
class EventListenerManager {
  private listeners: Array<{
    element: Element | Document;
    event: string;
    handler: EventListener;
    options?: AddEventListenerOptions;
  }> = [];

  add(
    element: Element | Document,
    event: string,
    handler: EventListener,
    options?: AddEventListenerOptions
  ) {
    const optimizedOptions = {
      passive: true,
      ...options,
    };

    element.addEventListener(event, handler, optimizedOptions);
    this.listeners.push({ element, event, handler, options: optimizedOptions });
  }

  removeAll() {
    this.listeners.forEach(({ element, event, handler, options }) => {
      element.removeEventListener(event, handler, options as any);
    });
    this.listeners = [];
  }

  remove(element: Element | Document, event: string, handler: EventListener) {
    const index = this.listeners.findIndex(
      (l) => l.element === element && l.event === event && l.handler === handler
    );
    if (index !== -1) {
      const listener = this.listeners[index];
      element.removeEventListener(event, handler, listener.options as any);
      this.listeners.splice(index, 1);
    }
  }
}

// Estado do componente
const editor = ref<Editor | null>(null);
const isSaving = ref(false);
const selectedDevice = ref("Desktop");
const showCodeViewer = ref(false);
const rulersEnabled = ref(false);
const previewMode = ref(false);
const showSettingsMenu = ref(false);
const selectedElementInfo = ref<{ type: string; classes: string } | null>(null);
const generatedHTML = ref("");
const generatedCSS = ref("");
const eventManager = new EventListenerManager();
const generatedJS = ref("");

// Estado das abas
const leftActiveTab = ref("blocks");

// Sistema de notificações
const notification = reactive({
  show: false,
  type: "success" as "success" | "error",
  message: "",
});

// Configuração do editor
const editorConfig = {
  container: "#gjs",
  height: "100%",
  width: "100%",
  fromElement: true,
  avoidInlineStyle: false,
  storageManager: false,

  // Configurações para evitar travamentos
  noticeOnUnload: false,
  clearOnRender: true,
  showOffsets: false, // Desabilitar offsets que podem causar problemas
  showDevices: false,

  // Configuração dos blocos
  blockManager: {
    appendTo: "#blocks-container",
    // Garantir que o drag & drop funcione
    drag: true,
    drop: true,
  },

  // Configuração do canvas
  canvas: {
    // Garantir que o drop funcione
    drop: true,
    styles: [
      `
      * {
        box-sizing: border-box;
      }
      body {
        margin: 0 !important;
        padding: 0 !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background: #1f2937;
        color: #f3f4f6;
      }
      
      /* Remover paddings indesejados do canvas */
      .gjs-frame {
        margin: 0 !important;
        padding: 0 !important;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      
      .gjs-frame body {
        margin: 0 !important;
        padding: 0 !important;
      }
      
      /* Estilos para drag & drop */
      .drag-over {
        border: 2px dashed #3b82f6 !important;
        background-color: rgba(59, 130, 246, 0.1) !important;
      }
      
      .template-item {
        transition: all 0.2s ease;
      }
      
      .template-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      }
      `,
    ],
  },

  // Configuração do DomComponents para evitar travamentos
  domComponents: {
    // Configurações para evitar problemas de performance
    avoidInlineStyle: false,
    forceClass: false,
    // Desabilitar algumas funcionalidades que podem causar travamento
    customLoading: false,
  },

  // Configuração do gerenciador de estilo
  styleManager: {
    appendTo: "#styles-container",
    sectors: [
      {
        name: "Layout",
        open: false,
        properties: [
          "display",
          "position",
          "top",
          "right",
          "left",
          "bottom",
          "width",
          "height",
          "max-width",
          "min-height",
          "margin",
          "padding",
        ],
      },
      {
        name: "Tipografia",
        open: false,
        properties: [
          "font-family",
          "font-size",
          "font-weight",
          "letter-spacing",
          "color",
          "line-height",
          "text-shadow",
          "text-align",
        ],
      },
      {
        name: "Aparência",
        open: false,
        properties: [
          "background-color",
          "background-image",
          "border",
          "border-radius",
          "box-shadow",
          "opacity",
        ],
      },
    ],
  },

  // Configuração do gerenciador de camadas
  layerManager: {
    appendTo: "#layers-container",
  },

  // Configuração do gerenciador de seletores (classes CSS)
  selectorManager: {
    appendTo: "#styles-container",
  },

  // Configuração do gerenciador de traits
  traitManager: {
    appendTo: "#traits-container",
    custom: true,
  },

  // Configuração do Device Manager
  deviceManager: {
    devices: [
      {
        name: "Desktop",
        width: "",
        id: "desktop-device",
      },
      {
        name: "Tablet",
        width: "768px",
        widthMedia: "1024px",
        id: "tablet-device",
      },
      {
        name: "Mobile",
        width: "375px",
        widthMedia: "767px",
        id: "mobile-device",
      },
    ],
  },

  // Habilitar réguas e guias
  canvasCss: `
    :root {
      --gjs-primary-color: #111827;
      --gjs-secondary-color: #374151;
      --gjs-tertiary-color: #4b5563;
    }
    body {
      margin: 0 !important;
      padding: 0 !important;
    }

    .gjs-rulers {
      background-color: rgba(30, 41, 59, 0.8);
      border-color: #374151;
    }
    .gjs-ruler-h {
      top: 0;
      height: 25px;
      border-bottom: 1px solid #374151;
    }
    .gjs-ruler-v {
      left: 0;
      width: 25px;
      border-right: 1px solid #374151;
    }
    .gjs-one-bg, .gjs-primary-color {
      background-color: #111827 !important;
    }
  `,

  // Desabilitar painéis automáticos
  panels: {
    defaults: [],
  },
};

// Novos métodos
const toggleRulers = () => {
  rulersEnabled.value = !rulersEnabled.value;
  // Por enquanto, apenas alterna o estado visual
  // A implementação completa dos rulers pode ser adicionada depois
  console.log(`Rulers ${rulersEnabled.value ? "ativadas" : "desativadas"}`);
};

const togglePreviewMode = () => {
  previewMode.value = !previewMode.value;
  // Por enquanto, apenas alterna o estado visual
  // A implementação completa do preview mode pode ser adicionada depois
};

const toggleCodeViewer = () => {
  showCodeViewer.value = !showCodeViewer.value;
  if (showCodeViewer.value && editor.value) {
    generatedHTML.value = editor.value.getHtml();
    generatedCSS.value = editor.value.getCss();
    generatedJS.value = editor.value.getJs();
  }
};

const copyCode = (type: string) => {
  let code = "";
  switch (type) {
    case "html":
      code = generatedHTML.value;
      break;
    case "css":
      code = generatedCSS.value;
      break;
    case "js":
      code = generatedJS.value;
      break;
  }

  navigator.clipboard.writeText(code).then(() => {
    showNotification(
      `${type.toUpperCase()} copiado para a área de transferência!`
    );
  });
};

const downloadAllCode = () => {
  const fullCode = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página Gerada</title>
    <style>
        ${generatedCSS.value}
    </style>
</head>
<body>
    ${generatedHTML.value}
    <script>
        ${generatedJS.value}
    <\/script>
</body>
</html>`;

  const blob = new Blob([fullCode], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "pagina-completa.html";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showNotification("Página completa baixada com sucesso!");
};

// Métodos existentes...
const showNotification = (
  message: string,
  type: "success" | "error" = "success"
) => {
  notification.message = message;
  notification.type = type;
  notification.show = true;

  setTimeout(() => {
    notification.show = false;
  }, 3000);
};

const savePage = async () => {
  if (!editor.value) return;

  isSaving.value = true;

  try {
    // Simular salvamento
    await new Promise((resolve) => setTimeout(resolve, 1000));
    showNotification("Página salva com sucesso!", "success");
  } catch (error) {
    console.error("Erro ao salvar:", error);
    showNotification("Erro ao salvar a página", "error");
  } finally {
    isSaving.value = false;
  }
};

const handleTemplateCreated = (template: any) => {
  if (!editor.value) {
    console.error("Editor GrapesJS não está disponível.");
    return;
  }
  // Adiciona o CSS do template ao documento, se existir.
  if (template.css) {
    const styleElement = document.createElement("style");
    styleElement.textContent = template.css;
    document.head.appendChild(styleElement);
  }

  // Adiciona o template diretamente ao canvas se solicitado.
  if (template.addToCanvas) {
    try {
      // Usar setTimeout para evitar travamento
      setTimeout(() => {
        if (!editor.value) return;
        try {
          // Adicionar o template como um bloco temporário
          const tempBlockId = `temp-${Date.now()}`;
          const tempBlock = editor.value.BlockManager.add(tempBlockId, {
            id: tempBlockId,
            label: template.label,
            content: template.content,
            category: { id: "Templates", label: "Templates" },
            media:
              template.media ||
              '<div style="width: 48px; height: 48px; background: #3498db; border-radius: 4px;"></div>',
          }) as any;

          // Simular clique no bloco para adicionar ao canvas
          setTimeout(() => {
            try {
              // Procurar o elemento do bloco no DOM
              const blockElement = document.querySelector(
                `[data-block-id="${tempBlockId}"]`
              );
              if (blockElement) {
                console.log(
                  "✅ Bloco temporário encontrado no DOM, simulando clique..."
                );
                (blockElement as HTMLElement).click();

                // Remover o bloco temporário após um delay
                setTimeout(() => {
                  try {
                    tempBlock.destroy();
                    console.log("✅ Bloco temporário removido com sucesso");
                  } catch (error) {
                    console.error("Erro ao remover bloco temporário:", error);
                  }
                }, 1000);
              } else {
                console.error("❌ Bloco temporário não encontrado no DOM");
                // Tentar outras estratégias para encontrar o bloco
                const blockByClass = document.querySelector(
                  `.gjs-block[title="${template.label}"]`
                );
                if (blockByClass) {
                  console.log(
                    "✅ Bloco encontrado por título, simulando clique..."
                  );
                  (blockByClass as HTMLElement).click();
                  setTimeout(() => tempBlock.destroy(), 1000);
                } else {
                  console.error(
                    "❌ Bloco não encontrado por nenhuma estratégia"
                  );
                  tempBlock.destroy();
                }
              }
            } catch (error) {
              console.error("Erro ao simular clique no bloco:", error);
              tempBlock.destroy();
            }
          }, 200);
        } catch (error) {
          console.error("Erro ao adicionar template ao canvas:", error);
          showNotification(
            `Template "${template.label}" criado, mas não foi possível adicionar ao canvas.`,
            "error"
          );
        }
      }, 100);
    } catch (error) {
      console.error("Erro ao adicionar template ao canvas:", error);
      showNotification(
        `Template "${template.label}" criado, mas não foi possível adicionar ao canvas.`,
        "error"
      );
    }
  } else {
    // Notifica que o template foi apenas criado, mas não adicionado ao canvas.
    showNotification(
      `Template "${template.label}" criado e salvo na aba Templates!`,
      "success"
    );
  }

  // Força a atualização da lista de templates.
  templatesReady.value = true;
};

const exportHTML = () => {
  if (!editor.value) return;

  const html = editor.value.getHtml();
  const css = editor.value.getCss();
  const js = editor.value.getJs();

  const fullHtml = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página Gerada</title>
    <style>
        * { box-sizing: border-box; }
        body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        ${css}
    </style>
</head>
<body>
    ${html}
    <script>
        ${js}
    <\/script>
</body>
</html>`;

  const blob = new Blob([fullHtml], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "pagina-export.html";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showNotification("HTML exportado com sucesso!", "success");
};

const previewPage = () => {
  if (!editor.value) return;

  const html = editor.value.getHtml();
  const css = editor.value.getCss();
  const js = editor.value.getJs();

  console.log("Preview - HTML:", html.substring(0, 200) + "...");
  console.log("Preview - CSS:", css.substring(0, 200) + "...");
  console.log("Preview - JS:", js.substring(0, 200) + "...");

  // JavaScript para modais Bootstrap no preview
  const bootstrapModalJS = `
    // JavaScript para modais Bootstrap no preview
    document.addEventListener('DOMContentLoaded', function() {
      console.log("Bootstrap Modal JS carregado no preview");
      
      // Função para abrir modal
      const openModal = (modalId) => {
        console.log("Tentando abrir modal:", modalId);
        const modal = document.getElementById(modalId);
        if (modal) {
          modal.style.display = "block";
          modal.classList.add("show");
          document.body.classList.add("modal-open");

          // Adicionar backdrop
          const existingBackdrop = document.getElementById("modal-backdrop");
          if (existingBackdrop) {
            existingBackdrop.remove();
          }

          const backdrop = document.createElement("div");
          backdrop.className = "modal-backdrop fade show";
          backdrop.id = "modal-backdrop";
          backdrop.onclick = () => closeModal(modalId);
          document.body.appendChild(backdrop);

          // Foco no modal
          setTimeout(() => {
            const focusableElement = modal.querySelector(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (focusableElement) {
              focusableElement.focus();
            }
          }, 100);
        }
      };

      // Função para fechar modal
      const closeModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
          modal.style.display = "none";
          modal.classList.remove("show");
          document.body.classList.remove("modal-open");

          // Remover backdrop
          const backdrop = document.getElementById("modal-backdrop");
          if (backdrop) {
            backdrop.remove();
          }
        }
      };

      // Event delegation para botões de abrir modal
      document.addEventListener("click", (e) => {
        const target = e.target;
        const triggerBtn = target.closest('[data-bs-toggle="modal"]');
        
        console.log("Click detectado:", target, "Trigger button:", triggerBtn);
        
        if (triggerBtn) {
          const modalId = triggerBtn.getAttribute("data-bs-target")?.replace("#", "");
          console.log("Modal ID encontrado:", modalId);
          if (modalId) {
            e.preventDefault();
            e.stopPropagation();
            openModal(modalId);
          }
        }

        // Botões de fechar modal
        const closeBtn = target.closest('[data-bs-dismiss="modal"]');
        if (closeBtn) {
          const modal = closeBtn.closest(".modal");
          if (modal) {
            e.preventDefault();
            e.stopPropagation();
            closeModal(modal.id);
          }
        }

        // Fechar ao clicar no backdrop
        if (target.classList.contains("modal")) {
          closeModal(target.id);
        }
      });

      // Fechar com ESC
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          const openModal = document.querySelector(".modal.show");
          if (openModal) {
            closeModal(openModal.id);
          }
        }
      });
    });
  `;

  // CSS para Accordion no preview
  const accordionCSS = `
    .accordion-widget {
      width: 100% !important;
      max-width: 600px !important;
      margin: 0 auto !important;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
    }
    
    .accordion-item {
      border: 1px solid #e5e7eb !important;
      border-radius: 8px !important;
      margin-bottom: 8px !important;
      overflow: hidden !important;
    }
    
    .accordion-item:last-child {
      margin-bottom: 0 !important;
    }
    
    .accordion-toggle {
      display: none !important;
    }
    
    .accordion-header {
      background: #f9fafb !important;
      padding: 16px 20px !important;
      cursor: pointer !important;
      border: none !important;
      width: 100% !important;
      text-align: left !important;
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
      transition: background-color 0.2s ease !important;
    }
    
    .accordion-header:hover {
      background: #f3f4f6 !important;
    }
    
    .accordion-header h3 {
      margin: 0 !important;
      font-size: 16px !important;
      font-weight: 600 !important;
      color: #374151 !important;
    }
    
    .accordion-icon {
      transition: transform 0.2s ease !important;
      color: #6b7280 !important;
    }
    
    .accordion-toggle:checked + .accordion-header .accordion-icon {
      transform: rotate(180deg) !important;
    }
    
    .accordion-content {
      max-height: 0 !important;
      overflow: hidden !important;
      transition: max-height 0.3s ease !important;
      background: white !important;
    }
    
    .accordion-toggle:checked + .accordion-header + .accordion-content {
      max-height: 200px !important;
    }
    
    .accordion-content p {
      margin: 0 !important;
      padding: 20px !important;
      color: #6b7280 !important;
      line-height: 1.6 !important;
    }
  `;

  // CSS para Toggle no preview
  const toggleCSS = `
    .toggle-widget {
      width: 100% !important;
      max-width: 800px !important;
      margin: 20px auto !important;
      background: #ffffff !important;
      border-radius: 12px !important;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1) !important;
      overflow: hidden !important;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
    }
    
    .toggle-section {
      border-bottom: 1px solid #e5e7eb !important;
    }
    
    .toggle-section:last-child {
      border-bottom: none !important;
    }
    
    .toggle-header {
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      padding: 20px 24px !important;
      cursor: pointer !important;
      background: #ffffff !important;
      transition: all 0.3s ease !important;
      border: none !important;
      width: 100% !important;
      text-align: left !important;
      position: relative !important;
    }
    
    .toggle-header:hover {
      background: #f8fafc !important;
    }
    
    .toggle-header.active {
      background: #f0f9ff !important;
      border-left: 4px solid #3b82f6 !important;
    }
    
    .toggle-title {
      margin: 0 !important;
      font-size: 16px !important;
      font-weight: 600 !important;
      color: #1f2937 !important;
      flex: 1 !important;
    }
    
    .toggle-icon {
      font-size: 20px !important;
      font-weight: bold !important;
      color: #6b7280 !important;
      transition: transform 0.3s ease !important;
      min-width: 24px !important;
      text-align: center !important;
    }
    
    .toggle-header.active .toggle-icon {
      color: #3b82f6 !important;
      transform: rotate(45deg) !important;
    }
    
    .toggle-content {
      max-height: 0 !important;
      overflow: hidden !important;
      transition: max-height 0.3s ease !important;
      background: #fafbfc !important;
    }
    
    .toggle-content.active {
      max-height: 500px !important;
    }
    
    .toggle-content-wrapper {
      padding: 20px 24px !important;
    }
    
    .toggle-content-wrapper p {
      margin: 0 0 16px 0 !important;
      color: #4b5563 !important;
      line-height: 1.6 !important;
    }
    
    .toggle-content-wrapper ul {
      margin: 0 0 16px 0 !important;
      padding-left: 20px !important;
    }
    
    .toggle-content-wrapper li {
      margin: 0 0 8px 0 !important;
      color: #374151 !important;
    }
    
    .highlight-box {
      background: #dbeafe !important;
      border: 1px solid #93c5fd !important;
      border-radius: 8px !important;
      padding: 16px !important;
      margin: 16px 0 !important;
    }
    
    .highlight-box strong {
      color: #1e40af !important;
    }
    
    .example-button {
      background: #3b82f6 !important;
      color: white !important;
      border: none !important;
      border-radius: 8px !important;
      padding: 12px 24px !important;
      cursor: pointer !important;
      font-size: 14px !important;
      font-weight: 500 !important;
      transition: background-color 0.2s ease !important;
    }
    
    .example-button:hover {
      background: #2563eb !important;
    }
    
    .contact-info {
      background: #f3f4f6 !important;
      border-radius: 8px !important;
      padding: 16px !important;
      margin: 16px 0 !important;
    }
    
    .contact-info p {
      margin: 0 0 8px 0 !important;
    }
    
    .contact-info strong {
      color: #1f2937 !important;
    }
  `;

  // CSS para Tabs no preview
  const tabsCSS = `
    .tabs-widget {
      width: 100% !important;
      margin: 20px 0 !important;
      background: #ffffff !important;
      border-radius: 12px !important;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1) !important;
      overflow: hidden !important;
      border: 1px solid #e5e7eb !important;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
    }
    
    .tabs-nav {
      display: flex !important;
      background: #f8fafc !important;
      border-bottom: 1px solid #e5e7eb !important;
      overflow-x: auto !important;
      scrollbar-width: none !important;
      -ms-overflow-style: none !important;
    }
    
    .tabs-nav::-webkit-scrollbar {
      display: none !important;
    }
    
    .tab-button {
      flex: 1 !important;
      min-width: 120px !important;
      padding: 16px 24px !important;
      border: none !important;
      background: transparent !important;
      color: #6b7280 !important;
      cursor: pointer !important;
      transition: all 0.3s ease !important;
      font-size: 14px !important;
      font-weight: 500 !important;
      text-align: center !important;
      position: relative !important;
    }
    
    .tab-button:hover {
      background: #f1f5f9 !important;
      color: #374151 !important;
    }
    
    .tab-button.active {
      background: #3b82f6 !important;
      color: white !important;
    }
    
    .tab-button.active::after {
      content: '' !important;
      position: absolute !important;
      bottom: 0 !important;
      left: 0 !important;
      right: 0 !important;
      height: 3px !important;
      background: #1d4ed8 !important;
    }
    
    .tabs-content {
      padding: 0 !important;
    }
    
    .tab-pane {
      display: none !important;
      padding: 24px !important;
      animation: fadeIn 0.3s ease !important;
    }
    
    .tab-pane.active {
      display: block !important;
    }
    
    .tab-content-wrapper h3 {
      margin: 0 0 16px 0 !important;
      font-size: 20px !important;
      font-weight: 600 !important;
      color: #1f2937 !important;
    }
    
    .tab-content-wrapper p {
      margin: 0 0 16px 0 !important;
      color: #6b7280 !important;
      line-height: 1.6 !important;
    }
    
    .tab-content-wrapper ul {
      margin: 0 0 16px 0 !important;
      padding-left: 20px !important;
    }
    
    .tab-content-wrapper li {
      margin: 0 0 8px 0 !important;
      color: #374151 !important;
    }
    
    .feature-box {
      background: #f0f9ff !important;
      border: 1px solid #bae6fd !important;
      border-radius: 8px !important;
      padding: 16px !important;
      margin: 16px 0 !important;
    }
    
    .feature-box h4 {
      margin: 0 0 8px 0 !important;
      color: #0369a1 !important;
      font-size: 16px !important;
      font-weight: 600 !important;
    }
    
    .feature-box p {
      margin: 0 !important;
      color: #0c4a6e !important;
    }
    
    .action-area {
      margin: 16px 0 !important;
    }
    
    .sample-button {
      background: #3b82f6 !important;
      color: white !important;
      border: none !important;
      border-radius: 8px !important;
      padding: 12px 24px !important;
      cursor: pointer !important;
      font-size: 14px !important;
      font-weight: 500 !important;
      transition: background-color 0.2s ease !important;
    }
    
    .sample-button:hover {
      background: #2563eb !important;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;

  // CSS para Counter no preview
  const counterCSS = `
    .counter-widget {
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      padding: 20px !important;
      background: #f9fafb !important;
      border-radius: 12px !important;
      max-width: 300px !important;
      margin: 0 auto !important;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
    }
    
    .counter-title {
      font-size: 18px !important;
      font-weight: 600 !important;
      color: #374151 !important;
      margin-bottom: 16px !important;
      text-align: center !important;
    }
    
    .counter-display {
      display: flex !important;
      align-items: center !important;
      gap: 16px !important;
      margin-bottom: 16px !important;
    }
    
    .counter-value {
      font-size: 32px !important;
      font-weight: 700 !important;
      color: #1f2937 !important;
      min-width: 60px !important;
      text-align: center !important;
    }
    
    .counter-btn {
      background: #3b82f6 !important;
      color: white !important;
      border: none !important;
      border-radius: 8px !important;
      width: 40px !important;
      height: 40px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      cursor: pointer !important;
      font-size: 18px !important;
      font-weight: 600 !important;
      transition: background-color 0.2s ease !important;
    }
    
    .counter-btn:hover {
      background: #2563eb !important;
    }
    
    .counter-btn:active {
      transform: scale(0.95) !important;
    }
    
    .counter-reset {
      background: #6b7280 !important;
      color: white !important;
      border: none !important;
      border-radius: 8px !important;
      padding: 8px 16px !important;
      cursor: pointer !important;
      font-size: 14px !important;
      font-weight: 500 !important;
      transition: background-color 0.2s ease !important;
    }
    
    .counter-reset:hover {
      background: #4b5563 !important;
    }
  `;

  // CSS para Container no preview
  const containerCSS = `
    .container-widget {
      width: 100% !important;
      min-height: 100px !important;
      padding: 20px !important;
      border: 2px dashed #e5e7eb !important;
      border-radius: 8px !important;
      background: #f9fafb !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      margin: 0 auto !important;
      box-sizing: border-box !important;
    }
    
    .container-widget.large {
      max-width: 1200px !important;
    }
    
    .container-widget.medium {
      max-width: 960px !important;
    }
    
    .container-widget.small {
      max-width: 768px !important;
    }
    
    .container-widget.full {
      max-width: 100% !important;
    }
    
    .container-content {
      text-align: center !important;
      color: #6b7280 !important;
    }
  `;

  // JavaScript para Accordion no preview
  const accordionJS = `
    // JavaScript para Accordion no preview
    document.addEventListener('DOMContentLoaded', function() {
      console.log("Accordion JS carregado no preview");
      
      // Inicializar accordions
      const accordions = document.querySelectorAll('.accordion-widget');
      accordions.forEach(accordion => {
        const headers = accordion.querySelectorAll('.accordion-header');
        
        headers.forEach(header => {
          header.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Encontrar o checkbox associado ao label
            const label = header;
            const toggleId = label.getAttribute('for');
            let toggle = null;
            
            if (toggleId) {
              toggle = accordion.querySelector('#' + toggleId);
            } else {
              // Fallback: procurar o checkbox anterior
              toggle = header.previousElementSibling;
            }
            
            if (toggle && toggle.type === 'checkbox') {
              // Toggle do checkbox
              toggle.checked = !toggle.checked;
              
              // Disparar evento change para ativar CSS
              const changeEvent = new Event('change', { bubbles: true });
              toggle.dispatchEvent(changeEvent);
            }
          });
        });
      });
    });
  `;

  // JavaScript para Toggle no preview
  const toggleJS = `
    // JavaScript para Toggle no preview
    document.addEventListener('DOMContentLoaded', function() {
      console.log("Toggle JS carregado no preview");
      
      // Inicializar toggles
      const toggleWidgets = document.querySelectorAll('.toggle-widget');
      toggleWidgets.forEach(toggleWidget => {
        const headers = toggleWidget.querySelectorAll('.toggle-header');
        
        headers.forEach(header => {
          header.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const target = header.getAttribute('data-toggle');
            const content = toggleWidget.querySelector('[data-section="' + target + '"]');
            const icon = header.querySelector('.toggle-icon');
            
            const isActive = header.classList.contains('active');
            
            if (isActive) {
              header.classList.remove('active');
              if (content) content.classList.remove('active');
              if (icon) icon.textContent = '+';
            } else {
              header.classList.add('active');
              if (content) content.classList.add('active');
              if (icon) icon.textContent = '−';
            }
          });
        });
      });
    });
  `;

  // JavaScript para Tabs no preview
  const tabsJS = `
    // JavaScript para Tabs no preview
    document.addEventListener('DOMContentLoaded', function() {
      console.log("Tabs JS carregado no preview");
      
      // Inicializar tabs
      const tabsWidgets = document.querySelectorAll('.tabs-widget');
      tabsWidgets.forEach(tabsWidget => {
        const tabButtons = tabsWidget.querySelectorAll('.tab-button');
        const tabPanes = tabsWidget.querySelectorAll('.tab-pane');
        
        tabButtons.forEach(button => {
          button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const targetTab = button.getAttribute('data-tab');
            
            // Remover active de todos os botões
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Remover active de todos os painéis
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Adicionar active ao botão clicado
            button.classList.add('active');
            
            // Adicionar active ao painel correspondente
            const targetPane = tabsWidget.querySelector('[data-content="' + targetTab + '"]');
            if (targetPane) {
              targetPane.classList.add('active');
            }
          });
        });
      });
    });
  `;

  // JavaScript para Counter no preview
  const counterJS = `
    // JavaScript para Counter no preview
    document.addEventListener('DOMContentLoaded', function() {
      console.log("Counter JS carregado no preview");
      
      // Inicializar counters
      const counters = document.querySelectorAll('.counter-widget');
      counters.forEach(counter => {
        const buttons = counter.querySelectorAll('.counter-btn');
        const valueElement = counter.querySelector('.counter-value');
        
        let currentValue = parseInt(counter.getAttribute('data-counter') || '0');
        if (valueElement) valueElement.textContent = currentValue.toString();
        
        buttons.forEach(button => {
          button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const action = button.getAttribute('data-action');
            if (!action) return;
            
            const minValue = parseInt(counter.getAttribute('data-min-value') || '0');
            const maxValue = parseInt(counter.getAttribute('data-max-value') || '100');
            
            switch (action) {
              case 'increase':
                if (currentValue < maxValue) {
                  currentValue++;
                }
                break;
              case 'decrease':
                if (currentValue > minValue) {
                  currentValue--;
                }
                break;
              case 'reset':
                currentValue = parseInt(counter.getAttribute('data-initial-value') || '0');
                break;
            }
            
            if (valueElement) valueElement.textContent = currentValue.toString();
            counter.setAttribute('data-counter', currentValue.toString());
          });
        });
      });
    });
  `;

  // JavaScript para Container no preview
  const containerJS = `
    // JavaScript para Container no preview
    document.addEventListener('DOMContentLoaded', function() {
      console.log("Container JS carregado no preview");
      
      // Aplicar estilos dinâmicos aos containers
      const containers = document.querySelectorAll('.container-widget');
      containers.forEach(container => {
        // Aplicar largura baseada na classe
        if (container.classList.contains('large')) {
          container.style.maxWidth = '1200px';
          container.style.margin = '0 auto';
        } else if (container.classList.contains('medium')) {
          container.style.maxWidth = '960px';
          container.style.margin = '0 auto';
        } else if (container.classList.contains('small')) {
          container.style.maxWidth = '768px';
          container.style.margin = '0 auto';
        } else if (container.classList.contains('full')) {
          container.style.maxWidth = '100%';
        }
        
        // Aplicar alinhamento
        const align = container.getAttribute('data-align');
        if (align) {
          container.style.textAlign = align;
        }
        
        // Aplicar cor de fundo
        const bgColor = container.getAttribute('data-bg-color');
        if (bgColor) {
          container.style.backgroundColor = bgColor;
        }
        
        // Aplicar padding
        const padding = container.getAttribute('data-padding');
        if (padding) {
          container.style.padding = padding;
        }
        
        // Aplicar margin
        const margin = container.getAttribute('data-margin');
        if (margin) {
          container.style.margin = margin;
        }
      });
    });
  `;

  const fullHtml = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview da Página</title>
    <style>
        * { box-sizing: border-box; }
        body { margin: 0 !important; padding: 0 !important; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        ${css}
        
        /* CSS específico para accordion no preview */
        ${accordionCSS}
        
        /* CSS específico para toggle no preview */
        ${toggleCSS}
        
        /* CSS específico para tabs no preview */
        ${tabsCSS}
        
        /* CSS específico para counter no preview */
        ${counterCSS}
        
        /* CSS específico para container no preview */
        ${containerCSS}
        
        /* CSS específico para modais no preview */
        .modal {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          z-index: 9999 !important;
          width: 100% !important;
          height: 100% !important;
          overflow-x: hidden !important;
          overflow-y: auto !important;
          outline: 0 !important;
          display: none !important;
        }
        
        .modal.show {
          display: block !important;
          opacity: 1 !important;
        }
        
        .modal-backdrop {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          z-index: 9998 !important;
          width: 100vw !important;
          height: 100vh !important;
          background-color: #000 !important;
          opacity: 0.5 !important;
        }
        
        body.modal-open {
          overflow: hidden !important;
        }
        
        /* CSS específico para Container no preview */
        .container-widget {
          width: 100% !important;
          min-height: 100px !important;
          padding: 20px !important;
          border: 2px dashed #e5e7eb !important;
          border-radius: 8px !important;
          background: #f9fafb !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          transition: all 0.3s ease !important;
        }
        
        .container-widget:hover {
          border-color: #3b82f6 !important;
          background: #eff6ff !important;
        }
        
        .container-content {
          width: 100% !important;
          text-align: center !important;
          color: #6b7280 !important;
          font-size: 14px !important;
        }
        
        /* Classes de largura do container */
        .container-widget.large {
          max-width: 1200px !important;
          margin: 0 auto !important;
        }
        
        .container-widget.medium {
          max-width: 960px !important;
          margin: 0 auto !important;
        }
        
        .container-widget.small {
          max-width: 768px !important;
          margin: 0 auto !important;
        }
        
        .container-widget.full {
          max-width: 100% !important;
        }
    </style>
</head>
<body>
    ${html}
    <script>
        ${js}
    <\/script>
    <script>
        ${bootstrapModalJS}
    <\/script>
    <script>
        ${accordionJS}
    <\/script>
    <script>
        ${toggleJS}
    <\/script>
    <script>
        ${tabsJS}
    <\/script>
    <script>
        ${counterJS}
    <\/script>
    <script>
        ${containerJS}
    <\/script>
</body>
</html>`;

  const previewWindow = window.open("", "_blank");
  if (previewWindow) {
    previewWindow.document.write(fullHtml);
    previewWindow.document.close();
  }
};

const changeDevice = () => {
  if (!editor.value) return;

  try {
    const editorInstance = editor.value as any;

    // Método 1: runCommand do GrapesJS
    if (editorInstance.runCommand) {
      editorInstance.runCommand("set-device", { name: selectedDevice.value });
    }

    // Método 2: Device Manager diretamente
    const deviceManager = editorInstance.DeviceManager;
    if (deviceManager) {
      const devices = deviceManager.getAll();
      const targetDevice = devices.find(
        (d: any) => d.get("name") === selectedDevice.value
      );

      if (targetDevice) {
        deviceManager.select(targetDevice);
      } else {
        console.warn("⚠️ Dispositivo não encontrado:", selectedDevice.value);
      }
    }

    // Método 3: Atualizar manualmente canvas e frame
    forceCanvasUpdate();

    // showNotification(`Canvas alterado para ${selectedDevice.value}`, "success");
    console.log(`✅ Dispositivo ${selectedDevice.value} processado`);
  } catch (error) {
    console.error("❌ Erro ao alterar dispositivo:", error);
    // showNotification(`Erro ao alterar para ${selectedDevice.value}`, "error");
  }
};

const forceCanvasUpdate = () => {
  try {
    console.log("🔧 Forçando atualização manual do canvas...");

    const canvas = document.querySelector(".gjs-cv-canvas") as HTMLElement;
    const frame = document.querySelector(".gjs-frame") as HTMLElement;

    if (canvas && frame) {
      // Atualizar classes e atributos
      canvas.setAttribute("data-device", selectedDevice.value);
      canvas.className = canvas.className.replace(/gjs-device-\w+/g, "");
      canvas.classList.add(`gjs-device-${selectedDevice.value.toLowerCase()}`);

      // Aplicar estilos diretamente no frame
      frame.style.transition = "all 0.3s ease-in-out";

      if (selectedDevice.value === "Desktop") {
        frame.style.maxWidth = "calc(100% - 40px)";
        frame.style.width = "calc(100% - 40px)";
        frame.style.borderColor = "#10b981";
        frame.style.boxShadow = "0 10px 25px rgba(16, 185, 129, 0.3)";
      } else if (selectedDevice.value === "Tablet") {
        frame.style.maxWidth = "768px";
        frame.style.width = "768px";
        frame.style.borderColor = "#3b82f6";
        frame.style.boxShadow = "0 10px 25px rgba(59, 130, 246, 0.3)";
      } else if (selectedDevice.value === "Mobile") {
        frame.style.maxWidth = "375px";
        frame.style.width = "375px";
        frame.style.borderColor = "#8b5cf6";
        frame.style.boxShadow = "0 10px 25px rgba(139, 92, 246, 0.3)";
      }

      frame.style.borderWidth = "3px";
      frame.style.borderStyle = "solid";

      console.log(
        `✅ Estilos aplicados manualmente para ${selectedDevice.value}`
      );
      console.log(`📏 Largura definida: ${frame.style.width}`);
    } else {
      console.warn("⚠️ Canvas ou frame não encontrados");
    }
  } catch (error) {
    console.error("❌ Erro na atualização manual:", error);
  }
};

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

const switchLeftTab = (tab: string) => {
  leftActiveTab.value = tab;
};

// Funções para gerenciar templates (agora são blocos)
const getTemplatesByCategory = (_category: string) => {
  if (!editor.value || !templatesReady.value) {
    return [];
  }
  const blockManager = editor.value.BlockManager;
  const allBlocks = blockManager.getAll();

  const templates = allBlocks.filter((block: any) => {
    const category = block.get("category").id;
    // Verificar se é um objeto com id "Templates" ou string "Templates"
    return category === "Templates";
  });

  return templates;
};

// Computed para obter categorias de templates
const templateCategories = ref(["Templates"]);
const templatesReady = ref(false);

// Função para ocultar a categoria Templates da aba Blocos
const filterTemplatesFromBlocks = (editor: any) => {
  if (!editor) return;

  // Buscar o container de blocos
  const blocksContainer = document.querySelector(".gjs-blocks-cs");
  if (!blocksContainer) {
    return;
  }

  // Buscar a categoria Templates - tentar diferentes seletores
  let templatesCategory = blocksContainer.querySelector(
    '[data-title="Templates"]'
  );

  // Se não encontrou, tentar buscar pelo texto "Templates"
  if (!templatesCategory) {
    const allCategories = blocksContainer.querySelectorAll(
      ".gjs-block-category"
    );
    console.log(`🔍 Encontradas ${allCategories.length} categorias:`);

    allCategories.forEach((category: any) => {
      const titleEl = category.querySelector(".gjs-title");
      titleEl?.textContent?.trim();
    });

    templatesCategory =
      Array.from(allCategories).find((category: any) => {
        const titleEl = category.querySelector(".gjs-title");
        return titleEl && titleEl.textContent?.trim() === "Templates";
      }) || null;
  }

  if (templatesCategory) {
    const categoryEl = templatesCategory as HTMLElement;
    categoryEl.style.display = "none";
    categoryEl.style.visibility = "hidden";
    categoryEl.style.position = "absolute";
    categoryEl.style.left = "-9999px";
    categoryEl.style.opacity = "0";
    categoryEl.style.pointerEvents = "none";
  } else {
    console.log("❌ Categoria Templates não encontrada");
  }
};

// Funções para drag & drop de templates
const handleTemplateDragStart = (event: DragEvent, template: any) => {
  if (!editor.value) return;

  // Armazenar dados do template no evento de drag
  if (event.dataTransfer) {
    event.dataTransfer.setData("text/plain", template.get("content"));
    event.dataTransfer.effectAllowed = "copy";
  }

  // Adicionar classe visual para feedback
  const target = event.target as HTMLElement;
  if (target) {
    target.classList.add("opacity-50", "scale-95");
  }
};

const handleTemplateDragEnd = (event: DragEvent) => {
  // Remover classes visuais
  const target = event.target as HTMLElement;
  if (target) {
    target.classList.remove("opacity-50", "scale-95");
  }
};

// Configurar drag & drop no canvas
const setupCanvasDragDrop = (editor: any) => {
  if (!editor) return;

  const canvas = editor.Canvas.getElement();
  if (!canvas) return;

  // Event listener para dragover (necessário para permitir drop)
  canvas.addEventListener("dragover", (event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer!.dropEffect = "copy";

    // Adicionar feedback visual
    canvas.classList.add("drag-over");
  });

  // Event listener para dragleave
  canvas.addEventListener("dragleave", () => {
    // Remover feedback visual
    canvas.classList.remove("drag-over");
  });

  // Event listener para drop
  canvas.addEventListener("drop", (event: DragEvent) => {
    event.preventDefault();
    canvas.classList.remove("drag-over");

    const content = event.dataTransfer?.getData("text/plain");
    if (!content) return;

    // Adicionar o template ao canvas
    try {
      editor.addComponent(content);
    } catch (error) {
      // Fallback: usar append se addComponent falhar
      try {
        const rootComponent = editor.DomComponents.getWrapper();
        rootComponent.append(content);
      } catch (error2) {
        // Último recurso: usar setComponents
        editor.setComponents(content);
      }
    }
  });
};

// Sistema de traits customizados
const setupCustomTraits = (editor: any) => {
  if (!editor) return;

  // Traits para links
  editor.DomComponents.addType("link", {
    extend: "link",
    model: {
      defaults: {
        traits: [
          {
            type: "text",
            name: "id",
            label: "ID",
            placeholder: "meu-link",
            changeProp: 1,
          },
          {
            type: "text",
            name: "href",
            label: "URL do Link",
            placeholder: "https://exemplo.com",
            changeProp: 1,
          },
          {
            type: "select",
            name: "target",
            label: "Abrir em",
            options: [
              { value: "_self", name: "Mesma aba" },
              { value: "_blank", name: "Nova aba" },
              { value: "_parent", name: "Janela pai" },
              { value: "_top", name: "Janela principal" },
            ],
            changeProp: 1,
          },
          {
            type: "text",
            name: "title",
            label: "Título (Tooltip)",
            placeholder: "Descrição do link",
            changeProp: 1,
          },
          {
            type: "select",
            name: "rel",
            label: "Rel",
            options: [
              { value: "", name: "Nenhum" },
              { value: "nofollow", name: "No Follow" },
              { value: "noopener", name: "No Opener" },
              { value: "noreferrer", name: "No Referrer" },
            ],
            changeProp: 1,
          },
          {
            type: "textarea",
            name: "custom-css",
            label: "CSS Personalizado",
            placeholder: ".minha-classe { color: red; }",
            changeProp: 1,
          },
        ],
      },
      init() {
        // Aplicar CSS personalizado quando o trait for alterado
        (this as any).on("change:custom-css", (_model: any, value: string) => {
          if (value && value.trim()) {
            const componentId = (this as any).getId();
            const customStyleId = `custom-css-${componentId}`;

            // Remover estilo anterior se existir
            const existingStyle = document.getElementById(customStyleId);
            if (existingStyle) {
              existingStyle.remove();
            }

            // Adicionar novo estilo
            const style = document.createElement("style");
            style.id = customStyleId;
            style.textContent = `#${componentId} { ${value} }`;
            document.head.appendChild(style);
          }
        });
      },
    },
  });

  // Traits para botão customizado
  editor.DomComponents.addType("custom-button", {
    extend: "button",
    model: {
      defaults: {
        tagName: "button",
        classes: ["custom-button"],
        traits: [
          {
            type: "text",
            name: "id",
            label: "ID",
            placeholder: "meu-botao",
            changeProp: 1,
          },
          {
            type: "text",
            name: "title",
            label: "Título",
            placeholder: "Título do botão",
            changeProp: 1,
          },
          {
            type: "text",
            name: "button-text",
            label: "Texto do Botão",
            placeholder: "Clique Aqui",
            changeProp: 1,
          },
          {
            type: "select",
            name: "button-style",
            label: "Estilo do Botão",
            changeProp: 1,
            options: [
              { value: "default", name: "Padrão (Azul)" },
              { value: "success", name: "Sucesso (Verde)" },
              { value: "danger", name: "Perigo (Vermelho)" },
              { value: "outline", name: "Contorno" },
              { value: "warning", name: "Aviso (Amarelo)" },
              { value: "info", name: "Info (Ciano)" },
            ],
          },
          {
            type: "select",
            name: "button-size",
            label: "Tamanho do Botão",
            changeProp: 1,
            options: [
              { value: "small", name: "Pequeno" },
              { value: "medium", name: "Médio" },
              { value: "large", name: "Grande" },
              { value: "xlarge", name: "Extra Grande" },
            ],
          },
          {
            type: "select",
            name: "button-type",
            label: "Tipo de Ação",
            changeProp: 1,
            options: [
              { value: "link", name: "Link" },
              { value: "submit", name: "Enviar Formulário" },
              { value: "custom", name: "JavaScript Personalizado" },
              { value: "scroll", name: "Rolar para Seção" },
              { value: "modal", name: "Abrir Modal" },
              { value: "copy", name: "Copiar Texto" },
            ],
          },
          {
            type: "text",
            name: "href",
            label: "URL (se tipo Link)",
            placeholder: "https://exemplo.com",
            changeProp: 1,
          },
          {
            type: "text",
            name: "onclick",
            label: "JavaScript Personalizado",
            placeholder: 'alert("Olá!")',
            changeProp: 1,
          },
          {
            type: "checkbox",
            name: "disabled",
            label: "Desabilitado",
            changeProp: 1,
          },
          {
            type: "textarea",
            name: "custom-css",
            label: "CSS Personalizado",
            placeholder: ".minha-classe { color: red; }",
            changeProp: 1,
          },
        ],
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

        // Aplicar ações quando os traits forem alterados
        (this as any).on(
          "change:button-type change:href change:onclick change:button-text change:button-style change:button-size change:disabled",
          () => {
            const buttonType = (this as any).get("button-type");
            const href = (this as any).get("href");
            const onclick = (this as any).get("onclick");
            const buttonText = (this as any).get("button-text");
            const buttonStyle = (this as any).get("button-style");
            const buttonSize = (this as any).get("button-size");
            const disabled = (this as any).get("disabled");

            let action = "";
            switch (buttonType) {
              case "link":
                action = `window.location.href = '${href}'`;
                break;
              case "custom":
                action = onclick;
                break;
              case "submit":
                action = `this.closest('form')?.submit()`;
                break;
            }
            if (action) {
              (this as any).set("onclick", action);
            }

            // Aplicar texto do botão
            if (buttonText) {
              const view = (this as any).getView();
              if (view) {
                const textElement = view.el.querySelector(".button-text");
                if (textElement) {
                  textElement.textContent = buttonText;
                }
              }
            }

            // Aplicar classes de estilo e tamanho
            const view = (this as any).getView();
            if (view) {
              const el = view.el;
              el.classList.remove(
                "success",
                "danger",
                "outline",
                "warning",
                "info"
              );
              el.classList.remove("small", "medium", "large", "xlarge");
              if (buttonStyle && buttonStyle !== "default") {
                el.classList.add(buttonStyle);
              }
              if (buttonSize && buttonSize !== "medium") {
                el.classList.add(buttonSize);
              }
              if (disabled) {
                el.disabled = true;
                el.classList.add("disabled");
              } else {
                el.disabled = false;
                el.classList.remove("disabled");
              }
            }
          }
        );
      },
    },
  });

  // Traits para imagem customizada
  editor.DomComponents.addType("custom-image", {
    extend: "image",
    model: {
      defaults: {
        tagName: "img",
        classes: ["custom-image"],
        traits: [
          {
            type: "text",
            name: "id",
            label: "ID",
            placeholder: "minha-imagem",
            changeProp: 1,
          },
          {
            type: "text",
            name: "title",
            label: "Título",
            placeholder: "Título da imagem",
            changeProp: 1,
          },
          {
            type: "text",
            name: "src",
            label: "URL da Imagem",
            placeholder: "https://exemplo.com/imagem.jpg",
            changeProp: 1,
          },
          {
            type: "text",
            name: "alt",
            label: "Texto Alternativo",
            placeholder: "Descrição da imagem",
            changeProp: 1,
          },
          {
            type: "text",
            name: "href",
            label: "Link (opcional)",
            placeholder: "https://exemplo.com",
            changeProp: 1,
          },
          {
            type: "select",
            name: "target",
            label: "Abrir Link em",
            changeProp: 1,
            options: [
              { value: "_self", name: "Mesma Aba" },
              { value: "_blank", name: "Nova Aba" },
            ],
          },
          {
            type: "select",
            name: "image-size",
            label: "Tamanho da Imagem",
            changeProp: 1,
            options: [
              { value: "small", name: "Pequena (200px)" },
              { value: "medium", name: "Média (400px)" },
              { value: "large", name: "Grande (600px)" },
              { value: "full", name: "Largura Completa" },
            ],
          },
          {
            type: "select",
            name: "image-style",
            label: "Estilo da Imagem",
            changeProp: 1,
            options: [
              { value: "default", name: "Padrão" },
              { value: "rounded", name: "Arredondada" },
              { value: "circle", name: "Circular" },
              { value: "shadow", name: "Com Sombra" },
            ],
          },
          {
            type: "textarea",
            name: "custom-css",
            label: "CSS Personalizado",
            placeholder: ".minha-classe { border: 2px solid red; }",
            changeProp: 1,
          },
        ],
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

        // Aplicar mudanças de imagem
        (this as any).on(
          "change:src change:alt change:image-size change:image-style",
          () => {
            const src = (this as any).get("src");
            const alt = (this as any).get("alt");
            const imageSize = (this as any).get("image-size");
            const imageStyle = (this as any).get("image-style");

            const view = (this as any).getView();
            if (view) {
              const el = view.el;
              if (src) el.src = src;
              if (alt) el.alt = alt;

              // Aplicar classes de tamanho e estilo
              el.classList.remove("small", "medium", "large", "full");
              el.classList.remove("rounded", "circle", "shadow");
              if (imageSize && imageSize !== "medium")
                el.classList.add(imageSize);
              if (imageStyle && imageStyle !== "default")
                el.classList.add(imageStyle);
            }
          }
        );
      },
    },
  });

  // Traits para heading customizado
  editor.DomComponents.addType("custom-heading", {
    extend: "text",
    model: {
      defaults: {
        tagName: "h2",
        classes: ["heading-widget"],
        traits: [
          {
            type: "text",
            name: "id",
            label: "ID",
            placeholder: "meu-titulo",
            changeProp: 1,
          },
          {
            type: "text",
            name: "title",
            label: "Título",
            placeholder: "Título do elemento",
            changeProp: 1,
          },
          {
            type: "text",
            name: "heading-text",
            label: "Texto do Título",
            placeholder: "Seu Título Aqui",
            changeProp: 1,
          },
          {
            type: "select",
            name: "heading-level",
            label: "Nível do Título",
            changeProp: 1,
            options: [
              { value: "h1", name: "H1 (Principal)" },
              { value: "h2", name: "H2 (Secundário)" },
              { value: "h3", name: "H3 (Terciário)" },
              { value: "h4", name: "H4" },
              { value: "h5", name: "H5" },
              { value: "h6", name: "H6" },
            ],
          },
          {
            type: "select",
            name: "text-align",
            label: "Alinhamento",
            changeProp: 1,
            options: [
              { value: "left", name: "Esquerda" },
              { value: "center", name: "Centro" },
              { value: "right", name: "Direita" },
              { value: "justify", name: "Justificado" },
            ],
          },
          {
            type: "select",
            name: "heading-style",
            label: "Estilo do Título",
            changeProp: 1,
            options: [
              { value: "default", name: "Padrão" },
              { value: "bold", name: "Negrito" },
              { value: "italic", name: "Itálico" },
              { value: "underline", name: "Sublinhado" },
            ],
          },
          {
            type: "text",
            name: "text-color",
            label: "Cor do Texto",
            placeholder: "#333333",
            changeProp: 1,
          },
          {
            type: "textarea",
            name: "custom-css",
            label: "CSS Personalizado",
            placeholder: ".minha-classe { font-size: 2rem; }",
            changeProp: 1,
          },
        ],
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

        // Aplicar mudanças de heading
        (this as any).on(
          "change:heading-text change:heading-level change:text-align change:heading-style change:text-color",
          () => {
            const headingText = (this as any).get("heading-text");
            const headingLevel = (this as any).get("heading-level");
            const textAlign = (this as any).get("text-align");
            const headingStyle = (this as any).get("heading-style");
            const textColor = (this as any).get("text-color");

            const view = (this as any).getView();
            if (view) {
              const el = view.el;
              if (headingText) el.textContent = headingText;
              if (headingLevel) el.tagName = headingLevel.toUpperCase();
              if (textAlign) el.style.textAlign = textAlign;
              if (textColor) el.style.color = textColor;

              // Aplicar classes de estilo
              el.classList.remove("bold", "italic", "underline");
              if (headingStyle && headingStyle !== "default")
                el.classList.add(headingStyle);
            }
          }
        );
      },
    },
  });

  // Traits para texto customizado
  editor.DomComponents.addType("custom-text", {
    extend: "text",
    model: {
      defaults: {
        tagName: "div",
        classes: ["text-block"],
        traits: [
          {
            type: "text",
            name: "id",
            label: "ID",
            placeholder: "meu-texto",
            changeProp: 1,
          },
          {
            type: "text",
            name: "title",
            label: "Título",
            placeholder: "Título do elemento",
            changeProp: 1,
          },
          {
            type: "text",
            name: "text-title",
            label: "Título do Texto",
            placeholder: "Título Personalizável",
            changeProp: 1,
          },
          {
            type: "textarea",
            name: "text-content",
            label: "Conteúdo do Texto",
            placeholder: "Este é um texto de exemplo...",
            changeProp: 1,
          },
          {
            type: "select",
            name: "text-align",
            label: "Alinhamento",
            changeProp: 1,
            options: [
              { value: "left", name: "Esquerda" },
              { value: "center", name: "Centro" },
              { value: "right", name: "Direita" },
              { value: "justify", name: "Justificado" },
            ],
          },
          {
            type: "select",
            name: "title-level",
            label: "Nível do Título",
            changeProp: 1,
            options: [
              { value: "h1", name: "H1 (Principal)" },
              { value: "h2", name: "H2 (Secundário)" },
              { value: "h3", name: "H3 (Terciário)" },
              { value: "h4", name: "H4" },
              { value: "h5", name: "H5" },
              { value: "h6", name: "H6" },
            ],
          },
          {
            type: "text",
            name: "title-color",
            label: "Cor do Título",
            placeholder: "#333333",
            changeProp: 1,
          },
          {
            type: "text",
            name: "content-color",
            label: "Cor do Conteúdo",
            placeholder: "#666666",
            changeProp: 1,
          },
          {
            type: "textarea",
            name: "custom-css",
            label: "CSS Personalizado",
            placeholder: ".minha-classe { font-size: 1.2rem; }",
            changeProp: 1,
          },
        ],
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

        // Aplicar mudanças de texto
        (this as any).on(
          "change:text-title change:text-content change:text-align change:title-level change:title-color change:content-color",
          () => {
            const textTitle = (this as any).get("text-title");
            const textContent = (this as any).get("text-content");
            const textAlign = (this as any).get("text-align");
            const titleLevel = (this as any).get("title-level");
            const titleColor = (this as any).get("title-color");
            const contentColor = (this as any).get("content-color");

            const view = (this as any).getView();
            if (view) {
              const el = view.el;
              if (textAlign) el.style.textAlign = textAlign;

              const titleEl = el.querySelector(".text-title");
              if (titleEl) {
                if (textTitle) titleEl.textContent = textTitle;
                if (titleLevel) titleEl.tagName = titleLevel.toUpperCase();
                if (titleColor) titleEl.style.color = titleColor;
              }

              const contentEl = el.querySelector(".text-content");
              if (contentEl) {
                if (textContent) contentEl.textContent = textContent;
                if (contentColor) contentEl.style.color = contentColor;
              }
            }
          }
        );
      },
    },
  });

  // Traits para container customizado
  editor.DomComponents.addType("custom-container", {
    extend: "text",
    model: {
      defaults: {
        tagName: "div",
        classes: ["container-widget"],
        traits: [
          {
            type: "text",
            name: "id",
            label: "ID",
            placeholder: "meu-container",
            changeProp: 1,
          },
          {
            type: "text",
            name: "title",
            label: "Título",
            placeholder: "Título do container",
            changeProp: 1,
          },
          {
            type: "select",
            name: "container-width",
            label: "Largura do Container",
            changeProp: 1,
            options: [
              { value: "full", name: "Largura Completa" },
              { value: "large", name: "Grande (1200px)" },
              { value: "medium", name: "Médio (960px)" },
              { value: "small", name: "Pequeno (768px)" },
            ],
          },
          {
            type: "select",
            name: "container-align",
            label: "Alinhamento",
            changeProp: 1,
            options: [
              { value: "left", name: "Esquerda" },
              { value: "center", name: "Centro" },
              { value: "right", name: "Direita" },
            ],
          },
          {
            type: "text",
            name: "background-color",
            label: "Cor de Fundo",
            placeholder: "#ffffff",
            changeProp: 1,
          },
          {
            type: "text",
            name: "padding",
            label: "Espaçamento Interno",
            placeholder: "20px",
            changeProp: 1,
          },
          {
            type: "text",
            name: "margin",
            label: "Margem Externa",
            placeholder: "0 auto",
            changeProp: 1,
          },
          {
            type: "textarea",
            name: "custom-css",
            label: "CSS Personalizado",
            placeholder: ".minha-classe { border: 1px solid #ccc; }",
            changeProp: 1,
          },
        ],
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

        // Aplicar mudanças de container
        (this as any).on(
          "change:container-width change:container-align change:background-color change:padding change:margin",
          () => {
            const containerWidth = (this as any).get("container-width");
            const containerAlign = (this as any).get("container-align");
            const backgroundColor = (this as any).get("background-color");
            const padding = (this as any).get("padding");
            const margin = (this as any).get("margin");

            const view = (this as any).getView();
            if (view) {
              const el = view.el;

              // Aplicar estilos inline
              if (backgroundColor) {
                el.style.backgroundColor = backgroundColor;
                el.setAttribute("data-bg-color", backgroundColor);
              }
              if (padding) {
                el.style.padding = padding;
                el.setAttribute("data-padding", padding);
              }
              if (margin) {
                el.style.margin = margin;
                el.setAttribute("data-margin", margin);
              }
              if (containerAlign) {
                el.style.textAlign = containerAlign;
                el.setAttribute("data-align", containerAlign);
              }

              // Aplicar classes de largura
              el.classList.remove("full", "large", "medium", "small");
              if (containerWidth && containerWidth !== "full") {
                el.classList.add(containerWidth);
              } else {
                el.classList.add("full");
              }

              // Aplicar largura máxima baseada na classe
              if (containerWidth === "large") {
                el.style.maxWidth = "1200px";
                el.style.margin = margin || "0 auto";
              } else if (containerWidth === "medium") {
                el.style.maxWidth = "960px";
                el.style.margin = margin || "0 auto";
              } else if (containerWidth === "small") {
                el.style.maxWidth = "768px";
                el.style.margin = margin || "0 auto";
              } else {
                el.style.maxWidth = "100%";
              }
            }
          }
        );
      },
    },
  });

  // Traits para seção customizada
  editor.DomComponents.addType("custom-section", {
    extend: "text",
    model: {
      defaults: {
        tagName: "section",
        classes: ["custom-section"],
        traits: [
          {
            type: "text",
            name: "id",
            label: "ID",
            placeholder: "minha-secao",
            changeProp: 1,
          },
          {
            type: "text",
            name: "title",
            label: "Título",
            placeholder: "Título da seção",
            changeProp: 1,
          },
          {
            type: "text",
            name: "section-title",
            label: "Título da Seção",
            placeholder: "Título da Seção",
            changeProp: 1,
          },
          {
            type: "textarea",
            name: "section-description",
            label: "Descrição da Seção",
            placeholder: "Esta é uma descrição da seção...",
            changeProp: 1,
          },
          {
            type: "select",
            name: "section-style",
            label: "Estilo da Seção",
            changeProp: 1,
            options: [
              { value: "default", name: "Padrão" },
              { value: "hero", name: "Hero (Destaque)" },
              { value: "card", name: "Card" },
              { value: "minimal", name: "Minimalista" },
            ],
          },
          {
            type: "text",
            name: "background-color",
            label: "Cor de Fundo",
            placeholder: "#f8f9fa",
            changeProp: 1,
          },
          {
            type: "text",
            name: "text-color",
            label: "Cor do Texto",
            placeholder: "#333333",
            changeProp: 1,
          },
          {
            type: "select",
            name: "text-align",
            label: "Alinhamento do Texto",
            changeProp: 1,
            options: [
              { value: "left", name: "Esquerda" },
              { value: "center", name: "Centro" },
              { value: "right", name: "Direita" },
            ],
          },
          {
            type: "text",
            name: "padding",
            label: "Espaçamento Interno",
            placeholder: "60px 20px",
            changeProp: 1,
          },
          {
            type: "textarea",
            name: "custom-css",
            label: "CSS Personalizado",
            placeholder: ".minha-classe { border-top: 1px solid #eee; }",
            changeProp: 1,
          },
        ],
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

        // Aplicar mudanças de seção
        (this as any).on(
          "change:section-title change:section-description change:section-style change:background-color change:text-color change:text-align change:padding",
          () => {
            const sectionTitle = (this as any).get("section-title");
            const sectionDescription = (this as any).get("section-description");
            const sectionStyle = (this as any).get("section-style");
            const backgroundColor = (this as any).get("background-color");
            const textColor = (this as any).get("text-color");
            const textAlign = (this as any).get("text-align");
            const padding = (this as any).get("padding");

            const view = (this as any).getView();
            if (view) {
              const el = view.el;
              if (backgroundColor) el.style.backgroundColor = backgroundColor;
              if (textColor) el.style.color = textColor;
              if (textAlign) el.style.textAlign = textAlign;
              if (padding) el.style.padding = padding;

              // Aplicar classes de estilo
              el.classList.remove("default", "hero", "card", "minimal");
              if (sectionStyle && sectionStyle !== "default")
                el.classList.add(sectionStyle);

              const titleEl = el.querySelector(".section-title");
              if (titleEl && sectionTitle) titleEl.textContent = sectionTitle;

              const descEl = el.querySelector(".section-description");
              if (descEl && sectionDescription)
                descEl.textContent = sectionDescription;
            }
          }
        );
      },
    },
  });

  // Traits para vídeo customizado
  editor.DomComponents.addType("custom-video", {
    extend: "text",
    model: {
      defaults: {
        tagName: "div",
        classes: ["video-widget"],
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
            changeProp: 1,
            options: [
              { value: "youtube", name: "YouTube" },
              { value: "vimeo", name: "Vimeo" },
              { value: "file", name: "Arquivo Local" },
              { value: "embed", name: "Código Embed" },
            ],
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
            changeProp: 1,
            options: [
              { value: "small", name: "Pequeno (400px)" },
              { value: "medium", name: "Médio (600px)" },
              { value: "large", name: "Grande (800px)" },
              { value: "full", name: "Largura Completa" },
            ],
          },
          {
            type: "select",
            name: "video-aspect",
            label: "Proporção",
            changeProp: 1,
            options: [
              { value: "16:9", name: "16:9 (Widescreen)" },
              { value: "4:3", name: "4:3 (Padrão)" },
              { value: "1:1", name: "1:1 (Quadrado)" },
            ],
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
              if (videoAspect)
                el.classList.add(`aspect-${videoAspect.replace(":", "-")}`);

              // Aqui você pode implementar a lógica para renderizar o vídeo baseado no tipo
              // Por exemplo, gerar iframe para YouTube/Vimeo ou elemento video para arquivos locais
            }
          }
        );
      },
    },
  });

  // Traits para tabs customizado
  editor.DomComponents.addType("custom-tabs", {
    extend: "text",
    model: {
      defaults: {
        tagName: "div",
        classes: ["tabs-widget"],
        traits: [
          {
            type: "text",
            name: "id",
            label: "ID",
            placeholder: "minhas-abas",
            changeProp: 1,
          },
          {
            type: "text",
            name: "title",
            label: "Título",
            placeholder: "Título das abas",
            changeProp: 1,
          },
          {
            type: "text",
            name: "tab-title-1",
            label: "Título da Aba 1",
            placeholder: "Aba 1",
            changeProp: 1,
          },
          {
            type: "textarea",
            name: "tab-content-1",
            label: "Conteúdo da Aba 1",
            placeholder: "Conteúdo da primeira aba...",
            changeProp: 1,
          },
          {
            type: "text",
            name: "tab-title-2",
            label: "Título da Aba 2",
            placeholder: "Aba 2",
            changeProp: 1,
          },
          {
            type: "textarea",
            name: "tab-content-2",
            label: "Conteúdo da Aba 2",
            placeholder: "Conteúdo da segunda aba...",
            changeProp: 1,
          },
          {
            type: "text",
            name: "tab-title-3",
            label: "Título da Aba 3",
            placeholder: "Aba 3",
            changeProp: 1,
          },
          {
            type: "textarea",
            name: "tab-content-3",
            label: "Conteúdo da Aba 3",
            placeholder: "Conteúdo da terceira aba...",
            changeProp: 1,
          },
          {
            type: "select",
            name: "tabs-style",
            label: "Estilo das Abas",
            changeProp: 1,
            options: [
              { value: "default", name: "Padrão" },
              { value: "pills", name: "Pills" },
              { value: "underline", name: "Sublinhado" },
              { value: "card", name: "Estilo Card" },
            ],
          },
          {
            type: "select",
            name: "tabs-position",
            label: "Posição das Abas",
            changeProp: 1,
            options: [
              { value: "top", name: "Acima" },
              { value: "left", name: "Esquerda" },
              { value: "right", name: "Direita" },
            ],
          },
          {
            type: "text",
            name: "active-tab",
            label: "Aba Ativa Inicial",
            placeholder: "tab1",
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

        // JavaScript para tabs
        const initTabs = () => {
          const view = (this as any).getView();
          if (view) {
            const el = view.el;
            const tabButtons = el.querySelectorAll(".tab-button");
            const tabPanes = el.querySelectorAll(".tab-pane");

            // Garantir que os botões sejam clicáveis no editor
            tabButtons.forEach((button: HTMLElement) => {
              button.style.pointerEvents = "auto";
              button.style.zIndex = "10";
              button.style.position = "relative";
            });

            // Remover listeners anteriores para evitar duplicação
            tabButtons.forEach((button: HTMLElement) => {
              const newButton = button.cloneNode(true) as HTMLElement;
              newButton.style.pointerEvents = "auto";
              newButton.style.zIndex = "10";
              newButton.style.position = "relative";
              button.parentNode?.replaceChild(newButton, button);
            });

            // Adicionar listeners aos novos elementos
            const newTabButtons = el.querySelectorAll(".tab-button");
            newTabButtons.forEach((button: HTMLElement) => {
              button.addEventListener(
                "click",
                (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  e.stopImmediatePropagation();

                  const targetTab = button.getAttribute("data-tab");
                  console.log("Tab clicked:", targetTab);

                  // Remover active de todos os botões
                  newTabButtons.forEach((btn: HTMLElement) =>
                    btn.classList.remove("active")
                  );

                  // Remover active de todos os painéis
                  tabPanes.forEach((pane: HTMLElement) =>
                    pane.classList.remove("active")
                  );

                  // Adicionar active ao botão clicado
                  button.classList.add("active");

                  // Adicionar active ao painel correspondente
                  const targetPane = el.querySelector(
                    `[data-content="${targetTab}"]`
                  );
                  if (targetPane) {
                    targetPane.classList.add("active");
                    console.log("Tab pane activated:", targetTab);
                  }
                },
                { passive: false, capture: true }
              );

              // Adicionar também mousedown para garantir que funcione
              button.addEventListener(
                "mousedown",
                (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  e.stopImmediatePropagation();
                },
                { passive: false, capture: true }
              );
            });
          }
        };

        // Inicializar tabs
        initTabs();

        // Aplicar mudanças de tabs
        (this as any).on(
          "change:tab-title-1 change:tab-content-1 change:tab-title-2 change:tab-content-2 change:tab-title-3 change:tab-content-3 change:tabs-style change:tabs-position change:active-tab",
          () => {
            const title1 = (this as any).get("tab-title-1");
            const content1 = (this as any).get("tab-content-1");
            const title2 = (this as any).get("tab-title-2");
            const content2 = (this as any).get("tab-content-2");
            const title3 = (this as any).get("tab-title-3");
            const content3 = (this as any).get("tab-content-3");
            const style = (this as any).get("tabs-style");
            const position = (this as any).get("tabs-position");
            const activeTab = (this as any).get("active-tab");

            const view = (this as any).getView();
            if (view) {
              const el = view.el;

              // Aplicar classes de estilo e posição
              el.classList.remove("default", "pills", "underline", "card");
              el.classList.remove("top", "left", "right");
              if (style && style !== "default") el.classList.add(style);
              if (position && position !== "top") el.classList.add(position);

              // Atualizar títulos e conteúdos
              const tabButtons = el.querySelectorAll(".tab-button span");
              const tabContents = el.querySelectorAll(
                ".tab-content-wrapper h3"
              );

              if (tabButtons[0] && title1) tabButtons[0].textContent = title1;
              if (tabContents[0] && content1)
                tabContents[0].textContent = content1;
              if (tabButtons[1] && title2) tabButtons[1].textContent = title2;
              if (tabContents[1] && content2)
                tabContents[1].textContent = content2;
              if (tabButtons[2] && title3) tabButtons[2].textContent = title3;
              if (tabContents[2] && content3)
                tabContents[2].textContent = content3;

              // Re-inicializar tabs após mudanças
              setTimeout(initTabs, 100);
            }
          }
        );
      },
    },
  });

  // Traits para counter customizado
  editor.DomComponents.addType("custom-counter", {
    extend: "text",
    model: {
      defaults: {
        tagName: "div",
        classes: ["counter-widget"],
        traits: [
          {
            type: "text",
            name: "id",
            label: "ID",
            placeholder: "meu-contador",
            changeProp: 1,
          },
          {
            type: "text",
            name: "title",
            label: "Título",
            placeholder: "Título do contador",
            changeProp: 1,
          },
          {
            type: "text",
            name: "counter-title",
            label: "Título do Contador",
            placeholder: "Contador Interativo",
            changeProp: 1,
          },
          {
            type: "number",
            name: "initial-value",
            label: "Valor Inicial",
            placeholder: "0",
            changeProp: 1,
          },
          {
            type: "number",
            name: "min-value",
            label: "Valor Mínimo",
            placeholder: "0",
            changeProp: 1,
          },
          {
            type: "number",
            name: "max-value",
            label: "Valor Máximo",
            placeholder: "100",
            changeProp: 1,
          },
          {
            type: "number",
            name: "step-value",
            label: "Incremento/Decremento",
            placeholder: "1",
            changeProp: 1,
          },
          {
            type: "select",
            name: "counter-style",
            label: "Estilo do Contador",
            changeProp: 1,
            options: [
              { value: "default", name: "Padrão" },
              { value: "minimal", name: "Minimalista" },
              { value: "card", name: "Estilo Card" },
              { value: "circular", name: "Circular" },
            ],
          },
          {
            type: "select",
            name: "counter-size",
            label: "Tamanho do Contador",
            changeProp: 1,
            options: [
              { value: "small", name: "Pequeno" },
              { value: "medium", name: "Médio" },
              { value: "large", name: "Grande" },
            ],
          },
          {
            type: "checkbox",
            name: "show-reset",
            label: "Mostrar Botão Reset",
            changeProp: 1,
          },
          {
            type: "checkbox",
            name: "show-decrease",
            label: "Mostrar Botão Diminuir",
            changeProp: 1,
          },
          {
            type: "checkbox",
            name: "show-increase",
            label: "Mostrar Botão Aumentar",
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

        // JavaScript para counter
        const initCounter = () => {
          const view = (this as any).getView();
          if (view) {
            const el = view.el;
            const buttons = el.querySelectorAll(".counter-btn");
            const valueElement = el.querySelector(
              ".counter-value"
            ) as HTMLElement;

            let currentValue = parseInt(el.getAttribute("data-counter") || "0");
            if (valueElement)
              valueElement.textContent = currentValue.toString();

            buttons.forEach((button: HTMLElement) => {
              button.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();

                const action = button.getAttribute("data-action");
                if (!action) return;

                const minValue = parseInt(
                  el.getAttribute("data-min-value") || "0"
                );
                const maxValue = parseInt(
                  el.getAttribute("data-max-value") || "100"
                );

                switch (action) {
                  case "increase":
                    if (currentValue < maxValue) {
                      currentValue++;
                    }
                    break;
                  case "decrease":
                    if (currentValue > minValue) {
                      currentValue--;
                    }
                    break;
                  case "reset":
                    currentValue = parseInt(
                      el.getAttribute("data-initial-value") || "0"
                    );
                    break;
                }

                if (valueElement)
                  valueElement.textContent = currentValue.toString();
                el.setAttribute("data-counter", currentValue.toString());
              });
            });
          }
        };

        // Inicializar counter
        initCounter();

        // Aplicar mudanças de counter
        (this as any).on(
          "change:counter-title change:initial-value change:counter-style change:counter-size change:show-reset change:show-decrease change:show-increase change:min-value change:max-value",
          () => {
            const counterTitle = (this as any).get("counter-title");
            const initialValue = (this as any).get("initial-value");
            const style = (this as any).get("counter-style");
            const size = (this as any).get("counter-size");
            const showReset = (this as any).get("show-reset");
            const showDecrease = (this as any).get("show-decrease");
            const showIncrease = (this as any).get("show-increase");
            const minValue = (this as any).get("min-value");
            const maxValue = (this as any).get("max-value");

            const view = (this as any).getView();
            if (view) {
              const el = view.el;

              // Aplicar classes de estilo e tamanho
              el.classList.remove("default", "minimal", "card", "circular");
              el.classList.remove("small", "medium", "large");
              if (style && style !== "default") el.classList.add(style);
              if (size && size !== "medium") el.classList.add(size);

              // Atualizar título e valor inicial
              const titleEl = el.querySelector(".counter-title");
              const valueEl = el.querySelector(".counter-value");
              if (titleEl && counterTitle) titleEl.textContent = counterTitle;
              if (valueEl && initialValue) {
                valueEl.textContent = initialValue.toString();
                el.setAttribute("data-counter", initialValue.toString());
                el.setAttribute("data-initial-value", initialValue.toString());
              }

              // Atualizar valores min/max
              if (minValue)
                el.setAttribute("data-min-value", minValue.toString());
              if (maxValue)
                el.setAttribute("data-max-value", maxValue.toString());

              // Mostrar/ocultar botões
              const resetBtn = el.querySelector(".counter-reset");
              const decreaseBtn = el.querySelector(".counter-decrease");
              const increaseBtn = el.querySelector(".counter-increase");

              if (resetBtn) resetBtn.style.display = showReset ? "" : "none";
              if (decreaseBtn)
                decreaseBtn.style.display = showDecrease ? "" : "none";
              if (increaseBtn)
                increaseBtn.style.display = showIncrease ? "" : "none";

              // Re-inicializar counter após mudanças
              setTimeout(initCounter, 100);
            }
          }
        );
      },
    },
  });

  // Traits para testimonial customizado
  editor.DomComponents.addType("custom-testimonial", {
    extend: "text",
    model: {
      defaults: {
        tagName: "div",
        classes: ["testimonial-widget"],
        traits: [
          {
            type: "text",
            name: "id",
            label: "ID",
            placeholder: "meus-depoimentos",
            changeProp: 1,
          },
          {
            type: "text",
            name: "title",
            label: "Título",
            placeholder: "Título dos depoimentos",
            changeProp: 1,
          },
          {
            type: "text",
            name: "testimonial-title",
            label: "Título da Seção",
            placeholder: "O que nossos clientes dizem",
            changeProp: 1,
          },
          {
            type: "text",
            name: "testimonial-subtitle",
            label: "Subtítulo da Seção",
            placeholder:
              "Depoimentos reais de pessoas que confiam em nossos serviços",
            changeProp: 1,
          },
          {
            type: "select",
            name: "testimonial-layout",
            label: "Layout dos Depoimentos",
            changeProp: 1,
            options: [
              { value: "grid", name: "Grid (3 colunas)" },
              { value: "carousel", name: "Carrossel" },
              { value: "list", name: "Lista Vertical" },
              { value: "single", name: "Depoimento Único" },
            ],
          },
          {
            type: "select",
            name: "testimonial-style",
            label: "Estilo dos Depoimentos",
            changeProp: 1,
            options: [
              { value: "default", name: "Padrão" },
              { value: "card", name: "Estilo Card" },
              { value: "minimal", name: "Minimalista" },
              { value: "quote", name: "Estilo Citação" },
            ],
          },
          {
            type: "checkbox",
            name: "show-ratings",
            label: "Mostrar Avaliações (Estrelas)",
            changeProp: 1,
          },
          {
            type: "checkbox",
            name: "show-avatars",
            label: "Mostrar Avatares",
            changeProp: 1,
          },
          {
            type: "checkbox",
            name: "show-quotes",
            label: "Mostrar Ícones de Citação",
            changeProp: 1,
          },
          {
            type: "text",
            name: "author-1-name",
            label: "Nome do Autor 1",
            placeholder: "Maria Silva",
            changeProp: 1,
          },
          {
            type: "text",
            name: "author-1-role",
            label: "Cargo do Autor 1",
            placeholder: "CEO, TechCorp",
            changeProp: 1,
          },
          {
            type: "text",
            name: "author-1-avatar",
            label: "Avatar do Autor 1",
            placeholder:
              "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
            changeProp: 1,
          },
          {
            type: "textarea",
            name: "testimonial-1-text",
            label: "Texto do Depoimento 1",
            placeholder:
              "Excelente serviço! A equipe foi muito profissional...",
            changeProp: 1,
          },
          {
            type: "number",
            name: "testimonial-1-rating",
            label: "Avaliação do Depoimento 1 (1-5)",
            placeholder: "5",
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

        // Aplicar mudanças de testimonial
        (this as any).on(
          "change:testimonial-title change:testimonial-subtitle change:testimonial-layout change:testimonial-style change:show-ratings change:show-avatars change:show-quotes change:author-1-name change:author-1-role change:author-1-avatar change:testimonial-1-text change:testimonial-1-rating",
          () => {
            const testimonialTitle = (this as any).get("testimonial-title");
            const testimonialSubtitle = (this as any).get(
              "testimonial-subtitle"
            );
            const layout = (this as any).get("testimonial-layout");
            const style = (this as any).get("testimonial-style");
            const showRatings = (this as any).get("show-ratings");
            const showAvatars = (this as any).get("show-avatars");
            const showQuotes = (this as any).get("show-quotes");
            const author1Name = (this as any).get("author-1-name");
            const author1Role = (this as any).get("author-1-role");
            const author1Avatar = (this as any).get("author-1-avatar");
            const testimonial1Text = (this as any).get("testimonial-1-text");
            const testimonial1Rating = (this as any).get(
              "testimonial-1-rating"
            );

            const view = (this as any).getView();
            if (view) {
              const el = view.el;

              // Aplicar classes de layout e estilo
              el.classList.remove("grid", "carousel", "list", "single");
              el.classList.remove("default", "card", "minimal", "quote");
              if (layout && layout !== "grid") el.classList.add(layout);
              if (style && style !== "default") el.classList.add(style);

              // Atualizar título e subtítulo
              const titleEl = el.querySelector(".testimonial-title");
              const subtitleEl = el.querySelector(".testimonial-subtitle");
              if (titleEl && testimonialTitle)
                titleEl.textContent = testimonialTitle;
              if (subtitleEl && testimonialSubtitle)
                subtitleEl.textContent = testimonialSubtitle;

              // Atualizar primeiro depoimento
              const firstCard = el.querySelector(".testimonial-card");
              if (firstCard) {
                const textEl = firstCard.querySelector(".testimonial-text");
                const nameEl = firstCard.querySelector(".author-name");
                const roleEl = firstCard.querySelector(".author-role");
                const avatarEl = firstCard.querySelector(".author-avatar img");
                const ratingEl = firstCard.querySelector(".rating");

                if (textEl && testimonial1Text)
                  textEl.textContent = testimonial1Text;
                if (nameEl && author1Name) nameEl.textContent = author1Name;
                if (roleEl && author1Role) roleEl.textContent = author1Role;
                if (avatarEl && author1Avatar) avatarEl.src = author1Avatar;

                // Mostrar/ocultar elementos
                if (ratingEl)
                  ratingEl.style.display = showRatings ? "" : "none";
                if (avatarEl)
                  avatarEl.style.display = showAvatars ? "" : "none";
                const quoteIcon = firstCard.querySelector(".quote-icon");
                if (quoteIcon)
                  quoteIcon.style.display = showQuotes ? "" : "none";
              }
            }
          }
        );
      },
    },
  });

  // Traits para Bootstrap Grid
  editor.DomComponents.addType("custom-bootstrap-grid", {
    extend: "text",
    model: {
      defaults: {
        tagName: "div",
        classes: ["bootstrap-grid-widget"],
        traits: [
          {
            type: "text",
            name: "id",
            label: "ID",
            placeholder: "meu-grid",
            changeProp: 1,
          },
          {
            type: "text",
            name: "title",
            label: "Título",
            placeholder: "Título do grid",
            changeProp: 1,
          },
          {
            type: "select",
            name: "container-size",
            label: "Tamanho do Container",
            options: [
              { value: "fluid", name: "Fluido (100%)" },
              { value: "sm", name: "Pequeno (540px)" },
              { value: "md", name: "Médio (720px)" },
              { value: "lg", name: "Grande (960px)" },
              { value: "xl", name: "Extra Grande (1140px)" },
              { value: "xxl", name: "XXL (1320px)" },
            ],
            changeProp: 1,
          },
          {
            type: "select",
            name: "grid-columns",
            label: "Número de Colunas",
            options: [
              { value: "3", name: "3 Colunas" },
              { value: "2", name: "2 Colunas" },
              { value: "4", name: "4 Colunas" },
              { value: "6", name: "6 Colunas" },
            ],
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
      },
      init() {
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
      },
    },
  });

  // Traits para Bootstrap Card
  editor.DomComponents.addType("custom-bootstrap-card", {
    extend: "text",
    model: {
      defaults: {
        tagName: "div",
        classes: ["bootstrap-card-widget"],
        traits: [
          {
            type: "text",
            name: "id",
            label: "ID",
            placeholder: "meu-card",
            changeProp: 1,
          },
          {
            type: "text",
            name: "title",
            label: "Título",
            placeholder: "Título do card",
            changeProp: 1,
          },
          {
            type: "text",
            name: "card-title",
            label: "Título do Card",
            placeholder: "Título do Card",
            changeProp: 1,
          },
          {
            type: "textarea",
            name: "card-text",
            label: "Texto do Card",
            placeholder: "Este é um exemplo de card Bootstrap...",
            changeProp: 1,
          },
          {
            type: "select",
            name: "card-style",
            label: "Estilo do Card",
            options: [
              { value: "default", name: "Padrão" },
              { value: "outline", name: "Contorno" },
              { value: "elevated", name: "Elevado" },
              { value: "flat", name: "Plano" },
            ],
            changeProp: 1,
          },
          {
            type: "select",
            name: "card-color",
            label: "Cor do Card",
            options: [
              { value: "default", name: "Padrão" },
              { value: "primary", name: "Primário (Azul)" },
              { value: "success", name: "Sucesso (Verde)" },
              { value: "danger", name: "Perigo (Vermelho)" },
              { value: "warning", name: "Aviso (Amarelo)" },
              { value: "info", name: "Info (Ciano)" },
            ],
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
      },
      init() {
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
      },
    },
  });

  // Traits para Bootstrap Form
  editor.DomComponents.addType("custom-bootstrap-form", {
    extend: "text",
    model: {
      defaults: {
        tagName: "div",
        classes: ["bootstrap-form-widget"],
        traits: [
          {
            type: "text",
            name: "id",
            label: "ID",
            placeholder: "meu-formulario",
            changeProp: 1,
          },
          {
            type: "text",
            name: "title",
            label: "Título",
            placeholder: "Título do formulário",
            changeProp: 1,
          },
          {
            type: "text",
            name: "form-title",
            label: "Título do Formulário",
            placeholder: "Entre em Contato",
            changeProp: 1,
          },
          {
            type: "select",
            name: "form-style",
            label: "Estilo do Formulário",
            options: [
              { value: "default", name: "Padrão" },
              { value: "horizontal", name: "Horizontal" },
              { value: "inline", name: "Inline" },
              { value: "floating", name: "Floating Labels" },
            ],
            changeProp: 1,
          },
          {
            type: "checkbox",
            name: "enable-validation",
            label: "Habilitar Validação",
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
      },
      init() {
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
      },
    },
  });

  // Traits para Bootstrap Navbar
  editor.DomComponents.addType("custom-bootstrap-navbar", {
    extend: "text",
    model: {
      defaults: {
        tagName: "div",
        classes: ["bootstrap-navbar-widget"],
        traits: [
          {
            type: "text",
            name: "id",
            label: "ID",
            placeholder: "minha-navbar",
            changeProp: 1,
          },
          {
            type: "text",
            name: "title",
            label: "Título",
            placeholder: "Título da navbar",
            changeProp: 1,
          },
          {
            type: "text",
            name: "brand-text",
            label: "Texto da Marca",
            placeholder: "Meu Site",
            changeProp: 1,
          },
          {
            type: "select",
            name: "navbar-style",
            label: "Estilo da Navbar",
            options: [
              { value: "light", name: "Claro" },
              { value: "dark", name: "Escuro" },
              { value: "primary", name: "Primário (Azul)" },
              { value: "success", name: "Sucesso (Verde)" },
              { value: "danger", name: "Perigo (Vermelho)" },
              { value: "warning", name: "Aviso (Amarelo)" },
              { value: "info", name: "Info (Ciano)" },
            ],
            changeProp: 1,
          },
          {
            type: "select",
            name: "navbar-position",
            label: "Posição da Navbar",
            options: [
              { value: "static", name: "Estática" },
              { value: "fixed", name: "Fixa" },
              { value: "sticky", name: "Sticky" },
              { value: "transparent", name: "Transparente" },
            ],
            changeProp: 1,
          },
          {
            type: "checkbox",
            name: "show-search",
            label: "Mostrar Campo de Busca",
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
      },
      init() {
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
      },
    },
  });

  // Traits para Bootstrap Alert
  editor.DomComponents.addType("custom-bootstrap-alert", {
    extend: "text",
    model: {
      defaults: {
        tagName: "div",
        classes: ["bootstrap-alert-widget"],
        traits: [
          {
            type: "text",
            name: "id",
            label: "ID",
            placeholder: "meu-alert",
            changeProp: 1,
          },
          {
            type: "text",
            name: "title",
            label: "Título",
            placeholder: "Título do alert",
            changeProp: 1,
          },
          {
            type: "text",
            name: "alert-title",
            label: "Título do Alert",
            placeholder: "Informação!",
            changeProp: 1,
          },
          {
            type: "textarea",
            name: "alert-message",
            label: "Mensagem do Alert",
            placeholder: "Esta é uma mensagem de alerta Bootstrap...",
            changeProp: 1,
          },
          {
            type: "select",
            name: "alert-type",
            label: "Tipo do Alert",
            options: [
              { value: "primary", name: "Primário (Azul)" },
              { value: "secondary", name: "Secundário (Cinza)" },
              { value: "success", name: "Sucesso (Verde)" },
              { value: "danger", name: "Perigo (Vermelho)" },
              { value: "warning", name: "Aviso (Amarelo)" },
              { value: "info", name: "Info (Ciano)" },
              { value: "light", name: "Claro" },
              { value: "dark", name: "Escuro" },
            ],
            changeProp: 1,
          },
          {
            type: "checkbox",
            name: "dismissible",
            label: "Permitir Fechar",
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
      },
      init() {
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
      },
    },
  });

  // JavaScript global para modais Bootstrap (funciona no editor e preview)
  const initBootstrapModals = () => {
    // Função para abrir modal
    const openModal = (modalId: string) => {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = "block";
        modal.classList.add("show");
        document.body.classList.add("modal-open");

        // Adicionar backdrop
        const existingBackdrop = document.getElementById("modal-backdrop");
        if (existingBackdrop) {
          existingBackdrop.remove();
        }

        const backdrop = document.createElement("div");
        backdrop.className = "modal-backdrop fade show";
        backdrop.id = "modal-backdrop";
        backdrop.onclick = () => closeModal(modalId);
        document.body.appendChild(backdrop);

        // Foco no modal
        setTimeout(() => {
          const focusableElement = modal.querySelector(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusableElement) {
            (focusableElement as HTMLElement).focus();
          }
        }, 100);
      }
    };

    // Função para fechar modal
    const closeModal = (modalId: string) => {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = "none";
        modal.classList.remove("show");
        document.body.classList.remove("modal-open");

        // Remover backdrop
        const backdrop = document.getElementById("modal-backdrop");
        if (backdrop) {
          backdrop.remove();
        }
      }
    };

    // Event delegation para botões de abrir modal
    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      const triggerBtn = target.closest('[data-bs-toggle="modal"]');

      if (triggerBtn) {
        const modalId = triggerBtn
          .getAttribute("data-bs-target")
          ?.replace("#", "");
        if (modalId) {
          e.preventDefault();
          e.stopPropagation();
          openModal(modalId);
        }
      }

      // Botões de fechar modal
      const closeBtn = target.closest('[data-bs-dismiss="modal"]');
      if (closeBtn) {
        const modal = closeBtn.closest(".modal");
        if (modal) {
          e.preventDefault();
          e.stopPropagation();
          closeModal(modal.id);
        }
      }

      // Fechar ao clicar no backdrop
      if (target.classList.contains("modal")) {
        closeModal(target.id);
      }
    });

    // Fechar com ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const openModal = document.querySelector(".modal.show");
        if (openModal) {
          closeModal(openModal.id);
        }
      }
    });
  };

  // Inicializar modais Bootstrap
  initBootstrapModals();

  // Traits para Bootstrap Modal
  editor.DomComponents.addType("custom-bootstrap-modal", {
    extend: "text",
    model: {
      defaults: {
        tagName: "div",
        classes: ["bootstrap-modal-widget"],
        traits: [
          {
            type: "text",
            name: "id",
            label: "ID",
            placeholder: "meu-modal",
            changeProp: 1,
          },
          {
            type: "text",
            name: "title",
            label: "Título",
            placeholder: "Título do modal",
            changeProp: 1,
          },
          {
            type: "text",
            name: "modal-title",
            label: "Título do Modal",
            placeholder: "Título do Modal",
            changeProp: 1,
          },
          {
            type: "textarea",
            name: "modal-content",
            label: "Conteúdo do Modal",
            placeholder: "Este é o conteúdo do modal Bootstrap...",
            changeProp: 1,
          },
          {
            type: "text",
            name: "button-text",
            label: "Texto do Botão",
            placeholder: "Abrir Modal",
            changeProp: 1,
          },
          {
            type: "select",
            name: "modal-size",
            label: "Tamanho do Modal",
            options: [
              { value: "default", name: "Padrão" },
              { value: "sm", name: "Pequeno" },
              { value: "lg", name: "Grande" },
              { value: "xl", name: "Extra Grande" },
              { value: "fullscreen", name: "Tela Cheia" },
            ],
            changeProp: 1,
          },
          {
            type: "checkbox",
            name: "backdrop",
            label: "Backdrop (Fundo Escuro)",
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

        // Adicionar funcionalidade JavaScript do modal
        const setupModal = () => {
          try {
            const view = (this as any).getView();
            if (!view) {
              console.log("No view found for modal");
              return;
            }

            const el = view.el;
            if (!el) {
              console.log("No element found for modal");
              return;
            }

            const modal = el.querySelector(".modal");
            const triggerBtn = el.querySelector('[data-bs-toggle="modal"]');
            const closeBtns = el.querySelectorAll('[data-bs-dismiss="modal"]');

            console.log("Modal elements found:", {
              modal: !!modal,
              triggerBtn: !!triggerBtn,
              closeBtns: closeBtns.length,
            });

            if (modal && triggerBtn) {
              // Remover event listeners existentes para evitar duplicação
              const newTriggerBtn = triggerBtn.cloneNode(true);
              triggerBtn.parentNode.replaceChild(newTriggerBtn, triggerBtn);

              // Função para abrir modal
              const openModal = (e: Event) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("Modal opening..."); // Debug

                modal.style.display = "block";
                modal.classList.add("show");
                document.body.classList.add("modal-open");

                // Adicionar backdrop
                const existingBackdrop =
                  document.getElementById("modal-backdrop");
                if (existingBackdrop) {
                  existingBackdrop.remove();
                }

                const backdrop = document.createElement("div");
                backdrop.className = "modal-backdrop fade show";
                backdrop.id = "modal-backdrop";
                document.body.appendChild(backdrop);

                // Foco no modal
                setTimeout(() => {
                  const focusableElement = modal.querySelector(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                  );
                  if (focusableElement) {
                    (focusableElement as HTMLElement).focus();
                  }
                }, 100);
              };

              // Função para fechar modal
              const closeModal = () => {
                console.log("Modal closing..."); // Debug
                modal.style.display = "none";
                modal.classList.remove("show");
                document.body.classList.remove("modal-open");

                // Remover backdrop
                const backdrop = document.getElementById("modal-backdrop");
                if (backdrop) {
                  backdrop.remove();
                }
              };

              // Event listeners
              newTriggerBtn.addEventListener("click", openModal);
              console.log("Event listener added to trigger button");

              closeBtns.forEach((btn: Element) => {
                btn.addEventListener("click", closeModal);
              });

              // Fechar ao clicar no backdrop
              modal.addEventListener("click", (e: Event) => {
                if (e.target === modal) {
                  closeModal();
                }
              });

              // Fechar com ESC
              const handleEscape = (e: KeyboardEvent) => {
                if (e.key === "Escape" && modal.classList.contains("show")) {
                  closeModal();
                }
              };

              document.addEventListener("keydown", handleEscape);

              // Cleanup function
              return () => {
                document.removeEventListener("keydown", handleEscape);
              };
            } else {
              console.log("Modal or trigger button not found");
            }
          } catch (error) {
            console.error("Error setting up modal:", error);
          }
        };

        // Setup inicial com delay para garantir que o DOM esteja pronto
        setTimeout(() => {
          setupModal();
        }, 100);

        // Re-setup quando o componente for atualizado
        (this as any).on("change:component:update", () => {
          setTimeout(() => {
            setupModal();
          }, 100);
        });
      },
    },
  });

  // Traits para Bootstrap Badge
  editor.DomComponents.addType("custom-bootstrap-badge", {
    extend: "text",
    model: {
      defaults: {
        tagName: "div",
        classes: ["bootstrap-badge-widget"],
        traits: [
          {
            type: "text",
            name: "id",
            label: "ID",
            placeholder: "meu-badge",
            changeProp: 1,
          },
          {
            type: "text",
            name: "title",
            label: "Título",
            placeholder: "Título do badge",
            changeProp: 1,
          },
          {
            type: "text",
            name: "badge-text",
            label: "Texto do Badge",
            placeholder: "Novo",
            changeProp: 1,
          },
          {
            type: "select",
            name: "badge-color",
            label: "Cor do Badge",
            options: [
              { value: "primary", name: "Primário (Azul)" },
              { value: "secondary", name: "Secundário (Cinza)" },
              { value: "success", name: "Sucesso (Verde)" },
              { value: "danger", name: "Perigo (Vermelho)" },
              { value: "warning", name: "Aviso (Amarelo)" },
              { value: "info", name: "Info (Ciano)" },
              { value: "light", name: "Claro" },
              { value: "dark", name: "Escuro" },
            ],
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
      },
      init() {
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
      },
    },
  });

  // Traits para Bootstrap Breadcrumb
  editor.DomComponents.addType("custom-bootstrap-breadcrumb", {
    extend: "text",
    model: {
      defaults: {
        tagName: "div",
        classes: ["bootstrap-breadcrumb-widget"],
        traits: [
          {
            type: "text",
            name: "id",
            label: "ID",
            placeholder: "meu-breadcrumb",
            changeProp: 1,
          },
          {
            type: "text",
            name: "title",
            label: "Título",
            placeholder: "Título do breadcrumb",
            changeProp: 1,
          },
          {
            type: "text",
            name: "item-1-text",
            label: "Item 1 - Texto",
            placeholder: "Início",
            changeProp: 1,
          },
          {
            type: "text",
            name: "item-2-text",
            label: "Item 2 - Texto",
            placeholder: "Categoria",
            changeProp: 1,
          },
          {
            type: "text",
            name: "item-3-text",
            label: "Item 3 - Texto (Ativo)",
            placeholder: "Página Atual",
            changeProp: 1,
          },
          {
            type: "select",
            name: "breadcrumb-style",
            label: "Estilo do Breadcrumb",
            options: [
              { value: "default", name: "Padrão" },
              { value: "light", name: "Claro" },
              { value: "dark", name: "Escuro" },
              { value: "primary", name: "Primário (Azul)" },
              { value: "success", name: "Sucesso (Verde)" },
            ],
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
      },
      init() {
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
      },
    },
  });

  // Traits para Bootstrap Dropdown
  editor.DomComponents.addType("custom-bootstrap-dropdown", {
    extend: "text",
    model: {
      defaults: {
        tagName: "div",
        classes: ["bootstrap-dropdown-widget"],
        traits: [
          {
            type: "text",
            name: "id",
            label: "ID",
            placeholder: "meu-dropdown",
            changeProp: 1,
          },
          {
            type: "text",
            name: "title",
            label: "Título",
            placeholder: "Título do dropdown",
            changeProp: 1,
          },
          {
            type: "text",
            name: "button-text",
            label: "Texto do Botão",
            placeholder: "Menu Dropdown",
            changeProp: 1,
          },
          {
            type: "text",
            name: "item-1-text",
            label: "Item 1 - Texto",
            placeholder: "Ação 1",
            changeProp: 1,
          },
          {
            type: "text",
            name: "item-2-text",
            label: "Item 2 - Texto",
            placeholder: "Ação 2",
            changeProp: 1,
          },
          {
            type: "text",
            name: "item-3-text",
            label: "Item 3 - Texto",
            placeholder: "Ação 3",
            changeProp: 1,
          },
          {
            type: "select",
            name: "button-style",
            label: "Estilo do Botão",
            options: [
              { value: "primary", name: "Primário (Azul)" },
              { value: "secondary", name: "Secundário (Cinza)" },
              { value: "success", name: "Sucesso (Verde)" },
              { value: "danger", name: "Perigo (Vermelho)" },
              { value: "warning", name: "Aviso (Amarelo)" },
              { value: "info", name: "Info (Ciano)" },
              { value: "light", name: "Claro" },
              { value: "dark", name: "Escuro" },
            ],
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
      },
      init() {
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
      },
    },
  });

  // Traits para Bootstrap List Group
  editor.DomComponents.addType("custom-bootstrap-listgroup", {
    extend: "text",
    model: {
      defaults: {
        tagName: "div",
        classes: ["bootstrap-listgroup-widget"],
        traits: [
          {
            type: "text",
            name: "id",
            label: "ID",
            placeholder: "minha-listgroup",
            changeProp: 1,
          },
          {
            type: "text",
            name: "title",
            label: "Título",
            placeholder: "Título da list group",
            changeProp: 1,
          },
          {
            type: "text",
            name: "item-1-text",
            label: "Item 1 - Texto",
            placeholder: "Item Ativo",
            changeProp: 1,
          },
          {
            type: "text",
            name: "item-2-text",
            label: "Item 2 - Texto",
            placeholder: "Segundo item",
            changeProp: 1,
          },
          {
            type: "text",
            name: "item-3-text",
            label: "Item 3 - Texto",
            placeholder: "Terceiro item",
            changeProp: 1,
          },
          {
            type: "text",
            name: "item-4-text",
            label: "Item 4 - Texto",
            placeholder: "Item Desabilitado",
            changeProp: 1,
          },
          {
            type: "text",
            name: "item-5-text",
            label: "Item 5 - Texto",
            placeholder: "Quinto item",
            changeProp: 1,
          },
          {
            type: "select",
            name: "listgroup-style",
            label: "Estilo da List Group",
            options: [
              { value: "default", name: "Padrão" },
              { value: "primary", name: "Primário (Azul)" },
              { value: "secondary", name: "Secundário (Cinza)" },
              { value: "success", name: "Sucesso (Verde)" },
              { value: "danger", name: "Perigo (Vermelho)" },
              { value: "warning", name: "Aviso (Amarelo)" },
              { value: "info", name: "Info (Ciano)" },
              { value: "light", name: "Claro" },
              { value: "dark", name: "Escuro" },
            ],
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
      },
      init() {
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
      },
    },
  });

  // Traits para Bootstrap Table
  editor.DomComponents.addType("custom-bootstrap-table", {
    extend: "text",
    model: {
      defaults: {
        tagName: "div",
        classes: ["bootstrap-table-widget"],
        traits: [
          {
            type: "text",
            name: "id",
            label: "ID",
            placeholder: "minha-tabela",
            changeProp: 1,
          },
          {
            type: "text",
            name: "title",
            label: "Título",
            placeholder: "Título da tabela",
            changeProp: 1,
          },
          {
            type: "text",
            name: "col-1-header",
            label: "Cabeçalho Coluna 1",
            placeholder: "#",
            changeProp: 1,
          },
          {
            type: "text",
            name: "col-2-header",
            label: "Cabeçalho Coluna 2",
            placeholder: "Nome",
            changeProp: 1,
          },
          {
            type: "text",
            name: "col-3-header",
            label: "Cabeçalho Coluna 3",
            placeholder: "Email",
            changeProp: 1,
          },
          {
            type: "text",
            name: "col-4-header",
            label: "Cabeçalho Coluna 4",
            placeholder: "Cargo",
            changeProp: 1,
          },
          {
            type: "text",
            name: "col-5-header",
            label: "Cabeçalho Coluna 5",
            placeholder: "Ações",
            changeProp: 1,
          },
          {
            type: "select",
            name: "table-style",
            label: "Estilo da Tabela",
            options: [
              { value: "default", name: "Padrão" },
              { value: "primary", name: "Primário (Azul)" },
              { value: "secondary", name: "Secundário (Cinza)" },
              { value: "success", name: "Sucesso (Verde)" },
              { value: "danger", name: "Perigo (Vermelho)" },
              { value: "warning", name: "Aviso (Amarelo)" },
              { value: "info", name: "Info (Ciano)" },
              { value: "light", name: "Claro" },
              { value: "dark", name: "Escuro" },
            ],
            changeProp: 1,
          },
          {
            type: "checkbox",
            name: "striped",
            label: "Listras Alternadas",
            changeProp: 1,
          },
          {
            type: "checkbox",
            name: "hover",
            label: "Efeito Hover",
            changeProp: 1,
          },
          {
            type: "checkbox",
            name: "responsive",
            label: "Responsiva",
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
      },
      init() {
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
      },
    },
  });

  // Traits para botão interativo específico
  editor.DomComponents.addType("interactive-button", {
    extend: "button",
    model: {
      defaults: {
        tagName: "button",
        classes: ["interactive-button"],
        traits: [
          {
            type: "text",
            name: "id",
            label: "ID",
            placeholder: "meu-botao",
            changeProp: 1,
          },
          {
            type: "text",
            name: "title",
            label: "Título",
            placeholder: "Título do botão",
            changeProp: 1,
          },
          {
            type: "text",
            name: "button-text",
            label: "Texto do Botão",
            placeholder: "Clique Aqui",
            changeProp: 1,
          },
          {
            type: "select",
            name: "button-style",
            label: "Estilo do Botão",
            options: [
              { value: "default", name: "Padrão (Azul)" },
              { value: "success", name: "Sucesso (Verde)" },
              { value: "danger", name: "Perigo (Vermelho)" },
              { value: "outline", name: "Contorno" },
              { value: "warning", name: "Aviso (Amarelo)" },
              { value: "info", name: "Info (Ciano)" },
            ],
            changeProp: 1,
          },
          {
            type: "select",
            name: "button-size",
            label: "Tamanho do Botão",
            options: [
              { value: "small", name: "Pequeno" },
              { value: "medium", name: "Médio" },
              { value: "large", name: "Grande" },
              { value: "xlarge", name: "Extra Grande" },
            ],
            changeProp: 1,
          },
          {
            type: "select",
            name: "button-type",
            label: "Tipo de Ação",
            options: [
              { value: "link", name: "Link" },
              { value: "submit", name: "Enviar Formulário" },
              { value: "custom", name: "JavaScript Personalizado" },
              { value: "scroll", name: "Rolar para Seção" },
              { value: "modal", name: "Abrir Modal" },
              { value: "copy", name: "Copiar Texto" },
            ],
            changeProp: 1,
          },
          {
            type: "text",
            name: "href",
            label: "URL (se tipo Link)",
            placeholder: "https://exemplo.com",
            changeProp: 1,
          },
          {
            type: "text",
            name: "scroll-target",
            label: "ID da Seção (se tipo Scroll)",
            placeholder: "#minha-secao",
            changeProp: 1,
          },
          {
            type: "text",
            name: "modal-target",
            label: "ID do Modal (se tipo Modal)",
            placeholder: "#meu-modal",
            changeProp: 1,
          },
          {
            type: "text",
            name: "copy-text",
            label: "Texto para Copiar (se tipo Copy)",
            placeholder: "Texto a ser copiado",
            changeProp: 1,
          },
          {
            type: "text",
            name: "onclick",
            label: "JavaScript Personalizado",
            placeholder: 'alert("Olá!")',
            changeProp: 1,
          },
          {
            type: "checkbox",
            name: "disabled",
            label: "Desabilitado",
            changeProp: 1,
          },
          {
            type: "checkbox",
            name: "loading",
            label: "Estado de Carregamento",
            changeProp: 1,
          },
          {
            type: "text",
            name: "icon",
            label: "Ícone (Font Awesome)",
            placeholder: "fas fa-home",
            changeProp: 1,
          },
          {
            type: "select",
            name: "icon-position",
            label: "Posição do Ícone",
            options: [
              { value: "left", name: "Esquerda" },
              { value: "right", name: "Direita" },
              { value: "top", name: "Acima" },
              { value: "bottom", name: "Abaixo" },
            ],
            changeProp: 1,
          },
          {
            type: "textarea",
            name: "custom-css",
            label: "CSS Personalizado",
            placeholder: ".minha-classe { color: red; }",
            changeProp: 1,
          },
          {
            type: "text",
            name: "data-custom",
            label: "Atributo Data",
            placeholder: "valor-personalizado",
            changeProp: 1,
          },
        ],
      },
      init() {
        // Aplicar CSS personalizado quando o trait for alterado
        (this as any).on("change:custom-css", (_model: any, value: string) => {
          if (value && value.trim()) {
            const componentId = (this as any).getId();
            const customStyleId = `custom-css-${componentId}`;

            // Remover estilo anterior se existir
            const existingStyle = document.getElementById(customStyleId);
            if (existingStyle) {
              existingStyle.remove();
            }

            // Adicionar novo estilo
            const style = document.createElement("style");
            style.id = customStyleId;
            style.textContent = `#${componentId} { ${value} }`;
            document.head.appendChild(style);
          }
        });

        // Aplicar ações quando os traits forem alterados
        (this as any).on(
          "change:button-type change:href change:onclick change:scroll-target change:modal-target change:copy-text change:button-text change:button-style change:button-size change:disabled change:loading change:icon change:icon-position",
          () => {
            const buttonType = (this as any).get("button-type");
            const href = (this as any).get("href");
            const onclick = (this as any).get("onclick");
            const scrollTarget = (this as any).get("scroll-target");
            const modalTarget = (this as any).get("modal-target");
            const copyText = (this as any).get("copy-text");
            const buttonText = (this as any).get("button-text");
            const buttonStyle = (this as any).get("button-style");
            const buttonSize = (this as any).get("button-size");
            const disabled = (this as any).get("disabled");
            const loading = (this as any).get("loading");

            let action = "";

            switch (buttonType) {
              case "link":
                action = `window.location.href = '${href}'`;
                break;
              case "scroll":
                action = `document.querySelector('${scrollTarget}').scrollIntoView({ behavior: 'smooth' })`;
                break;
              case "modal":
                action = `document.querySelector('${modalTarget}').style.display = 'block'`;
                break;
              case "copy":
                action = `navigator.clipboard.writeText('${copyText}').then(() => alert('Texto copiado!'))`;
                break;
              case "custom":
                action = onclick;
                break;
              case "submit":
                action = `this.closest('form')?.submit()`;
                break;
            }

            if (action) {
              (this as any).set("onclick", action);
            }

            // Aplicar texto do botão
            if (buttonText) {
              const view = (this as any).getView();
              if (view) {
                const textElement = view.el.querySelector(".button-text");
                if (textElement) {
                  textElement.textContent = buttonText;
                }
              }
            }

            // Aplicar classes de estilo e tamanho
            const view = (this as any).getView();
            if (view) {
              const el = view.el;

              // Remover classes antigas
              el.classList.remove(
                "success",
                "danger",
                "outline",
                "warning",
                "info"
              );
              el.classList.remove("small", "medium", "large", "xlarge");

              // Aplicar novo estilo
              if (buttonStyle && buttonStyle !== "default") {
                el.classList.add(buttonStyle);
              }

              // Aplicar novo tamanho
              if (buttonSize && buttonSize !== "medium") {
                el.classList.add(buttonSize);
              }

              // Aplicar estado desabilitado
              if (disabled) {
                el.disabled = true;
                el.classList.add("disabled");
              } else {
                el.disabled = false;
                el.classList.remove("disabled");
              }

              // Aplicar estado de carregamento
              if (loading) {
                el.classList.add("loading");
              } else {
                el.classList.remove("loading");
              }
            }
          }
        );
      },
    },
  });

  // Traits para botões
  editor.DomComponents.addType("button", {
    extend: "button",
    model: {
      defaults: {
        traits: [
          {
            type: "text",
            name: "id",
            label: "ID",
            placeholder: "meu-botao",
            changeProp: 1,
          },
          {
            type: "text",
            name: "title",
            label: "Título",
            placeholder: "Título do botão",
            changeProp: 1,
          },
          {
            type: "text",
            name: "button-text",
            label: "Texto do Botão",
            placeholder: "Clique Aqui",
            changeProp: 1,
          },
          {
            type: "select",
            name: "button-style",
            label: "Estilo do Botão",
            options: [
              { value: "default", name: "Padrão (Azul)" },
              { value: "success", name: "Sucesso (Verde)" },
              { value: "danger", name: "Perigo (Vermelho)" },
              { value: "outline", name: "Contorno" },
              { value: "warning", name: "Aviso (Amarelo)" },
              { value: "info", name: "Info (Ciano)" },
            ],
            changeProp: 1,
          },
          {
            type: "select",
            name: "button-size",
            label: "Tamanho do Botão",
            options: [
              { value: "small", name: "Pequeno" },
              { value: "medium", name: "Médio" },
              { value: "large", name: "Grande" },
              { value: "xlarge", name: "Extra Grande" },
            ],
            changeProp: 1,
          },
          {
            type: "text",
            name: "onclick",
            label: "Ação do Botão",
            placeholder: 'window.location.href = "https://exemplo.com"',
            changeProp: 1,
          },
          {
            type: "select",
            name: "button-type",
            label: "Tipo de Ação",
            options: [
              { value: "link", name: "Link" },
              { value: "submit", name: "Enviar Formulário" },
              { value: "custom", name: "JavaScript Personalizado" },
              { value: "scroll", name: "Rolar para Seção" },
              { value: "modal", name: "Abrir Modal" },
              { value: "copy", name: "Copiar Texto" },
            ],
            changeProp: 1,
          },
          {
            type: "text",
            name: "href",
            label: "URL (se tipo Link)",
            placeholder: "https://exemplo.com",
            changeProp: 1,
          },
          {
            type: "text",
            name: "scroll-target",
            label: "ID da Seção (se tipo Scroll)",
            placeholder: "#minha-secao",
            changeProp: 1,
          },
          {
            type: "text",
            name: "modal-target",
            label: "ID do Modal (se tipo Modal)",
            placeholder: "#meu-modal",
            changeProp: 1,
          },
          {
            type: "text",
            name: "copy-text",
            label: "Texto para Copiar (se tipo Copy)",
            placeholder: "Texto a ser copiado",
            changeProp: 1,
          },
          {
            type: "checkbox",
            name: "disabled",
            label: "Desabilitado",
            changeProp: 1,
          },
          {
            type: "checkbox",
            name: "loading",
            label: "Estado de Carregamento",
            changeProp: 1,
          },
          {
            type: "text",
            name: "icon",
            label: "Ícone (Font Awesome)",
            placeholder: "fas fa-home",
            changeProp: 1,
          },
          {
            type: "select",
            name: "icon-position",
            label: "Posição do Ícone",
            options: [
              { value: "left", name: "Esquerda" },
              { value: "right", name: "Direita" },
              { value: "top", name: "Acima" },
              { value: "bottom", name: "Abaixo" },
            ],
            changeProp: 1,
          },
          {
            type: "textarea",
            name: "custom-css",
            label: "CSS Personalizado",
            placeholder: ".minha-classe { color: red; }",
            changeProp: 1,
          },
          {
            type: "text",
            name: "data-custom",
            label: "Atributo Data",
            placeholder: "valor-personalizado",
            changeProp: 1,
          },
        ],
      },
      init() {
        // Aplicar CSS personalizado quando o trait for alterado
        (this as any).on("change:custom-css", (_model: any, value: string) => {
          if (value && value.trim()) {
            const componentId = (this as any).getId();
            const customStyleId = `custom-css-${componentId}`;

            // Remover estilo anterior se existir
            const existingStyle = document.getElementById(customStyleId);
            if (existingStyle) {
              existingStyle.remove();
            }

            // Adicionar novo estilo
            const style = document.createElement("style");
            style.id = customStyleId;
            style.textContent = `#${componentId} { ${value} }`;
            document.head.appendChild(style);
          }
        });

        // Aplicar ações quando os traits forem alterados
        (this as any).on(
          "change:button-type change:href change:onclick change:scroll-target change:modal-target change:copy-text change:button-text change:button-style change:button-size change:disabled change:loading change:icon change:icon-position",
          () => {
            const buttonType = (this as any).get("button-type");
            const href = (this as any).get("href");
            const onclick = (this as any).get("onclick");
            const scrollTarget = (this as any).get("scroll-target");
            const modalTarget = (this as any).get("modal-target");
            const copyText = (this as any).get("copy-text");
            const buttonText = (this as any).get("button-text");
            const buttonStyle = (this as any).get("button-style");
            const buttonSize = (this as any).get("button-size");
            const disabled = (this as any).get("disabled");
            const loading = (this as any).get("loading");

            let action = "";

            switch (buttonType) {
              case "link":
                action = `window.location.href = '${href}'`;
                break;
              case "scroll":
                action = `document.querySelector('${scrollTarget}').scrollIntoView({ behavior: 'smooth' })`;
                break;
              case "modal":
                action = `document.querySelector('${modalTarget}').style.display = 'block'`;
                break;
              case "copy":
                action = `navigator.clipboard.writeText('${copyText}').then(() => alert('Texto copiado!'))`;
                break;
              case "custom":
                action = onclick;
                break;
              case "submit":
                action = `this.closest('form')?.submit()`;
                break;
            }

            if (action) {
              (this as any).set("onclick", action);
            }

            // Aplicar texto do botão
            if (buttonText) {
              const view = (this as any).getView();
              if (view) {
                const textElement = view.el.querySelector(".button-text");
                if (textElement) {
                  textElement.textContent = buttonText;
                }
              }
            }

            // Aplicar classes de estilo e tamanho
            const view = (this as any).getView();
            if (view) {
              const el = view.el;

              // Remover classes antigas
              el.classList.remove(
                "success",
                "danger",
                "outline",
                "warning",
                "info"
              );
              el.classList.remove("small", "medium", "large", "xlarge");

              // Aplicar novo estilo
              if (buttonStyle && buttonStyle !== "default") {
                el.classList.add(buttonStyle);
              }

              // Aplicar novo tamanho
              if (buttonSize && buttonSize !== "medium") {
                el.classList.add(buttonSize);
              }

              // Aplicar estado desabilitado
              if (disabled) {
                el.disabled = true;
                el.classList.add("disabled");
              } else {
                el.disabled = false;
                el.classList.remove("disabled");
              }

              // Aplicar estado de carregamento
              if (loading) {
                el.classList.add("loading");
              } else {
                el.classList.remove("loading");
              }
            }
          }
        );
      },
    },
  });

  // Traits para imagens
  editor.DomComponents.addType("image", {
    extend: "image",
    model: {
      defaults: {
        traits: [
          {
            type: "text",
            name: "id",
            label: "ID",
            placeholder: "minha-imagem",
            changeProp: 1,
          },
          {
            type: "text",
            name: "src",
            label: "URL da Imagem",
            placeholder: "https://exemplo.com/imagem.jpg",
            changeProp: 1,
          },
          {
            type: "text",
            name: "alt",
            label: "Texto Alternativo",
            placeholder: "Descrição da imagem",
            changeProp: 1,
          },
          {
            type: "text",
            name: "title",
            label: "Título",
            placeholder: "Título da imagem",
            changeProp: 1,
          },
          {
            type: "text",
            name: "href",
            label: "Link da Imagem",
            placeholder: "https://exemplo.com",
            changeProp: 1,
          },
          {
            type: "textarea",
            name: "custom-css",
            label: "CSS Personalizado",
            placeholder: ".minha-classe { color: red; }",
            changeProp: 1,
          },
        ],
      },
      init() {
        // Aplicar CSS personalizado quando o trait for alterado
        (this as any).on("change:custom-css", (_model: any, value: string) => {
          if (value && value.trim()) {
            const componentId = (this as any).getId();
            const customStyleId = `custom-css-${componentId}`;

            // Remover estilo anterior se existir
            const existingStyle = document.getElementById(customStyleId);
            if (existingStyle) {
              existingStyle.remove();
            }

            // Adicionar novo estilo
            const style = document.createElement("style");
            style.id = customStyleId;
            style.textContent = `#${componentId} { ${value} }`;
            document.head.appendChild(style);
          }
        });
      },
    },
  });

  // Traits globais para todos os elementos
  editor.DomComponents.addType("default", {
    extend: "default",
    model: {
      defaults: {
        traits: [
          {
            type: "text",
            name: "id",
            label: "ID",
            placeholder: "meu-elemento",
            changeProp: 1,
          },
          {
            type: "text",
            name: "title",
            label: "Título",
            placeholder: "Título do elemento",
            changeProp: 1,
          },
          {
            type: "textarea",
            name: "custom-css",
            label: "CSS Personalizado",
            placeholder: ".minha-classe { color: red; }",
            changeProp: 1,
          },
          {
            type: "text",
            name: "data-custom",
            label: "Atributo Data",
            placeholder: "valor-personalizado",
            changeProp: 1,
          },
        ],
      },
      init() {
        // Aplicar CSS personalizado quando o trait for alterado
        (this as any).on("change:custom-css", (_model: any, value: string) => {
          if (value && value.trim()) {
            const componentId = (this as any).getId();
            const customStyleId = `custom-css-${componentId}`;

            // Remover estilo anterior se existir
            const existingStyle = document.getElementById(customStyleId);
            if (existingStyle) {
              existingStyle.remove();
            }

            // Adicionar novo estilo
            const style = document.createElement("style");
            style.id = customStyleId;
            style.textContent = `#${componentId} { ${value} }`;
            document.head.appendChild(style);
          }
        });
      },
    },
  });

  // Sistema para aplicar ações de botões
  editor.DomComponents.addType("button", {
    extend: "button",
    model: {
      defaults: {
        traits: [
          {
            type: "text",
            name: "onclick",
            label: "Ação do Botão",
            placeholder: 'window.location.href = "https://exemplo.com"',
            changeProp: 1,
          },
          {
            type: "select",
            name: "button-type",
            label: "Tipo de Ação",
            options: [
              { value: "link", name: "Link" },
              { value: "submit", name: "Enviar Formulário" },
              { value: "custom", name: "JavaScript Personalizado" },
              { value: "scroll", name: "Rolar para Seção" },
            ],
            changeProp: 1,
          },
          {
            type: "text",
            name: "href",
            label: "URL (se tipo Link)",
            placeholder: "https://exemplo.com",
            changeProp: 1,
          },
          {
            type: "text",
            name: "scroll-target",
            label: "ID da Seção (se tipo Scroll)",
            placeholder: "#minha-secao",
            changeProp: 1,
          },
        ],
      },
      init() {
        // Aplicar ações quando os traits forem alterados
        (this as any).on(
          "change:button-type change:href change:onclick change:scroll-target",
          () => {
            const buttonType = (this as any).get("button-type");
            const href = (this as any).get("href");
            const onclick = (this as any).get("onclick");
            const scrollTarget = (this as any).get("scroll-target");

            let action = "";

            switch (buttonType) {
              case "link":
                action = `window.location.href = '${href}'`;
                break;
              case "scroll":
                action = `document.querySelector('${scrollTarget}').scrollIntoView({ behavior: 'smooth' })`;
                break;
              case "custom":
                action = onclick;
                break;
              case "submit":
                action = `this.closest('form')?.submit()`;
                break;
            }

            if (action) {
              (this as any).set("onclick", action);
            }
          }
        );
      },
    },
  });
};

const switchRightTab = (tab: string) => {
  const stylesContainer = document.getElementById("styles-container");
  const traitsContainer = document.getElementById("traits-container");
  const stylesTab = document.querySelector(".gjs-tab-styles");
  const traitsTab = document.querySelector(".gjs-tab-traits");

  if (stylesContainer && traitsContainer && stylesTab && traitsTab) {
    if (tab === "styles") {
      stylesContainer.style.display = "block";
      traitsContainer.style.display = "none";
      stylesTab.classList.add("border-blue-500", "text-white");
      stylesTab.classList.remove("border-transparent", "text-gray-300");
      traitsTab.classList.remove("border-blue-500", "text-white");
      traitsTab.classList.add("border-transparent", "text-gray-300");
    } else {
      stylesContainer.style.display = "none";
      traitsContainer.style.display = "block";
      traitsTab.classList.add("border-blue-500", "text-white");
      traitsTab.classList.remove("border-transparent", "text-gray-300");
      stylesTab.classList.remove("border-blue-500", "text-white");
      stylesTab.classList.add("border-transparent", "text-gray-300");
    }
  }
};

// Lifecycle
onMounted(async () => {
  console.log("🚀 Inicializando GrapesJS Editor...");

  // Otimizar performance antes de inicializar o editor
  optimizeGrapesJSPerformance();
  setupEventThrottling();

  await nextTick(async () => {
    editor.value = grapesjs.init(editorConfig);

    // Configurar editor personalizado com blocos e componentes
    await setupGrapesEditor(editor.value);

    // Aguardar um pouco para garantir que tudo foi carregado
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Marcar templates como prontos
    templatesReady.value = true;

    // Configurar drag & drop no canvas
    setupCanvasDragDrop(editor.value);

    // Filtrar blocos após o carregamento
    setTimeout(() => {
      filterTemplatesFromBlocks(editor.value);
    }, 500);

    // Adicionar listener para filtrar blocos quando novos são adicionados
    // editor.value.on("block:add", () => {
    //   setTimeout(() => {
    //     filterTemplatesFromBlocks(editor.value);
    //   }, 100);
    // });

    // Forçar remoção de painéis automáticos após inicialização
    setTimeout(() => {
      // Remover painéis automáticos do DOM
      const viewsPanel = document.querySelector(
        ".gjs-pn-panel.gjs-pn-views-container"
      );
      const devicesPanel = document.querySelector(
        ".gjs-pn-panel.gjs-pn-devices-c"
      );
      const commandsPanel = document.querySelector(".gjs-pn-commands");
      const optionsPanel = document.querySelector(".gjs-pn-options");

      if (viewsPanel) viewsPanel.remove();
      if (devicesPanel) devicesPanel.remove();
      if (commandsPanel) commandsPanel.remove();
      if (optionsPanel) optionsPanel.remove();

      // Remover painéis específicos do Style Manager e Selector Manager
      const smContainers = document.querySelectorAll(".gjs-sm-container");
      const clmContainers = document.querySelectorAll(".gjs-clm-container");

      smContainers.forEach((container) => container.remove());
      clmContainers.forEach((container) => container.remove());

      console.log("🧹 Painéis automáticos do GrapesJS removidos");
    }, 100);

    // Adicionar comandos personalizados
    editor.value.Commands.add("toggle-rulers", {
      run: () => {
        // Implementação futura para rulers
      },
    });

    // Configurar comandos para dispositivos
    editor.value.Commands.add("set-device-desktop", {
      run: () => {
        selectedDevice.value = "Desktop";
        const deviceManager = (editor.value as any).DeviceManager;
        deviceManager.select("Desktop");
        console.log("Setting desktop device");
      },
    });

    editor.value.Commands.add("set-device-tablet", {
      run: () => {
        selectedDevice.value = "Tablet";
        const deviceManager = (editor.value as any).DeviceManager;
        deviceManager.select("Tablet");
        console.log("Setting tablet device");
      },
    });

    editor.value.Commands.add("set-device-mobile", {
      run: () => {
        selectedDevice.value = "Mobile";
        const deviceManager = (editor.value as any).DeviceManager;
        deviceManager.select("Mobile");
        console.log("Setting mobile device");
      },
    });

    // Configurar sistema de traits customizados
    setupCustomTraits(editor.value);

    // Configurar eventos para as abas
    const blocksTab = document.querySelector(".gjs-tab-blocks");
    const layersTab = document.querySelector(".gjs-tab-layers");
    const stylesTab = document.querySelector(".gjs-tab-styles");
    const traitsTab = document.querySelector(".gjs-tab-traits");

    if (blocksTab && layersTab) {
      eventManager.add(blocksTab, "click", () => switchLeftTab("blocks"));
      eventManager.add(layersTab, "click", () => switchLeftTab("layers"));
    }

    if (stylesTab && traitsTab) {
      eventManager.add(stylesTab, "click", () => switchRightTab("styles"));
      eventManager.add(traitsTab, "click", () => switchRightTab("traits"));
    }

    // Debug eventos de dispositivos
    editor.value.on("device:add", (_device: any) => {
      // Device added silently
    });

    editor.value.on("device:select", (device: any) => {
      const canvas = document.querySelector(".gjs-cv-canvas");
      if (canvas) {
        canvas.setAttribute("data-device", device.get("name"));
      }
    });

    editor.value.on("device:update", (device: any) => {
      console.log("🔄 Dispositivo atualizado:", device.get("name"));
    });

    // Controlar placeholder do Style Manager (removido)
    editor.value.on("component:selected", (component: any) => {
      // Capturar informações do elemento selecionado
      if (component) {
        selectedElementInfo.value = {
          type: component.get("tagName") || "div",
          classes: component.getClasses().join(" "),
        };
      }
    });

    editor.value.on("component:deselected", () => {
      // Limpar informações do elemento
      selectedElementInfo.value = null;
    });

    // Sincronizar estado do dispositivo quando alterado
    editor.value.on("device:select", (device: any) => {
      const deviceName = device.get("name");
      if (deviceName !== selectedDevice.value) {
        selectedDevice.value = deviceName;
        console.log(`Dispositivo sincronizado: ${deviceName}`);
      }
    });

    // Adicionar hotkeys com gerenciador otimizado
    eventManager.add(document, "keydown", (e) => {
      const keyEvent = e as KeyboardEvent;
      // Esc para fechar modais
      if (keyEvent.key === "Escape") {
        if (showCodeViewer.value) {
          toggleCodeViewer();
        }
        return;
      }

      if (keyEvent.ctrlKey || keyEvent.metaKey) {
        switch (keyEvent.key) {
          case "s":
            keyEvent.preventDefault();
            savePage();
            break;
          case "e":
            keyEvent.preventDefault();
            exportHTML();
            break;
          case "p":
            keyEvent.preventDefault();
            previewPage();
            break;
          case "/":
            e.preventDefault();
            toggleCodeViewer();
            break;
        }
      }
    });

    console.log("✅ Editor inicializado com sucesso!");
  });
});

// Limpeza dos event listeners
onBeforeUnmount(() => {
  eventManager.removeAll();
  console.log("🧹 Event listeners removidos");
});
</script>

<style scoped>
/* Estilos para as réguas */
.rulers-container {
  background: transparent;
}

.horizontal-ruler {
  background-color: rgba(31, 41, 59, 0.95);
  background-image: 
    /* Marcações principais a cada cm (37.795px ≈ 1cm) */ repeating-linear-gradient(
      90deg,
      transparent,
      transparent 55.795px,
      #f3f4f6 55.795px,
      #f3f4f6 39.795px
    ),
    /* Marcações médias a cada 5mm */
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 18.8975px,
        #d1d5db 18.8975px,
        #d1d5db 8.8975px
      ),
    /* Marcações pequenas a cada mm */
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 3.7795px,
        #9ca3af 3.7795px,
        #9ca3af 4.7795px
      );
  position: relative;
  backdrop-filter: blur(2px);
}

.horizontal-ruler::after {
  content: "0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30";
  position: absolute;
  bottom: 2px;
  left: 8px;
  font-size: 11px;
  color: #f3f4f6;
  font-weight: 500;
  letter-spacing: 26px;
  white-space: nowrap;
  pointer-events: none;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.vertical-ruler {
  background-color: rgba(31, 41, 59, 0.95);
  background-image: 
    /* Marcações principais a cada cm */ repeating-linear-gradient(
      0deg,
      transparent,
      transparent 37.795px,
      #f3f4f6 37.795px,
      #f3f4f6 39.795px
    ),
    /* Marcações médias a cada 5mm */
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 18.8975px,
        #d1d5db 18.8975px,
        #d1d5db 20.8975px
      ),
    /* Marcações pequenas a cada mm */
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 3.7795px,
        #9ca3af 3.7795px,
        #9ca3af 4.7795px
      );
  position: relative;
  backdrop-filter: blur(2px);
}

.vertical-ruler::after {
  content: "0\\A 1\\A 2\\A 3\\A 4\\A 5\\A 6\\A 7\\A 8\\A 9\\A 10\\A 11\\A 12\\A 13\\A 14\\A 15\\A 16\\A 17\\A 18\\A 19\\A 20";
  position: absolute;
  right: 2px;
  top: 8px;
  font-size: 11px;
  color: #f3f4f6;
  font-weight: 500;
  line-height: 37.795px;
  white-space: pre;
  pointer-events: none;
  writing-mode: vertical-lr;
  text-orientation: mixed;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

/* Estilos para o visualizador de código */
pre {
  font-family: "Fira Code", "Monaco", "Cascadia Code", "Roboto Mono", monospace;
  line-height: 1.5;
}

code {
  font-family: inherit;
}

.editor-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #111827;
}

.editor-content {
  flex: 1;
  overflow: hidden;
}

/* Estilização das abas */
.gjs-panel-tabs button {
  transition: all 0.2s ease;
}

.gjs-panel-tabs button:hover {
  background-color: #374151;
}

/* Melhorar o visual dos blocos */
:deep(.gjs-block) {
  background: #374151;
  border: 1px solid #4b5563;
  border-radius: 6px;
  margin: 4px;
  padding: 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #f3f4f6;
}

:deep(.gjs-block:hover) {
  background: #3b82f6;
  border-color: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

:deep(.gjs-block-category) {
  color: #f3f4f6;
  font-weight: 600;
  margin-top: 15px;
  margin-bottom: 8px;
  padding: 0 8px;
  border-bottom: 1px solid #4b5563;
}

/* Sobrescrever estilos do GrapesJS para tema escuro */
:deep(.gjs-pn-panel) {
  background: #1f2937 !important;
  border-color: #374151 !important;
}

:deep(.gjs-pn-btn) {
  color: #f3f4f6 !important;
}

:deep(.gjs-pn-btn:hover) {
  background: #374151 !important;
}

:deep(.gjs-cv-canvas) {
  background: #111827 !important;
}

/* Forçar o canvas a ocupar toda a área disponível */
:deep(.gjs-editor-cont) {
  height: 100% !important;
  width: 100% !important;
  display: flex !important;
  flex-direction: column !important;
}

:deep(.gjs-cv-canvas) {
  width: 100% !important;
  height: 100% !important;
  flex: 1 !important;
  margin: 0 !important;
  padding: 0 !important;
  background: #111827 !important;
}

:deep(.gjs-cv-canvas-c) {
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  background: #111827 !important;
}

:deep(.gjs-frame-wrapper) {
  width: 100% !important;
  height: 100% !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  margin: 0 !important;
  padding: 0 !important;
  box-sizing: border-box !important;
  background: #1f2937 !important;
}

:deep(.gjs-frame) {
  border: 2px solid #374151 !important;
  border-radius: 12px !important;
  background: white !important;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3) !important;
  max-width: calc(100% - 40px) !important;
  width: calc(100% - 40px) !important;
  height: calc(100% - 40px) !important;
  min-height: 500px !important;
  margin-top: 0px !important;
  transition: all 0.3s ease-in-out !important;
}

/* Remover qualquer margem ou padding extra do GrapesJS */
:deep(#gjs) {
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  background: #111827 !important;
  display: flex !important;
  flex-direction: column !important;
}

:deep(#gjs > *) {
  flex: 1 !important;
  height: 100% !important;
}

/* Sobrescrever a cor primária do GrapesJS para o tema do projeto */
:deep(.gjs-one-bg) {
  background-color: #1f2937 !important; /* Usar a cor de fundo do projeto */
}

/* Outras cores primárias do GrapesJS que podem aparecer */
:deep(.gjs-primary-color) {
  background-color: #111827 !important;
}

:deep([style*="background-color: var(--gjs-primary-color)"]) {
  background-color: #111827 !important;
}

/* Remover espaçamentos extras que podem causar a barra cinza */
:deep(.gjs-cv-canvas__frames) {
  margin: 0 !important;
  padding: 0 !important;
  background: #111827 !important;
}

:deep(.gjs-cv-canvas__frame) {
  margin: 0 !important;
  padding: 0 !important;
  background: #111827 !important;
}

/* Forçar elementos específicos do canvas a ocupar toda altura */
:deep(.gjs-cv-canvas.gjs-no-touch-actions.gjs-cv-canvas-bg) {
  height: 100% !important;
  width: 100% !important;
  flex: 1 !important;
  display: flex !important;
  flex-direction: column !important;
  background: #111827 !important;
}

:deep(.gjs-sm-sector) {
  border-color: #374151 !important;
}

:deep(.gjs-sm-label) {
  color: #f3f4f6 !important;
}

:deep(.gjs-sm-property) {
  border-color: #374151 !important;
}

:deep(.gjs-sm-input) {
  background: #374151 !important;
  border-color: #4b5563 !important;
  color: #f3f4f6 !important;
}

:deep(.gjs-layer) {
  color: #f3f4f6 !important;
  border-color: #374151 !important;
}

:deep(.gjs-layer:hover) {
  background: #374151 !important;
}

/* Estilos customizados para a nova toolbar */
.bg-gray-750 {
  background-color: #374151;
}

.editor-toolbar {
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(55, 65, 81, 0.5);
}

.editor-toolbar button {
  position: relative;
  overflow: hidden;
}

.editor-toolbar button::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transition: left 0.5s;
}

.editor-toolbar button:hover::before {
  left: 100%;
}

/* Indicadores de estado ativo */
.editor-toolbar button[class*="bg-blue-600"],
.editor-toolbar button[class*="bg-green-600"],
.editor-toolbar button[class*="bg-purple-600"] {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
  transform: translateY(-1px);
}

/* Animações suaves */
.editor-toolbar button,
.editor-toolbar select {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.editor-toolbar button:active {
  transform: translateY(0);
}

/* Melhorias no select */
.editor-toolbar select:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

/* Responsive */
@media (max-width: 768px) {
  .editor-toolbar .hidden {
    display: none !important;
  }

  .editor-toolbar .space-x-6 {
    gap: 1rem;
  }

  .editor-toolbar .space-x-3 {
    gap: 0.5rem;
  }
}

/* Melhorar aparência do Style Manager nativo */
:deep(.gjs-sm-container) {
  background: #1f2937 !important;
}

:deep(.gjs-sm-sector) {
  border-color: #374151 !important;
  background: #1f2937 !important;
}

:deep(.gjs-sm-sector .gjs-sm-title) {
  background: #374151 !important;
  color: #f3f4f6 !important;
  border-color: #4b5563 !important;
  padding: 12px 16px !important;
  font-weight: 600 !important;
}

:deep(.gjs-sm-properties) {
  background: #1f2937 !important;
  padding: 8px !important;
}

:deep(.gjs-sm-property) {
  border-color: #374151 !important;
  padding: 8px 12px !important;
  background: #1f2937 !important;
}

:deep(.gjs-sm-property:hover) {
  background: #374151 !important;
}

:deep(.gjs-sm-label) {
  color: #f3f4f6 !important;
  font-weight: 500 !important;
}

:deep(.gjs-sm-input) {
  background: #374151 !important;
  border: 1px solid #4b5563 !important;
  color: #f3f4f6 !important;
  border-radius: 4px !important;
  padding: 6px 8px !important;
}

:deep(.gjs-sm-input:focus) {
  border-color: #3b82f6 !important;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3) !important;
}

:deep(.gjs-sm-btn) {
  background: #374151 !important;
  border: 1px solid #4b5563 !important;
  color: #f3f4f6 !important;
  border-radius: 4px !important;
  padding: 6px 12px !important;
}

:deep(.gjs-sm-btn:hover) {
  background: #3b82f6 !important;
  border-color: #2563eb !important;
}

:deep(.gjs-sm-color-picker) {
  background: #374151 !important;
  border: 1px solid #4b5563 !important;
}

:deep(.gjs-sm-select) {
  background: #374151 !important;
  border: 1px solid #4b5563 !important;
  color: #f3f4f6 !important;
  border-radius: 4px !important;
}

/* Estilos para o Selector Manager (Classes CSS) */
:deep(.gjs-clm-container) {
  background: #1f2937 !important;
  border-bottom: 1px solid #374151 !important;
  margin-bottom: 16px !important;
}

:deep(.gjs-clm-header) {
  background: #374151 !important;
  border-bottom: 1px solid #4b5563 !important;
  padding: 12px 16px !important;
}

:deep(.gjs-clm-header-label) {
  color: #f3f4f6 !important;
  font-weight: 600 !important;
  font-size: 14px !important;
}

:deep(.gjs-clm-tags) {
  background: #1f2937 !important;
  padding: 12px 16px !important;
}

:deep(.gjs-clm-tag) {
  background: #4b5563 !important;
  border: 1px solid #6b7280 !important;
  border-radius: 4px !important;
  margin: 2px !important;
  color: #f3f4f6 !important;
  padding: 4px 8px !important;
  font-size: 12px !important;
}

:deep(.gjs-clm-tag:hover) {
  background: #3b82f6 !important;
  border-color: #2563eb !important;
}

:deep(.gjs-clm-tag.gjs-clm-tag--selected) {
  background: #059669 !important;
  border-color: #047857 !important;
}

:deep(.gjs-clm-tags-btn) {
  background: #059669 !important;
  border: 1px solid #047857 !important;
  border-radius: 4px !important;
  color: white !important;
  padding: 4px 8px !important;
  margin: 2px !important;
  font-size: 12px !important;
}

:deep(.gjs-clm-tags-btn:hover) {
  background: #047857 !important;
}

/* Melhorias para mudança de dispositivos */
:deep(.gjs-cv-canvas) {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

:deep(.gjs-frame-wrapper) {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

/* Estilos específicos para dispositivos - Mais visuais */
:deep(.gjs-device-desktop .gjs-frame),
:deep(.gjs-cv-canvas[data-device="Desktop"] .gjs-frame) {
  max-width: calc(100% - 40px) !important;
  width: calc(100% - 40px) !important;
  border-color: #10b981 !important;
  border-width: 3px !important;
  box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3) !important;
}

:deep(.gjs-device-tablet .gjs-frame),
:deep(.gjs-cv-canvas[data-device="Tablet"] .gjs-frame) {
  max-width: 768px !important;
  width: 768px !important;
  border-color: #3b82f6 !important;
  border-width: 3px !important;
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3) !important;
}

:deep(.gjs-device-mobile .gjs-frame),
:deep(.gjs-cv-canvas[data-device="Mobile"] .gjs-frame) {
  max-width: 375px !important;
  width: 375px !important;
  border-color: #8b5cf6 !important;
  border-width: 3px !important;
  box-shadow: 0 10px 25px rgba(139, 92, 246, 0.3) !important;
}

/* Estilos para o container do canvas */
:deep(.gjs-cv-canvas) {
  transition: all 0.3s ease-in-out !important;
}

:deep(.gjs-frame) {
  margin: 0 auto !important;
  transition: all 0.3s ease-in-out !important;
  border-style: solid !important;
  border-radius: 8px !important;
}

/* Estilos para destacar quando está em modo tablet/mobile */
:deep(.gjs-cv-canvas[data-device="Tablet"]) {
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.1),
    rgba(59, 130, 246, 0.05)
  ) !important;
}

:deep(.gjs-cv-canvas[data-device="Mobile"]) {
  background: linear-gradient(
    135deg,
    rgba(139, 92, 246, 0.1),
    rgba(139, 92, 246, 0.05)
  ) !important;
}

/* Indicador visual do dispositivo ativo */
:deep(.gjs-cv-canvas[data-device="Desktop"]) {
  background: radial-gradient(
    circle at center,
    rgba(16, 185, 129, 0.05) 0%,
    #111827 70%
  ) !important;
}

:deep(.gjs-cv-canvas[data-device="Tablet"]) {
  background: radial-gradient(
    circle at center,
    rgba(59, 130, 246, 0.05) 0%,
    #111827 70%
  ) !important;
}

:deep(.gjs-cv-canvas[data-device="Mobile"]) {
  background: radial-gradient(
    circle at center,
    rgba(139, 92, 246, 0.05) 0%,
    #111827 70%
  ) !important;
}

/* Melhorar seletor de dispositivos */
.editor-toolbar select {
  border: 1px solid transparent !important;
  transition: all 0.2s ease !important;
}

.editor-toolbar select:focus {
  transform: scale(1.02) !important;
  border-color: #3b82f6 !important;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3) !important;
}

.editor-toolbar select option {
  transition: all 0.2s ease !important;
  padding: 8px 12px !important;
}

.editor-toolbar select option:hover {
  background-color: #374151 !important;
}
</style>
