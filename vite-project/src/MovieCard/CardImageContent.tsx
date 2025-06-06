import { Badge, Star } from 'lucide-react'
import type { MovieCardProps } from './MovieCard'


const CardImageContent = (props:MovieCardProps) => {
  return (
    <div className="relative w-full">
        <img  className="w-full h-auto" src={`https://imgs.search.brave.com/8nCYb8eoKlY_cHWJeA7RxvVuMmxkd8FcODAqLwJJgWI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9paDEu/cmVkYnViYmxlLm5l/dC9pbWFnZS40NDc2/NDAwOTI3LjY5MTYv/ZnBvc3RlcixzbWFs/bCx3YWxsX3RleHR1/cmUsc3F1YXJlX3By/b2R1Y3QsNjAweDYw/MC51Mi5qcGc`} />
       <div className="absolute bottom-0 left-0 right-0 p-3">
         <Badge className="bg-muted text-foreground px-2 py-1 rounded-full flex items-center gap-1">
         <Star />
        </Badge>
       </div>
        <div className="absolute bottom-0 left-0 right-0 p-3">
      <p className="mt-10 ">
        {props.overview }
      </p>
    </div>
    </div>
  )
}

export default CardImageContent
