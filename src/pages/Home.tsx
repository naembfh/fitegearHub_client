import Banner from "../components/Banner";
import CategoryGrid from "../components/CategoryGrid";
import Container from "../components/Container";
import Products from "../components/Products";

export default function Home() {
  return (
    <>
      <Banner></Banner>
      <Container>
        <CategoryGrid></CategoryGrid>
        <Products></Products>
      </Container>
    </>
  );
}
