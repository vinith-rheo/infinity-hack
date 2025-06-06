import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-3">
      <h1 className="text-3xl text-center font-bold">Cine Hub</h1>

      <Button className="mt-3" onClick={() => navigate("/signup")}>
        Explore
      </Button>
    </div>
  );
}
