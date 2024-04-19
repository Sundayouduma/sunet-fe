"use client";
import { FaStar } from "react-icons/fa";
import { LiaBookReaderSolid } from "react-icons/lia";
import Layout from "../../components/layout/UserLayout";
import { useState } from "react";
import Viewer from "react-viewer";

const RoomPage = () => {
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const images = [
    "https://a0.muscache.com/im/pictures/miso/Hosting-53627561/original/cc19cf5f-d04f-4b61-99b0-53b77aca7ba6.jpeg?im_w=720",
    "https://a0.muscache.com/im/pictures/miso/Hosting-53627561/original/cc19cf5f-d04f-4b61-99b0-53b77aca7ba6.jpeg?im_w=720",
    "https://a0.muscache.com/im/pictures/miso/Hosting-53627561/original/cc19cf5f-d04f-4b61-99b0-53b77aca7ba6.jpeg?im_w=720",
    "https://a0.muscache.com/im/pictures/miso/Hosting-53627561/original/cc19cf5f-d04f-4b61-99b0-53b77aca7ba6.jpeg?im_w=720",
  ];

  return (
    <Layout>
      <div className="max-w-7xl w-full mx-auto p-5">
        <h1 className="font-semibold text-4xl">The Throne Room</h1>

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

        <div className="w-full rounded-3xl overflow-hidden h-[30rem] relative cursor-pointer mt-10">
          {images
            .filter((_, index) => index <= 2)
            .map((image, index) => (
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
                  setVisible(true);
                  setActiveIndex(index);
                }}
              />
            ))}
        </div>

        <div className="mt-10 flex">
          <div>
            <p className="text-3xl font-semibold">Room overview</p>
            <p>
              Step into comfort and elegance with our luxurious hotel rooms.
              Designed for relaxation, each room features modern amenities,
              plush bedding, and deluxe bathrooms. Whether traveling for
              business or leisure, our rooms provide the perfect retreat for a
              rejuvenating stay.
            </p>
          </div>
          <div></div>
        </div>
      </div>
      <Viewer
        visible={visible}
        onClose={() => setVisible(false)}
        images={images.map((image) => ({ src: image }))}
        activeIndex={activeIndex}
      />
    </Layout>
  );
};

export default RoomPage;
