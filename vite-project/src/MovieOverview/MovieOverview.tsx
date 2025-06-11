import type { Movie } from '@/MovieCard/MovieCard';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import movieData from "../data.json";
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import MovieCard from '@/MovieCard/MovieCard';


const MovieOverview = () => {
    const {id:movieId}= useParams();
    const [movieList,setMovieList]=useState(movieData);
    const [filteredMovie,setFilteredMovie]=useState(movieData?.filter((movie)=>{return(movie?.id)==Number(movieId) }))

  return (
    <div className="min-h-screen overflow-auto bg-black">
      <div className="relative  w-full h-[500px]">
        <img
          className=" absolute inset-0 w-full h-[500px]"
          src={`/assets/${filteredMovie[0].id}.jpg`}
        />
        <div className="absolute top-1/2 transform -translate-y-1/2">
          <h1 className="font-medium text-[64px] leading-[100%] tracking-[0] font-inter">
            {filteredMovie[0].original_title}
          </h1>
          <p className="mt-2 p-2 font-normal text-[24px] leading-[100%] tracking-[0] font-inter">
            {filteredMovie[0].overview}
          </p>
          <div className="flex flex-wrap gap-4 mt-3 p-2">
            {filteredMovie[0].genres.map((genre) => (
              <Badge key={genre.id} variant="secondary">
                {genre.name}
              </Badge>
            ))}
          </div>
          <span className="flex flex-wrap">
            <p className="ml-2 font-medium text-[20px] leading-[100%] tracking-[0] font-inter">
              Directed by:
            </p>
            <p>{filteredMovie[0].status}</p>
          </span>
        </div>
      </div>
      <div className="relative bg-black h-[1720px] ">
        <p className="ml-4 mt-6  font-medium text-[38px] leading-[100%] tracking-[0] font-inter">
          Cast
        </p>
        <div className="flex flex-wrap gap-4 mt-3 p-2">
          {/* {filteredMovie.map((data)=>{
            return 
         })} */}
        </div>
      </div>
    </div>
  );
}

export default MovieOverview
