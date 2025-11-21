import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --color-primary: #02bcf5;
    --color-primary-hover: #0a2540;
    --color-bg: #f6f9fc;
    --color-bg-secondary: #ffffff;
    --color-bg-hover: #e7ecf1;
    --color-bg-muted: #f0f2f5;
    --color-bg-muted-hover: #e1e6eb;
    --color-bg-gray: #e7ecf1;
    --color-bg-gray-light: #f6f9fc;
    --color-text: #425466;
    --color-text-title: #0a2540;
    --color-text-inverse: #ffffff;
    --color-border: rgba(0, 0, 0, 0.04);
    --color-error: #ff3b30;
    --color-success: #00d924;
    --space-xs: 4px;
    --space-sm: 8px;
    --space-md: 12px;
    --space-lg: 20px;
    --space-xl: 32px;
    --space-xxl: 48px;
    --space-gutter: 1.25rem;
    --nav-height: 48px;
    --width-container: 1040px;
    --width-hero: 600px;
    --width-sidebar-account: 220px;
    --width-sidebar-cart: 340px;
    --width-cart-image: 84px;
    --width-cart-empty: 460px;
    --font-family: Sohne, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif;
    --font-weight-light: 300;
    --font-weight-regular: 400;
    --font-weight-medium: 500;
    --font-size-hero: 5.875rem;
    --font-size-lg: 1.25rem;
    --font-size-base: 1rem;
    --font-size-sm: 0.875rem;
    --font-size-xs: 0.75rem;
    --line-height-tight: 1.05;
    --line-height-base: 1.4;
    --line-height-relaxed: 1.7;
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-full: 9999px;
    --shadow: 0 1px 3px rgba(50,50,93,0.08), 0 1px 0 rgba(0,0,0,0.02);
    --opacity-nav-hover: 0.7;
  }

  html, body {
    margin: 0;
    padding: 0;
    font-family: var(--font-family);
    font-size: var(--font-size-base);
    background: var(--color-bg);
    color: var(--color-text);
    -webkit-font-smoothing: antialiased;
  }

  * {
    font-family: var(--font-family) !important;
  }

  p {
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-regular);
    line-height: var(--line-height-relaxed);
    margin: 0 0 1.2rem 0;
  }

  .body-large {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-regular);
    line-height: var(--line-height-relaxed);
  }

  .caption {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-regular);
    opacity: 0.8;
  }

  .overline {
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-medium);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    opacity: 0.75;
  }
`;
