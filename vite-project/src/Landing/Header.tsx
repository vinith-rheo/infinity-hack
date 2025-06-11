import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

const Header = () => {
      const navigate = useNavigate();

  return (
    <header style={{ 
      backgroundColor: "black",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem",
      width: "100%",
      position: "relative",
      zIndex: 1000
    }}>
      <div style={{ 
  display: "flex", 
  alignItems: "center",
  gap: "12px" 
}}>
 
  <svg
    width="32px"
    height="32px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      filter: "drop-shadow(0 0 2px rgba(0,128,91,0.8))"  
    }}
  >
    <path
      d="M2 8C2 6.11438 2 5.17157 2.58579 4.58579C3.17157 4 4.11438 4 6 4H7.52779C7.63786 4 7.69289 4 7.74111 3.99069C7.78373 3.98244 7.82472 3.96891 7.86301 3.95043C7.90691 3.92917 7.94518 3.89885 8.02172 3.83821L9.29289 2.79289C9.92286 2.30454 10.2378 2.06036 10.5907 1.94512C10.9036 1.84232 11.2365 1.84232 11.5494 1.94512C11.9023 2.06036 12.2171 2.30454 12.8471 2.79289L14.1183 3.83821C14.1948 3.89885 14.2331 3.92917 14.277 3.95043C14.3153 3.96891 14.3563 3.98244 14.3989 3.99069C14.4471 4 14.5022 4 14.6122 4H18C19.8856 4 20.8284 4 21.4142 4.58579C22 5.17157 22 6.11438 22 8V16C22 17.8856 22 18.8284 21.4142 19.4142C20.8284 20 19.8856 20 18 20H6C4.11438 20 3.17157 20 2.58579 19.4142C2 18.8284 2 17.8856 2 16V8Z"
      stroke="#00805b"  
      strokeWidth="1.5"
    />
    <path
      d="M15 13C15 14.6569 13.6569 16 12 16C10.3431 16 9 14.6569 9 13C9 11.3431 10.3431 10 12 10C13.6569 10 15 11.3431 15 13Z"
      stroke="#00805b"
      strokeWidth="1.5"
    />
  </svg>

  
  <span style={{
    fontSize: "1.8rem",
    fontWeight: "800",
    color: "#F0F0F0",
    textShadow: "0 0 8px rgba(0,128,91,0.6)",  
    letterSpacing: "1px",
    fontFamily: "'Arial Black', sans-serif"
  }}>
    MOVIESDA
  </span>
</div>
      <div style={{ 
        display: "flex", 
        alignItems: "center",
        gap: "1rem"
      }}>
        <div style={{ 
          position: "relative",
          display: "flex",
          alignItems: "center"
        }}>
          <input
            type="text"
            placeholder="Search movies..."
                style={{
                padding: "0.5rem 1rem 0.5rem 2.5rem",
                borderRadius: "4px",
                border: "none",
                background: "#333",
                color: "#F0F0F0",
                minWidth: "250px",
                zIndex: 1000,
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                transition: "background 0.3s ease",
                outline: "none",
            }}
          />
          <svg
            style={{
              position: "absolute",
              left: "10px",
              width: "20px",
              height: "20px",
              fill: "#F0F0F0"
            }}
            viewBox="0 0 24 24"
          >
            <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </div>
        <Button 
          style={{ background: "#00805b" }} 
          onClick={() => navigate("/signup")}
        >
          Login / Sign Up
        </Button>
      </div>
    </header>
  );
};

export default Header;