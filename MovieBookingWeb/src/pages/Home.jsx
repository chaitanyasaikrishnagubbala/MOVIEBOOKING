import { useState } from "react";
import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import SearchBar from "../components/SearchBar";
import MovieSection from "../components/MovieSection";
import Footer from "../components/Footer";

function Home() {

  const [searchText, setSearchText] = useState("");

  return (
    <>
      <Navbar />

      <HeroBanner />

      <SearchBar onSearch={setSearchText} />

      <MovieSection searchText={searchText} />

      <Footer />
    </>
  );
}

export default Home;