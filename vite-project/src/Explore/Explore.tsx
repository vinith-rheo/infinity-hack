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
import WatchList from "@/Watchlist/Watchlist";
const Explore = () => {
  const handleRecommendationIconClick = (type: string) => {
    console.log("object", type);
  };

  return (
    <div className="w-full h-full overflow-auto">
      <div className="m-[50px]">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col p-4 w-[700px]">
            <span className="font-inter font-bold text-[32px] leading-[100%] tracking-[0%] text-center text-[#EAEBEE]">
              Find the Perfect Movie for your Mood
            </span>
            <span className="font-inter text-[20px] leading-[100%] tracking-[0%] text-center mt-5 text-[#D5D5D5]">
              Pick how you're feeling, and we’ll serve up movie recommendations
              that match your vibe — whether you’re happy, heartbroken, or just
              want to feel something.
            </span>
          </div>
          <div className="flex flex-row flex-wrap justify-center mt-4 gap-10 w-[700px]">
            <SvgElement
              svg={HappyIcon}
              size={90}
              type="happy"
              onClick={handleRecommendationIconClick}
            />
            <SvgElement
              svg={SadIcon}
              size={90}
              type="sad"
              onClick={handleRecommendationIconClick}
            />
            <SvgElement
              svg={LoveIcon}
              size={90}
              type="love"
              onClick={handleRecommendationIconClick}
            />
            <SvgElement
              svg={MotivatedIcon}
              size={90}
              type="motivated"
              onClick={handleRecommendationIconClick}
            />
            <SvgElement
              svg={ThrilledIcon}
              size={90}
              type="thrilled"
              onClick={handleRecommendationIconClick}
            />
            <SvgElement
              svg={InspiredIcon}
              size={90}
              type="inspired"
              onClick={handleRecommendationIconClick}
            />
            <SvgElement
              svg={RelaxedIcon}
              size={90}
              type="relaxed"
              onClick={handleRecommendationIconClick}
            />
            <SvgElement
              svg={SuspenseIcon}
              size={90}
              type="suspense"
              onClick={handleRecommendationIconClick}
            />
            <SvgElement
              svg={ComfortIcon}
              size={90}
              type="comfort"
              onClick={handleRecommendationIconClick}
            />
          </div>
        </div>
      </div>
      <WatchList />
    </div>
  );
};

export default Explore;
