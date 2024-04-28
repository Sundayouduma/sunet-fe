import { IoMdHeartEmpty } from "react-icons/io";

import { FaStar } from "react-icons/fa";
import Link from "next/link";

interface RoomData {
  _id: string;
  roomId: number;
  roomName: string;
  roomType: string;
  price: number;
  amenities: string[];
  images: string[];
  availability: boolean;

  // Add other properties as needed
}

interface RoomCardProps {
  data: RoomData;
}

const RoomCard: React.FC<RoomCardProps> = ({ data }) => {
  const saveRoomData = () => {
    localStorage.setItem("roomData", JSON.stringify(data));
  };
  return (
    <div className="p-3 rounded-xl max-w-sm w-full">
      <Link href={`/rooms/${data?.roomId}`} onClick={saveRoomData}>
        <div className=" relative">
          <div className="w-full h-56 rounded-xl overflow-hidden">
            <img className="h-full w-full" src={data?.images[0]} />
          </div>
          <div className="p-2 rounded-full bg-white absolute bottom-0 right-3 translate-y-1/2">
            <IoMdHeartEmpty size={20} className="-mb-1" />
          </div>
        </div>

        <div className="mt-2">
          <p className="text-md font-medium text-[#222222]">{data?.roomName}</p>
          <div className="flex gap-3 items-center mt-2 justify-between">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="text-[#222222]">
                  <FaStar size={12} />
                </div>
              ))}
            </div>
            <p className="text-sm font-medium">5.0</p>
          </div>

          <div className="mt-2 pt-3 flex items-center justify-between">
            <p className="text-sm text-green">
              {data?.availability ? "Available" : "Not Available"}
            </p>
            <p className="font-medium text-black">
              &#8358; {Number(data?.price).toLocaleString()}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RoomCard;
