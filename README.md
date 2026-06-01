# 🌐 [VER EN PRODUCCIÓN / LIVE DEMO](https://portfolio-taupe-eight-ne7xtliknm.vercel.app/)

---

# 🚀 Interactive Software Engineer Portfolio

Un portafolio de ingeniería de software moderno y premium, inspirado en la estética visual de un Entorno de Desarrollo Integrado (IDE). Diseñado bajo una estructura de **Bento Grid** con animaciones fluidas, consumo en tiempo real de la API de GitHub, soporte multilingüe y un índice detallado del stack tecnológico.

## ✨ Características Principales

*   🌌 **Aesthetic Dark IDE Theme:** Interfaz oscura construida con efectos de vidrio esmerilado (*glassmorphism*), bordes suaves y micro-animaciones interactivas al hacer hover.
*   📊 **Integración Dinámica con GitHub API:** Los proyectos se alimentan en tiempo real consumiendo la API REST de GitHub (mostrando cantidad de commits, estrellas, forks y tags de lenguajes).
*   🔧 **Soporte Multi-Repositorio:** Las tarjetas de proyectos detectan proyectos divididos y renderizan de forma inteligente botones independientes para **Código Frontend** y **Código Backend**.
*   💻 **Stack Técnico Detallado (`/stack`):** Un mapa interactivo que organiza más de 35 tecnologías entre lenguajes, frameworks, bases de datos y herramientas de desarrollo con sus logos oficiales de marca.
*   📱 **Bottom Nav Responsive:** En dispositivos móviles, la barra de navegación lateral se condensa en una barra inferior fija que agrupa las secciones secundarias (*Certificaciones* y *Contacto*) bajo un menú flotante de "Más" (MÁS) con desenfoque de fondo y cierre automático al hacer clic fuera.
*   🗣️ **Localización Bilingüe (EN/ES):** Sistema integrado de traducción mediante un context provider que permite alternar todo el contenido entre inglés y español al instante.
*   📬 **Bento de Contacto:** Incluye tarjetas interactivas con funciones rápidas como copiar correo al portapapeles con un clic y descarga directa del CV.

---

## 🛠️ Stack Tecnológico

*   **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
*   **Compilador:** Next.js Turbopack (compilación y recarga ultrarrápida)
*   **Librería UI:** [React](https://react.dev/)
*   **Estilos:** [Tailwind CSS](https://tailwindcss.com/) & CSS3 Vanilla
*   **Animaciones:** [Framer Motion](https://www.framer.com/motion/) (para transiciones y efectos de entrada)
*   **Iconos:** [Lucide React](https://lucide.dev/) & [Simple Icons](https://simpleicons.org/)
*   **API Proxy:** Next.js Route Handlers para peticiones seguras a GitHub en el lado del servidor.

---

## ⚙️ Configuración e Instalación

### Requisitos Previos

Asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior) en tu sistema.

### Pasos para iniciar el proyecto

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/asanabria-2021067/my-portfolio.git
   cd my-portfolio
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Configura el token de GitHub:**
   Crea un archivo `.env.local` en la raíz del proyecto para habilitar las peticiones a la API de GitHub:
   ```env
   GITHUB_TOKEN="tu_personal_access_token_de_github"
   ```
   *Nota: Si no se configura un token, el portafolio funcionará pero puede verse limitado por la tasa de peticiones públicas de GitHub.*

4. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

5. **Compila la aplicación para producción:**
   ```bash
   npm run build
   ```

---

## 📂 Estructura del Proyecto

```text
├── app/                  # Enrutamiento de Next.js (App Router)
│   ├── api/              # Handlers de la API Serverless (GitHub proxy)
│   ├── certifications/   # Vista de Certificaciones y Diplomas
│   ├── contact/          # Vista de Contacto bento-style
│   ├── projects/         # Detalle y grid interactivo de repositorios
│   ├── stack/            # Detalle y desglose de tecnologías
│   ├── globals.css       # Estilos globales y variables de tema (claro/oscuro)
│   ├── layout.tsx        # Layout principal y configuración de metadatos/iconos
│   └── page.tsx          # Homepage bento grid
├── components/           # Componentes reutilizables de React
│   ├── BentoCard.tsx     # Tarjetas contenedor con efecto hover premium
│   ├── BottomNav.tsx     # Barra de navegación inferior móvil con Popover
│   ├── TechStack.tsx     # Preview lateral de tecnologías
│   ├── FileTreeNav.tsx   # Menú de navegación lateral simulando un árbol de archivos
│   └── PreferencesProvider.tsx # Manejo de idioma (EN/ES)
├── lib/                  # Funciones de utilidad y consultas de API
│   └── github.ts         # Peticiones y overrides locales para repositorios
└── public/               # Recursos estáticos (imágenes, PDF de CV, logo.svg)
```

---

## 🔗 Enlaces de Interés

*   **Despliegue de Producción (Vercel):** [Ver Portafolio Online](https://portfolio-taupe-eight-ne7xtliknm.vercel.app/)
*   **Creado por:** Angel Sanabria

---
