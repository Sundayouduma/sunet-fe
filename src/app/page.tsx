"use client";
import Layout from "./components/layout/UserLayout";
import { TypeAnimation } from "react-type-animation";
import RoomCard from "./components/shared/roomCard/RoomCard";
export default function Home() {
  const data = [
    {
      image:
        "https://a0.muscache.com/im/pictures/miso/Hosting-53627561/original/cc19cf5f-d04f-4b61-99b0-53b77aca7ba6.jpeg?im_w=720",
      name: "The Throne Room",
      price: "82000",
    },
    {
      image:
        "https://a0.muscache.com/im/pictures/miso/Hosting-53627561/original/cc19cf5f-d04f-4b61-99b0-53b77aca7ba6.jpeg?im_w=720",
      name: "Halls of the Greats",
      price: "84000",
    },
    {
      image:
        "https://a0.muscache.com/im/pictures/miso/Hosting-53627561/original/cc19cf5f-d04f-4b61-99b0-53b77aca7ba6.jpeg?im_w=720",
      name: "Altars and Temples",
      price: "86000",
    },
    {
      image:
        "https://a0.muscache.com/im/pictures/miso/Hosting-53627561/original/cc19cf5f-d04f-4b61-99b0-53b77aca7ba6.jpeg?im_w=720",
      name: "Elysian Fields",
      price: "88000",
    },
  ];
  return (
    <Layout>
      <div
        className="bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://res.cloudinary.com/dzv98o7ds/image/upload/v1713353419/juwsheyaj-bg-img_ayl8kn.jpg')`,
          height: "700px",
          width: "100%",
        }}
      >
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="text-white text-center">
            <h1 className="text-2xl font-bold">
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed out once, initially
                  "Welcome to Juwsheyaj Hotel",
                  1000,
                  "Experience luxury with us",
                  1000,
                ]}
                wrapper="span"
                speed={50}
                style={{ fontSize: "1.5em", display: "inline-block" }}
                repeat={Infinity}
              />
            </h1>
            <p className="mt-2">
              Indulge in the epitome of luxury at our hotel.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start max-w-7xl mx-auto py-10 my-28">
        <div className="mb-8 text-start">
          <h2 className="text-3xl font-bold mb-4">
            Why choose Juwshewaj Hotels
          </h2>
          <p className="text-gray-600">
            Here are some reasons why you should choose Tourz for your next
            adventure:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-4">
          <div className="flex flex-col items-start">
            <div className="bg-blue-500 rounded-full p-3 text-white text-3xl mb-4">
              {/* Icon */}
              <i className="fas fa-bed"></i>
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Luxurious Accommodations
            </h3>
            <p className="text-gray-600 text-sm text-start">
              Experience the epitome of comfort and luxury with our elegantly
              designed rooms and suites.
            </p>
          </div>

          <div className="flex flex-col items-start">
            <div className="bg-yellow-500 rounded-full p-3 text-white text-3xl mb-4">
              {/* Icon */}
              <i className="fas fa-utensils"></i>
            </div>
            <h3 className="text-lg font-semibold mb-2">Gourmet Dining</h3>
            <p className="text-gray-600 text-sm text-start">
              Indulge in culinary delights crafted by our world-class chefs,
              offering a symphony of flavors.
            </p>
          </div>

          <div className="flex flex-col items-start">
            <div className="bg-green-500 rounded-full p-3 text-white text-3xl mb-4">
              {/* Icon */}
              <i className="fas fa-swimming-pool"></i>
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Relaxation and Recreation
            </h3>
            <p className="text-gray-600 text-sm text-start">
              Unwind and rejuvenate in our state-of-the-art spa facilities or
              take a refreshing dip in our sparkling pool.
            </p>
          </div>

          <div className="flex flex-col items-start">
            <div className="bg-purple-500 rounded-full p-3 text-white text-3xl mb-4">
              {/* Icon */}
              <i className="fas fa-concierge-bell"></i>
            </div>
            <h3 className="text-lg font-semibold mb-2">Exceptional Service</h3>
            <p className="text-gray-600 text-sm text-start">
              Our dedicated staff is committed to ensuring your stay is
              flawless, providing attentive service round the clock.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start max-w-7xl mx-auto py-10">
        <div className="mb-8 text-start">
          <h2 className="text-3xl font-bold mb-4">Facility Juwshewaj Hotels</h2>
          <p className="text-gray-600">
            Here are some reasons why you should choose Tourz for your next
            adventure:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-4">
          {data.map((item, index) => (
            <div key={index}>
              <RoomCard data={item} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
