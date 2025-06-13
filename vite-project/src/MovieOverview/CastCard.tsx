

interface CastCardProps{
  name:string;
  image:string;
  role:string;
}

const CastCard = (props: CastCardProps) => {
  const { name, image, role } = props;
  return (
    <div className="flex flex-col items-center text-center text-white w-36 md:w-40">
      <div className="rounded-lg overflow-hidden shadow-lg w-full h-52 md:h-56">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="mt-2">
        <h3 className="text-sm md:text-base font-medium">{name}</h3>
        <p className="text-xs md:text-sm text-gray-400">{role}</p>
      </div>
    </div>
  );
};

export default CastCard;
