/**
 * This App component is the top-level component which will be common across
 * all the different pages. You can use this App component to keep state
 * when navigating between pages, for example.
 */

import '../styles/global.css'
import * as gtag from "lib/gtag";
import Script from "next/script";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";

export default function App({Component, pageProps}) {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>

      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gtag.GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </Head>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />

      <Component {...pageProps} />
    </>
  )
}
