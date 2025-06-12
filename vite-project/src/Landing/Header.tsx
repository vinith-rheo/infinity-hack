import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import logo from './logo.svg';
import searchLogo from './searchIcon.svg';
import '../styles/header.css';

const Header = () => {
      const navigate = useNavigate();

  return (
    <header className="header-container">
      <div className="header-logo">
        <img src={logo} alt="Logo" className="ml-14"/>
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
    </header>
  );
};

export default Header;