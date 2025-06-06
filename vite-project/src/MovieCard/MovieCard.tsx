import { Card} from "@/components/ui/card";
import CardImageContent from "./CardImageContent";

interface Genre {
    id: number;
    name: string;
}

export interface MovieCardProps {
    title: string;
    image: string;
    overview: string;
    genre: Genre[];
}
export default function MovieCard(props: MovieCardProps) {
    console.log(props.image)
  return <Card  className="rounded-xl overflow-hidden shadow-md  p-0">
       <CardImageContent title={props.title}
              image={`${props.image}.jpg`}
              overview={props.overview}
              genre={props.genre} />
  </Card>
}