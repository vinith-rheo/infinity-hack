import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import movieData from "../data.json";
import MovieCarousel from "./MovieCarousel";
import { useAuth, UserButton } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import Header from "./Header";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import "../styles/landing.css";
import { getMovies, type Movie } from "@/services";
import Home from "../Home/Home"
import Explore from "@/Explore/Explore";
import Watchlist from "@/Watchlist/Watchlist";

export default function Landing() {
  const [activeTab, setActiveTab] = useState('home');
  const { isSignedIn, getToken } = useAuth();


 const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home activeTab='home'/>;
      case 'explore':
        return <Explore />;
      case 'watchlist':
        return <Watchlist />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="landing-container">
<div className="landing-page">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isSignedIn={isSignedIn ?? false} 
      />
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
      
      
      {/* Main Content */}

    </div>
  );
}