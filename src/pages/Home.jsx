import DeliveryPartners from "../components/DeliveryPartners"
import FeaturedProducts from "../components/FeaturedProducts"
import Hero from "../components/Hero"
import Newsletter from "../components/NewsLetter"
import ServicesSection from "../components/ServicesSection"

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <ServicesSection />
      <DeliveryPartners />
      <Newsletter />
    </>
  )
}

export default Home