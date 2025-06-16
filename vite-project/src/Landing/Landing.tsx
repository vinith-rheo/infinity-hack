import Home from "../Home/Home";
import "../styles/landing.css";

export default function Landing() {
  return (
    <div className="landing-container">
      <main className="main-content">
        <Home activeTab="home" />
      </main>
    </div>
  );
}