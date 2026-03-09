@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap");

@tailwind base;
@tailwind components;
@tailwind utilities;

/* Definition of the design system. All colors MUST be HSL. */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 265 4% 12.9%;
    --card: 0 0% 100%;
    --card-foreground: 265 4% 12.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 265 4% 12.9%;

    --primary: 221 62% 34%;
    --primary-foreground: 0 0% 100%;

    --secondary: 248 0.7% 96.8%;
    --secondary-foreground: 266 4% 20.8%;
    --muted: 248 0.7% 96.8%;
    --muted-foreground: 257 4.6% 55.4%;
    --accent: 248 0.7% 96.8%;
    --accent-foreground: 266 4% 20.8%;
    --border: 256 1.3% 92.9%;
    --input: 256 1.3% 92.9%;
    --ring: 221 62% 34%;
    --destructive: 27 24.5% 57.7%;
    --destructive-foreground: 0 0% 100%;

    --sidebar: 248 0.3% 98.4%;
    --sidebar-foreground: 265 4% 12.9%;
    --sidebar-primary: 221 62% 34%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 248 0.7% 96.8%;
    --sidebar-accent-foreground: 266 4% 20.8%;
    --sidebar-border: 256 1.3% 92.9%;
    --sidebar-ring: 221 62% 34%;

    --font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
    --radius: 0.375rem;

    /* Este es tu azul brand */
    --brand-blue: 221 62% 34%;
  }

  .dark {
    --background: 0 0% 15%;
    --foreground: 248 0.3% 98.4%;
    --card: 266 4% 20.8%;
    --card-foreground: 248 0.3% 98.4%;
    --popover: 266 4% 20.8%;
    --popover-foreground: 248 0.3% 98.4%;

    --primary: 221 62% 34%;
    --primary-foreground: 0 0% 100%;

    --secondary: 260 4.1% 27.9%;
    --secondary-foreground: 248 0.3% 98.4%;
    --muted: 260 4.1% 27.9%;
    --muted-foreground: 257 4% 70.4%;
    --accent: 260 4.1% 27.9%;
    --accent-foreground: 248 0.3% 98.4%;
    --border: 0 0% 100% / 10%;
    --input: 0 0% 100% / 15%;
    --ring: 221 62% 34%;
    --destructive: 22 19.1% 70.4%;
    --destructive-foreground: 248 0.3% 98.4%;

    --sidebar-primary: 221 62% 34%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-ring: 221 62% 34%;

    --brand-blue: 221 62% 34%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-background text-foreground font-sans antialiased;
  }
}

@layer utilities {
  @keyframes slideUpFade {
    0% {
      opacity: 0;
      transform: translateY(22px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-slideUp1 {
    animation: slideUpFade 650ms ease-out both;
    animation-delay: 80ms;
  }

  .animate-slideUp2 {
    animation: slideUpFade 650ms ease-out both;
    animation-delay: 160ms;
  }

  .animate-slideUp3 {
    animation: slideUpFade 650ms ease-out both;
    animation-delay: 240ms;
  }

  .animate-slideUp4 {
    animation: slideUpFade 650ms ease-out both;
    animation-delay: 320ms;
  }

  .animate-slideUp5 {
    animation: slideUpFade 650ms ease-out both;
    animation-delay: 400ms;
  }

  /* Utilidades brand correctas */
  .bg-brand {
    background-color: hsl(var(--brand-blue));
  }

  .text-brand {
    color: hsl(var(--brand-blue));
  }

  .border-brand {
    border-color: hsl(var(--brand-blue));
  }

  .from-brand {
    --tw-gradient-from: hsl(var(--brand-blue)) var(--tw-gradient-from-position);
    --tw-gradient-to: hsl(var(--brand-blue) / 0) var(--tw-gradient-to-position);
    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
  }

  .to-brand\/80 {
    --tw-gradient-to: hsl(var(--brand-blue) / 0.8) var(--tw-gradient-to-position);
  }

  .hover\:bg-brand:hover {
    background-color: hsl(var(--brand-blue));
  }

  .hover\:text-brand:hover {
    color: hsl(var(--brand-blue));
  }

  /* Hide horizontal scrollbar for sliders */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }

  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .animate-slideUp1,
    .animate-slideUp2,
    .animate-slideUp3,
    .animate-slideUp4,
    .animate-slideUp5 {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
  }
}
