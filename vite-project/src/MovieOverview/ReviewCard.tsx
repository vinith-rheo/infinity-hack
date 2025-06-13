import React from "react";

interface ReviewCardProps {
  name: string;
  initials: string;
  rating: number;
  review: string;
  date: string;
}

const ReviewCard = (props: ReviewCardProps) => {
  const { initials, name, rating, review, date } = props;
  return (
    <div className="bg-zinc-900 rounded-lg p-5 mb-4 text-zinc-100">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-3">
          <div className="bg-red-700 rounded-full w-10 h-10 flex items-center justify-center font-semibold text-white">
            {initials}
          </div>
          <span className="font-semibold">{name}</span>
        </div>
        <div className="text-orange-400 font-bold">
          {"★".repeat(Math.floor(rating))}
          <span className="text-orange-300 text-sm"> {rating.toFixed(1)}</span>
        </div>
      </div>
      <p className="text-sm text-zinc-300">{review}</p>
      <div className="text-xs text-zinc-500 mt-2">{date}</div>
    </div>
  );
};

export default ReviewCard;
