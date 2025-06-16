import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"; 
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import './userPreference.css'

const genres = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Thriller",
  "Western",
];

const moodOptions = [
  { value: "entertained", label: "🎉 Just want to be entertained" },
  { value: "thought-provoking", label: "🧠 Looking for something thought-provoking" },
  { value: "emotional", label: "😢 In the mood for something emotional" },
  { value: "twists", label: "🤯 Love unpredictable twists" },
  { value: "visuals", label: "😎 Cool and stylish visuals matter to me" },
];

const watchTimeOptions = [
  "Weekends only",
  "Every night before bed",
  "During meals",
  "Long travel / commute",
  "Randomly whenever I feel like it",
];

export function UserPreferencesForm() {
  const { isSignedIn } = useAuth();
  const [open, setOpen] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedMood, setSelectedMood] = useState("");
  const [selectedWatchTime, setSelectedWatchTime] = useState("");

  useEffect(() => {
    const hasSetPreferences = localStorage.getItem("hasSetPreferences");
    if (isSignedIn && !hasSetPreferences) {
      setOpen(true);
    }
  }, [isSignedIn]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      genres: selectedGenres,
      mood: selectedMood,
      watchTime: selectedWatchTime,
    });
    
    localStorage.setItem("hasSetPreferences", "true");
    setOpen(false);
  };

  const handleGenreChange = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent 
        className="sm:max-w-[475px]" 
        style={{
          zIndex: "1000", 
          background: "linear-gradient(149deg, rgba(255, 0, 77, 0.04) 17.79%, rgba(31, 47, 152, 0.04) 69.78%), #111217"
        }}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="primary text-center">
            Help us personalize your experience
          </DialogTitle>
          <DialogClose 
            className="absolute right-4 top-4"
            style={{ 
              backgroundColor: "#ff3366", 
              width: "16px",
              height: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor:"pointer"
            }}
          >
          </DialogClose>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label className="primary">1. What kind of movies do you love watching?</Label>
            <div className="grid grid-cols-2 gap-2">
              {genres.map((genre) => (
                <div key={genre} className="flex items-center space-x-2 mt-2">
                  <Checkbox
                    id={`genre-${genre}`}
                    checked={selectedGenres.includes(genre)}
                    onCheckedChange={() => handleGenreChange(genre)}
                  />
                  <Label
                    htmlFor={`genre-${genre}`}
                    className="primary"
                  >
                    {genre}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="primary">2. What do you usually look for in a movie?</Label>
            <div className="space-y-2">
              {moodOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2 mt-4">
                  <input
                    type="radio"
                    id={option.value}
                    name="mood"
                    value={option.value}
                    checked={selectedMood === option.value}
                    onChange={() => setSelectedMood(option.value)}
                    className="h-4 w-4"
                    style={{
                      accentColor: "#ff3366"
                    }}
                  />
                  <Label htmlFor={option.value} className="primary">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="watchTime" className="primary">3. When do you usually watch movies?</Label>
            <Select 
              value={selectedWatchTime} 
              onValueChange={setSelectedWatchTime}
            >
              <SelectTrigger 
                id="watchTime" 
                className="w-full primary mt-3"
                style={{ zIndex: 999 }}
              >
                <SelectValue placeholder="Select your usual watch time..." />
              </SelectTrigger>
              <SelectContent style={{ zIndex: 1001 }}>
                {watchTimeOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-end">
            <Button 
              type="submit"
              style={{ backgroundColor: "#ff3366", cursor:"pointer" }}
              className="hover:bg-[#ff3366]/90"
            >
              Save Preferences
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}