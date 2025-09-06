/**
 * Utilitários para otimização de event listeners
 * Evita warnings de passive listeners e melhora performance
 */

export interface OptimizedEventOptions extends AddEventListenerOptions {
  passive?: boolean;
  once?: boolean;
  capture?: boolean;
}

/**
 * Adiciona event listener otimizado com passive como padrão
 */
export function addOptimizedListener(
  element: Element | Document | Window,
  event: string,
  handler: EventListener,
  options: OptimizedEventOptions = {}
): void {
  const optimizedOptions: OptimizedEventOptions = {
    passive: true, // Padrão para melhor performance
    ...options,
  };

  // Para eventos que precisam de preventDefault, remover passive
  const preventDefaultEvents = [
    "submit",
    "keydown",
    "keyup",
    "dragstart",
    "drop",
  ];
  if (preventDefaultEvents.includes(event) && !("passive" in options)) {
    optimizedOptions.passive = false;
  }

  element.addEventListener(event, handler, optimizedOptions);
}

/**
 * Classe para gerenciar múltiplos listeners de forma otimizada
 */
export class BlockEventManager {
  private listeners: Array<{
    element: Element | Document | Window;
    event: string;
    handler: EventListener;
    options?: OptimizedEventOptions;
  }> = [];

  /**
   * Adiciona listener otimizado e o rastreia para limpeza posterior
   */
  add(
    element: Element | Document | Window,
    event: string,
    handler: EventListener,
    options: OptimizedEventOptions = {}
  ): void {
    addOptimizedListener(element, event, handler, options);
    this.listeners.push({ element, event, handler, options });
  }

  /**
   * Remove todos os listeners registrados
   */
  removeAll(): void {
    this.listeners.forEach(({ element, event, handler, options }) => {
      element.removeEventListener(event, handler, options as any);
    });
    this.listeners = [];
  }

  /**
   * Remove listener específico
   */
  remove(
    element: Element | Document | Window,
    event: string,
    handler: EventListener
  ): void {
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

/**
 * Throttle para eventos de scroll, resize, etc.
 */
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: number | null = null;
  let lastExecTime = 0;

  return (...args: Parameters<T>) => {
    const currentTime = Date.now();

    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = window.setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
}

/**
 * Debounce para eventos de input, search, etc.
 */
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: number | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = window.setTimeout(() => {
      func(...args);
    }, delay);
  };
}
