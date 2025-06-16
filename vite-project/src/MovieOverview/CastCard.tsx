
import { useState } from 'react';
import placeholder from '../../public/placeholder.svg'
import { useAuth } from '@clerk/clerk-react';
import { likeActor,removeLikedActor } from '@/services';
import { toast } from 'sonner';

interface CastCardProps{
  id:number;
  name:string;
  image:string;
  role:string;
}

const CastCard = (props: CastCardProps) => {
  const { name, image, role,id } = props;
    const [imgSrc, setImgSrc] = useState(image);
     const [isLikedActor, setIsLikedActor] = useState<boolean>(false);
     const [isHovering, setIsHovering] = useState<boolean>(false);
      const { getToken } = useAuth();


     const handleLikeActorToggle = async (
       e: React.MouseEvent<HTMLButtonElement>
     ) => {
       e.stopPropagation();
       const token = await getToken();

       try {
         if (!isLikedActor) {
           await likeActor(id,"Like", token ?? undefined);
         } else {
           await removeLikedActor(id, token ?? undefined);
         }
         setIsLikedActor(!isLikedActor);
       } catch {
         toast.error("Failed to update like");
       }
     };
    const handleCorruptedImage = () => {
    setImgSrc(placeholder);
  };
  return (
    <div className="flex flex-col items-center text-center text-white w-36 md:w-40"
      //  onMouseEnter={() => setIsHovering(true)}
      // onMouseLeave={() => setIsHovering(false)}
    >
      <div className="rounded-lg overflow-hidden shadow-lg w-full h-52 md:h-56">
        <img src={imgSrc} alt={name} className="w-full h-full object-cover" onError={handleCorruptedImage} />
      </div>
      <div className="mt-2">
        <h3 className="text-sm md:text-base font-medium">{name}</h3>
        <p className="text-xs md:text-sm text-gray-400">{role}</p>
      </div>
    </div>
  );
};

export default CastCard;
