// templates/landing-page-moderna/index.ts
import type { TemplateDefinition } from "../index";

const template: TemplateDefinition = {
  id: "landing-page-moderna",
  label: "Landing Page Moderna",
  category: "Páginas Web",
  description:
    "Uma landing page moderna com hero section, features e call-to-action",
  thumbnail: `data:image/svg+xml;base64,${btoa(`
    <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="200" fill="#1e293b"/>
      <rect x="20" y="20" width="260" height="40" fill="#3b82f6" rx="4"/>
      <rect x="20" y="80" width="120" height="30" fill="#64748b" rx="4"/>
      <rect x="160" y="80" width="120" height="30" fill="#64748b" rx="4"/>
      <rect x="20" y="130" width="80" height="20" fill="#22c55e" rx="4"/>
      <text x="150" y="45" text-anchor="middle" fill="white" font-size="12">Landing Page</text>
    </svg>
  `)}`,
  // Template simplificado - remova o CSS inline e use classes
  content: `
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-container">
        <h1>Transforme Suas Ideias em Realidade</h1>
        <p>Crie websites incríveis sem conhecimento técnico</p>
        <div class="hero-buttons">
          <button class="btn-primary">Começar Gratuitamente</button>
          <button class="btn-secondary">Ver Demonstração</button>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="container">
        <div class="section-header">
          <h2>Por que escolher nossa plataforma?</h2>
          <p>Oferecemos as melhores ferramentas para criar websites profissionais rapidamente</p>
        </div>
        
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3>Rápido e Fácil</h3>
            <p>Crie páginas profissionais em minutos</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📱</div>
            <h3>Responsivo</h3>
            <p>Funciona em todos os dispositivos</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🎨</div>
            <h3>Personalizável</h3>
            <p>Centenas de templates disponíveis</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <h2>Pronto para começar?</h2>
        <p>Junte-se a milhares de usuários</p>
        <button class="btn-primary">Criar Conta Gratuita</button>
      </div>
    </section>
  `,
  css: `
    .hero-section {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: white;
      padding: 2rem 1rem;
    }
    
    .hero-container {
      max-width: 800px;
    }
    
    .hero-section h1 {
      font-size: 3.5rem;
      font-weight: bold;
      margin-bottom: 1.5rem;
      line-height: 1.2;
    }
    
    .hero-section p {
      font-size: 1.25rem;
      margin-bottom: 2rem;
      opacity: 0.9;
      line-height: 1.6;
    }
    
    .hero-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }
    
    .btn-primary {
      background: #22c55e;
      color: white;
      padding: 1rem 2rem;
      border: none;
      border-radius: 8px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .btn-secondary {
      background: transparent;
      color: white;
      padding: 1rem 2rem;
      border: 2px solid white;
      border-radius: 8px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .features-section {
      padding: 6rem 2rem;
      background: #f8fafc;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .section-header {
      text-align: center;
      margin-bottom: 4rem;
    }
    
    .section-header h2 {
      font-size: 2.5rem;
      font-weight: bold;
      color: #1e293b;
      margin-bottom: 1rem;
    }
    
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }
    
    .feature-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    
    .feature-icon {
      width: 64px;
      height: 64px;
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      border-radius: 50%;
      margin: 0 auto 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }
    
    .cta-section {
      padding: 6rem 2rem;
      background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
      text-align: center;
      color: white;
    }
    
    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.25);
    }
    
    @media (max-width: 768px) {
      .hero-section h1 {
        font-size: 2.5rem;
      }
      
      .section-header h2 {
        font-size: 2rem;
      }
      
      .features-section,
      .cta-section {
        padding: 4rem 1rem;
      }
    }
  `,
};

export default template;
