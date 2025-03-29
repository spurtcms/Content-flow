
import { Inter } from "next/font/google";
import "./globals.css";
import "../../public/app.css"
import Header from "./components/header";
import { DarkThemeProvider } from "./utilities/Theme/DarkThemeProvider";
import NextTopLoader from "nextjs-toploader";
import Head from "next/head";
import Script from "next/script";
import CustomProviders from "@/StoreConfiguration/CustomProviders";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "spurtCMS Blog Template",
  description: "spurtCMS Blog Template",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en" >
   
      {/* <Head>
     
      </Head> */}
      <body className="bg-transparent">
        <CustomProviders>

      <NextTopLoader
            color="#00AEEF"
            initialPosition={0.08}
            crawlSpeed={200}
            height={4}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        //     template='<div class="bar" role="bar"><div class="peg"></div></div> 
        // <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
            zIndex={1600}
            showAtBottom={false}
          />
        <DarkThemeProvider>
      <main className="container min-h-screen mx-auto max-w-screen-lg">
      <Header/>
      {/* <Script src="/app.js" strategy="afterInteractive"/> */}
      {children}
     
      </main>
      </DarkThemeProvider>
        </CustomProviders>
      
      </body>
   
    </html>
  );
}
