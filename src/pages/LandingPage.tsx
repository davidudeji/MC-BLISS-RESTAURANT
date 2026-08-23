import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/sections/Hero';
import { BrandStory } from '../components/sections/BrandStory';
import { Carousel } from '../components/sections/Carousel';
import { MenuSection } from '../components/sections/MenuSection';
import { ServicesSection } from '../components/sections/ServicesSection';
import { OrderCTA } from '../components/sections/OrderCTA';
import { ContactSection } from '../components/sections/ContactSection';
import { CartDrawer } from '../components/cart/CartDrawer';

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <main>
        <Hero />
        <BrandStory />
        <Carousel />
        <MenuSection />
        <ServicesSection />
        <OrderCTA />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
