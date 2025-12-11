import React from "react";
import Header from "../components/landing/Header";
import Banner from "../components/landing/Banner";
import Testimonials from "../components/Testimonios/Testimonials";
import CallToAction from "../components/CallToAction/CallToAction";
import FAQ from "../components/landing/FAQ";
import Footer from "../components/landing/Footer";
import BenefitsSection from "../components/landing/BenefitsSection";
import ServicesSection from "../components/landing/ServicesSection";
import InfoSection from "../components/landing/InfoSection";

const LandingPage = () => {
  return (
    <>
      <Header />
      <Banner />
      <ServicesSection/>
      <InfoSection />
      <BenefitsSection />
      <Testimonials />
      <FAQ />
      <CallToAction />
      <Footer />
    </>
  );
};

export default LandingPage;
