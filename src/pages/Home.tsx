import Banner from "../components/Banner";
import BenefitsSection from "../components/BenefitsSection";
import CategoryGrid from "../components/CategoryGrid";
import Container from "../components/Container";
import FeaturedProducts from "../components/FeaturedProducts";
import Footer from "../components/Footer";
import ImageGallery from "../components/ImageGallery";

export default function Home() {
  return (
    <>
      <Banner></Banner>
      <Container>
        <CategoryGrid></CategoryGrid>
        <FeaturedProducts></FeaturedProducts>
        <BenefitsSection></BenefitsSection>
        <ImageGallery></ImageGallery>
      </Container>
      <Footer></Footer>
    </>
  );
}
