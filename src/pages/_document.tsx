import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <style>{`
            @font-face {
              font-family: 'Sohne';
              src: url('/fonts/TestSohne-Buch-BF663d89cd32e6a.otf') format('opentype');
              font-weight: 300;
              font-style: normal;
              font-display: swap;
            }
            @font-face {
              font-family: 'Sohne';
              src: url('/fonts/TestSohne-Kraftig-BF663d89cd37e26.otf') format('opentype');
              font-weight: 400;
              font-style: normal;
              font-display: swap;
            }
            @font-face {
              font-family: 'Sohne';
              src: url('/fonts/TestSohne-Halbfett-BF663d89cd2d67b.otf') format('opentype');
              font-weight: 500;
              font-style: normal;
              font-display: swap;
            }
            @font-face {
              font-family: 'Sohne';
              src: url('/fonts/TestSohne-Fett-BF663d89cca89ff.otf') format('opentype');
              font-weight: 600;
              font-style: normal;
              font-display: swap;
            }
          `}</style>
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
