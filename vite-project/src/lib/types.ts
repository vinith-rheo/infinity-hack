import type { Movie } from "@/services";

export interface Genre {
  id: number;
  name: string;
}

export interface CastMember {
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  name: string;
  order: number;
  profile_path: string;
  profile_url: string;
}
export interface CrewMember {
  credit_id: string;
  department: string;
  gender: number;
  id: number;
  job: string;
  name: string;
  profile_path: string;
}

export interface CastData {
  cast: CastMember[];
  crew: CrewMember[];
}

export type MovieDetails = {
  castdata: CastData;
  movie: Movie;
  rating: any;
};
