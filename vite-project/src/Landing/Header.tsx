import { useNavigate, useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import logo from './logo.svg';
import searchLogo from './searchIcon.svg';
import '../styles/header.css';
import { UserButton } from "@clerk/clerk-react";

interface HeaderProps {
  isSignedIn: boolean;
}

const Header = ({ isSignedIn }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path ? "active" : "inactive";

  return (
    <div className="header-wrapper">
    <header className="header-container">
      <div className="header-left-section">
        <div className="header-logo">
          <img 
            src={logo} 
            alt="Logo"
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          />
        </div>
        
        <div className="header-nav-links">
          <span 
            className={`nav-link ${isActive('/')}`}
            onClick={() => navigate('/')}
          >
            Home
          </span>
          <span 
            className={`nav-link ${isActive('/recommendations')}`}
            onClick={() => navigate('/recommendations')}
          >
            Recommendations
          </span>
          {isSignedIn && (
            <span 
              className={`nav-link ${isActive('/watchlist')}`}
              onClick={() => navigate('/watchlist')}
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