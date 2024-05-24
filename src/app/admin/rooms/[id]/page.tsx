"use client";
import AdminLayout from "@/app/components/layout/AdminLayout";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaCheck, FaStar } from "react-icons/fa";
import { LiaBookReaderSolid } from "react-icons/lia";
import Viewer from "react-viewer";

const Room = () => {
  const router = useRouter();
  const param = useParams();
  const [room, setRoom] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [visibleImg, setVisibleImg] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const images = [
    "https://assets-global.website-files.com/5c6d6c45eaa55f57c6367749/65045f093c166fdddb4a94a5_x-65045f0266217.webp",
    "https://assets-global.website-files.com/5c6d6c45eaa55f57c6367749/65d7d7080ab85f33665b94d6_RoomView022224.webp",
    "https://static01.nyt.com/images/2019/03/24/travel/24trending-shophotels1/24trending-shophotels1-jumbo.jpg?quality=75&auto=webp",
    "https://a0.muscache.com/im/pictures/miso/Hosting-53627561/original/cc19cf5f-d04f-4b61-99b0-53b77aca7ba6.jpeg?im_w=720",
  ];

  const getRoomData = async () => {
    try {
      const response = await axios.get(
        `https://sunet-be.onrender.com/api/rooms/${param.id}`
      );
      setRoom(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRoomData();
  }, []);

  console.log(room);

  return (
    <AdminLayout>
      {loading ? (
        <div className="p-5">Loading...</div>
      ) : (
        <div className="max-w-7xl w-full mx-auto p-5">
          <div className="flex items-center justify-between mb-10">
            <FaArrowLeft
              size={20}
              className="cursor-pointer"
              onClick={() => router.back()}
            />

            <button
              className="py-2 px-4 border border-jsPrimary100 text-jsPrimary100 hover:bg-jsPrimary100 hover:text-white"
              // onClick={() => setOpenRoomModal(true)}
            >
              Update Room
            </button>
          </div>
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-4xl">
              {room?.roomName} <small>({room?.roomType})</small>
            </h1>
            <div
              className={`py-2 px-4 rounded-md ${
                room?.availability
                  ? "bg-green-100 text-green-500"
                  : "bg-red-100 text-red-500"
              }`}
            >
              {room.availability === true ? (
                <p>Available</p>
              ) : (
                <p>Not Available</p>
              )}
            </div>
          </div>

          <div className="flex gap-3 items-center mt-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="text-yellow-500">
                  <FaStar size={16} />
                </div>
              ))}
            </div>
            <p className="text-sm font-medium">(4.8)</p>
            <div className="flex gap-1 ml-2">
              <LiaBookReaderSolid size={23} />
              <p>20K+ booked</p>
            </div>
          </div>

          <div className="w-full rounded-3xl overflow-hidden h-[15rem] sm:h-[20rem] md:h-[30rem] relative cursor-pointer mt-10">
            {room?.images &&
              room?.images
                .filter((img: any, index: number) => index <= 2)
                .map((image: any, index: number) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Image ${index + 1}`}
                    className={`${
                      index === 0
                        ? "absolute h-full w-3/5 top-0 left-0 border-r-4 border-white"
                        : index === 1
                        ? "absolute h-1/2 w-2/5 top-0 right-0 border-l-4 border-b-4 border-white"
                        : "absolute h-1/2 w-2/5 bottom-0 right-0 border-l-4 border-t-4 border-white"
                    } `}
                    onClick={() => {
                      setVisibleImg(true);
                      setActiveIndex(index);
                    }}
                  />
                ))}
          </div>

          <div className="mt-10">
            <div className="mb-5 flex items-end gap-5">
              <p className="text-3xl font-semibold">Price:</p>
              <p className="text-2xl font-semibold">
                &#8358;{Number(room?.price).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-3xl font-semibold mb-5">Room overview</p>
              <p>
                Step into comfort and elegance with our luxurious hotel rooms.
                Designed for relaxation, each room features modern amenities,
                plush bedding, and deluxe bathrooms. Whether traveling for
                business or leisure, our rooms provide the perfect retreat for a
                rejuvenating stay.
              </p>
            </div>
            <div className="mt-5 pt-5">
              <p className="text-3xl font-semibold mb-5">
                What&apos;s included
              </p>
              <div className="flex flex-col gap-3">
                {room?.amenities &&
                  JSON.parse(room?.amenities)?.map((amenity: any) => (
                    <div key={amenity} className="flex items-center gap-2">
                      <div className="rounded-full p-1 bg-green-100 text-green-500 h-fit">
                        <FaCheck size={12} />
                      </div>
                      <p>{amenity}</p>
                    </div>
                  ))}
              </div>
              {/* <div className="flex items-center gap-2">
                  <div className="rounded-full p-1 bg-green-100 text-green-500 h-fit">
                    <FaCheck size={12} />
                  </div>
                  <p>Air Conditioner</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-full p-1 bg-green-100 text-green-500 h-fit">
                    <FaCheck size={12} />
                  </div>
                  <p>Microwave</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-full p-1 bg-green-100 text-green-500 h-fit">
                    <FaCheck size={12} />
                  </div>
                  <p>Chiller</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-full p-1 bg-green-100 text-green-500 h-fit">
                    <FaCheck size={12} />
                  </div>
                  <p>Wifi</p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      )}

      <Viewer
        visible={visibleImg}
        onClose={() => setVisibleImg(false)}
        images={images.map((image) => ({ src: image }))}
        activeIndex={activeIndex}
      />
    </AdminLayout>
  );
};

export default Room;
