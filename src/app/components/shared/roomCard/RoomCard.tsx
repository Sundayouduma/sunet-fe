import { IoMdHeartEmpty } from "react-icons/io";

import { FaStar } from "react-icons/fa";
import Link from "next/link";

interface RoomData {
  image: string;
  name: string;
  price: number;
  // Add other properties as needed
}

interface RoomCardProps {
  data: RoomData;
}

const RoomCard: React.FC<RoomCardProps> = ({data}) => {
  return (
    <div className="p-3 rounded-xl max-w-sm w-full border">
      <Link href={"/"}>
        <div className=" relative">
          <div className="w-full h-56 rounded-xl overflow-hidden">
            <img className="h-full w-full" src={data?.image} />
          </div>
          <div className="p-2 rounded-full bg-white absolute bottom-0 right-3 translate-y-1/2">
            <IoMdHeartEmpty size={25} className="-mb-1" />
          </div>
        </div>

        <div className="p-2 mt-5">
          <p className="text-lg font-semibold">{data?.name}</p>
          <div className="flex gap-3 items-center mt-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="text-yellow-500">
                  <FaStar size={16} />
                </div>
              ))}
            </div>
            <p className="text-sm font-medium">(4.8)</p>
          </div>

          <div className="mt-5 border-t pt-3 flex items-center justify-between">
            <p className="text-sm font-semibold">Available</p>
            <p className="font-semibold">
              &#8358; {Number(data?.price).toLocaleString()}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RoomCard;
