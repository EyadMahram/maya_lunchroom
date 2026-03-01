import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MenuSection from "@/components/MenuSection";
import GallerySection from "@/components/GallerySection";
import AboutSection from "@/components/AboutSection";
import ReservationSection from "@/components/ReservationSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <MenuSection />
      <GallerySection />
      <ReservationSection />
      <FooterSection />
    </div>
  );
};

export default Index;
