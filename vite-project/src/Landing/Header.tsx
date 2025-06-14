import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import logo from './logo.svg';
import searchLogo from './searchIcon.svg';
import '../styles/header.css';
import { UserButton } from "@clerk/clerk-react";

interface HeaderProps {
  isSignedIn: boolean;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

const Header = ({ isSignedIn,activeTab, setActiveTab }: HeaderProps) => {
  const navigate = useNavigate();

  const handleNavClick = (tabName: string) => {
    if (setActiveTab) {
      setActiveTab(tabName);
    }
  };

  return (
    <div className="header-wrapper">
    <header className="header-container">
      <div className="header-left-section">
        <div className="header-logo">
          <img 
            src={logo} 
            alt="Logo"
            onClick={() => handleNavClick('home')}
            style={{ cursor: 'pointer' }}
          />
        </div>
        
        <div className="header-nav-links">
          <span 
            className={`nav-link ${activeTab === 'home' ? 'active' : 'inactive'}`}
            onClick={() => handleNavClick('home')} // Set active tab to 'home'
          >
            Home
          </span>
          <span 
            className={`nav-link ${activeTab === 'explore' ? 'active' : 'inactive'}`}
            onClick={() => handleNavClick('explore')} // Set active tab to 'explore'
          >
            Movies Recommendation
          </span>
          {isSignedIn && (
            <span 
              className={`nav-link ${activeTab === 'watchlist' ? 'active' : 'inactive'}`}
              onClick={() => handleNavClick('watchlist')} // Set active tab to 'watchlist'
            >
              Watchlist
            </span>
          )}
        </div>
      </div>

      <div className="header-actions">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
          />
          <img
            src={searchLogo}
            width={20}
            height={20}
            alt="Search"
            className="search-icon"
          />
        </div>

        {!isSignedIn ? (
          <div className="auth-buttons">
            <Button 
              className="login"
              onClick={() => navigate("/signup")}
            >
              Login        
            </Button>
            <Button 
              className="signup"
              onClick={() => navigate("/signup")}
            >
              Sign up       
            </Button>
          </div>
        ) : (
          <div className="user-button-wrapper">
            <UserButton afterSignOutUrl={"/"} />
          </div>
        )}
      </div>
    </header>
    </div>

  );
};

export default Header;