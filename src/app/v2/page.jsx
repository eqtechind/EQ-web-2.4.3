"use client"
import Footer from "./_components/home/Footer";
import FAQ from "./_components/home/FAQ";
import HeroSection from "./_components/home/HeroSection";
import HeroSection2 from "./_components/home/HeroSection2";
import Stat from "./_components/home/Stat";
import Navbar from "./_components/Navbar";
import Link from "next/link";
const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <HeroSection2 />
      <Stat />
      <FAQ />
      <div className="w-full flex flex-col items-center justify-center p-20 gap-4 bg-[#f2f2f2]">
        <h1 className="text-4xl font-bold font-[inter]">Sign up today.</h1>
        <Link href="/Startup-signup">
          <button className="get-started-btn h-10">Get Started</button>
        </Link>
      </div>
      <Footer/>
    </>
  );
};
export default Home;
