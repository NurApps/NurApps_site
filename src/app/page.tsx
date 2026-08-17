"use client";

import { ThemeProvider } from "@/components/ThemeProvider";
import { I18nProvider } from "@/components/I18nProvider";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AppCatalog from "@/components/AppCatalog";
import FAQ from "@/components/FAQ";
import News from "@/components/News";
import About from "@/components/About";
import Newsletter from "@/components/Newsletter";
import ScrollToTop from "@/components/ScrollToTop";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <div className="min-h-screen">
          <Header />
          <main>
            <Hero />
            <AppCatalog />
            <Newsletter />
            <FAQ />
            <News />
            <About />
          </main>
          <Footer />
          <ScrollToTop />
        </div>
      </I18nProvider>
    </ThemeProvider>
  );
}
