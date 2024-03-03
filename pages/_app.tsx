import "@shopify/polaris/build/esm/styles.css";
import { AppProvider as PolarisProvider } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PolarisProvider i18n={enTranslations}>
      <Component {...pageProps} />
    </PolarisProvider>
  );
}
