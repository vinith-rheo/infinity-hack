import SvgElement from "@/components/ui/SvgElement";
import HappyIcon from "../../public/Icons/HappyIcon.svg";
import SadIcon from "../../public/Icons/SadIcon.svg";
import LoveIcon from "../../public/Icons/LoveIcon.svg";
import MotivatedIcon from "../../public/Icons/MotivatedIcon.svg";
import ThrilledIcon from "../../public/Icons/ThrilledIcon.svg";
import InspiredIcon from "../../public/Icons/InspiredIcon.svg";
import RelaxedIcon from "../../public/Icons/RelaxedIcon.svg";
import SuspenseIcon from "../../public/Icons/SuspenseIcon.svg";
import ComfortIcon from "../../public/Icons/ComfortIcon.svg";
import { useEffect, useState } from "react";
import { getRecommendations, type Mood, type Movie } from "@/services";
import { useAuth } from "@clerk/clerk-react";
import MoviePosterCard from "@/components/MoviePosterCard";
import { Skeleton } from "@/components/ui/skeleton";
const Explore = () => {

  const [mood, setMood] = useState<Mood>("happy");
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const { getToken } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      const token = await getToken();
      if (token) {
        const recommendations = await getRecommendations(mood, token);
        setRecommendations(recommendations);
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, [mood]);

  return (
    <div className="w-full h-full overflow-auto">
      <div className="m-[50px]">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col p-4 w-[700px]">
            <span className="font-inter font-bold text-[32px] leading-[100%] tracking-[0%] text-center text-[#EAEBEE]">
              Find the Perfect Movie for your Mood
            </span>
            <span className="font-inter text-[20px] leading-[100%] tracking-[0%] text-center mt-5 text-[#D5D5D5]">
              Pick how you're feeling, and we'll serve up movie recommendations
              that match your vibe — whether you're happy, heartbroken, or just
              want to feel something.
            </span>
          </div>
          <div className="flex flex-row flex-wrap justify-center mt-4 gap-10 w-[700px]">
            <div className="flex flex-col items-center relative">
                <SvgElement
                  svg={HappyIcon}
                  size={90}
                  type="happy"
                  onClick={() => setMood("happy")}
                  className={`transition-transform duration-200 hover:scale-110 cursor-pointer pb-[26px]`}
                />
                <span className="absolute bottom-1">Happy</span>
            </div>
            <SvgElement
              svg={SadIcon}
              size={90}
              type="sad"
              onClick={() => setMood("sad")}
              className={`transition-transform duration-200 hover:scale-110 cursor-pointer`}
            />
            <SvgElement
              svg={LoveIcon}
              size={90}
              type="love"
              onClick={() => setMood("love")}
              className={`transition-transform duration-200 hover:scale-110 cursor-pointer`}
            />
            <SvgElement
              svg={MotivatedIcon}
              size={90}
              type="motivated"
              onClick={() => setMood("motivated")}
              className={`transition-transform duration-200 hover:scale-110 cursor-pointer`}
            />
            <SvgElement
              svg={ThrilledIcon}
              size={90}
              type="thrilled"
              onClick={() => setMood("thrilled")}
              className={`transition-transform duration-200 hover:scale-110 cursor-pointer`}
            />
            <SvgElement
              svg={InspiredIcon}
              size={90}
              type="inspired"
              onClick={() => setMood("inspired")}
              className={`transition-transform duration-200 hover:scale-110 cursor-pointer`}
            />
            <SvgElement
              svg={RelaxedIcon}
              size={90}
              type="relaxed"
              onClick={() => setMood("relaxed")}
              className={`transition-transform duration-200 hover:scale-110 cursor-pointer`}
            />
            <SvgElement
              svg={SuspenseIcon}
              size={90}
              type="suspense"
              onClick={() => setMood("suspense")}
              className={`transition-transform duration-200 hover:scale-110 cursor-pointer`}
            />
            <SvgElement
              svg={ComfortIcon}
              size={90}
              type="comfort"
              onClick={() => setMood("comfort")}
              className={`transition-transform duration-200 hover:scale-110 cursor-pointer`}
            />
          </div>
        </div>
      </div>

      {loading ? (
        // Add Skeleton Loader
        <div className="flex flex-wrap gap-6 m-[50px]">
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} className="w-[200px] h-[300px]" />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-6 m-[50px]">
          {recommendations.map((recommendation) => (
            <MoviePosterCard
              key={recommendation.id}
              movie={recommendation}
              variant="trending"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Explore;
