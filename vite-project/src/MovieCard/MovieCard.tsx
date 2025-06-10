import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface Genre {
    id: number;
    name: string;
}

interface MovieCardProps {
    title: string;
    image: string;
    overview: string;
    genre: Genre[];
}
export default function MovieCard(props: MovieCardProps) {
    console.log(props.image)
  return <Card>
    <CardHeader>
        {props.title}
    </CardHeader>
    <CardContent>
        <img src={props.image} alt={props.title} />
        <p>{props.overview}</p>
    </CardContent>
  </Card>
}