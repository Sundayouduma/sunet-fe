"use client";
import Layout from "./components/layout/UserLayout";
import { TypeAnimation } from "react-type-animation";
import RoomCard from "./components/shared/roomCard/RoomCard";
export default function Home() {
  const data: any = [
    {
      id: 1,
      image:
        "https://a0.muscache.com/im/pictures/miso/Hosting-53627561/original/cc19cf5f-d04f-4b61-99b0-53b77aca7ba6.jpeg?im_w=720",
      name: "The Throne Room",
      price: "82000",
    },
    {
      id: 2,
      image:
        "https://a0.muscache.com/im/pictures/miso/Hosting-53627561/original/cc19cf5f-d04f-4b61-99b0-53b77aca7ba6.jpeg?im_w=720",
      name: "Halls of the Greats",
      price: "84000",
    },
    {
      id: 3,
      image:
        "https://a0.muscache.com/im/pictures/miso/Hosting-53627561/original/cc19cf5f-d04f-4b61-99b0-53b77aca7ba6.jpeg?im_w=720",
      name: "Altars and Temples",
      price: "86000",
    },
    {
      id: 4,
      image:
        "https://a0.muscache.com/im/pictures/miso/Hosting-53627561/original/cc19cf5f-d04f-4b61-99b0-53b77aca7ba6.jpeg?im_w=720",
      name: "Elysian Fields",
      price: "88000",
    },
  ];

  return (
    <Layout>
      <div
        className="bg-cover bg-center bg-no-repeat h-[650px]  w-full md:h-[450px] lg:h-[700px] "
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://res.cloudinary.com/dzv98o7ds/image/upload/v1713353419/juwsheyaj-bg-img_ayl8kn.jpg')`,
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
      <div className="flex flex-col items-start max-w-7xl mx-auto py-5 px-5 my-5 lg:my-12">
        <div className="mb-8 text-center mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-[#c19d08]">
            Welcome to Juwshewaj Hotels
          </h2>
        </div>


<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 pt-4">
  <div className="flex flex-col items-start animate-fade-in">
    <h3 className="text-2xl font-semibold mb-2">Our vision</h3>
    <p className="text-gray-600 text-md text-start mt-4 leading-loose">
      At Juwshewaj Hotels, we believe in creating unforgettable experiences for our guests. Nestled [location details], our hotel offers a blend of luxury, comfort, and personalized service, making it the perfect choice for both leisure and business travelers. Our Story has been a landmark in location , enchanting guests with its timeless charm and hospitality.<br /><br /> From its humble beginnings to becoming a beacon of excellence in the hospitality industry, our journey is woven with stories of warmth and dedication.<br /><br /> Our Vision is simple - to redefine hospitality by providing unparalleled service and creating lasting memories for every guest who walks through our doors. We strive to exceed expectations at every turn, ensuring that each stay is a memorable one.
    </p>
  </div>
  <div className="flex flex-col items-start animate-fade-in">
    <h3 className="text-2xl font-semibold mb-2">Our Values</h3>
    <ol className="text-gray-600 text-md text-start leading-loose">
      <li className="mt-4">
        <strong>Excellence:</strong> We are committed to excellence in everything we do, from the service we provide to the experiences we curate.
      </li>
      <li className="mt-4">
        <strong>Hospitality:</strong> Hospitality is at the heart of our ethos. We welcome guests with open arms and genuine warmth, ensuring they feel at home from the moment they arrive.
      </li>
      <li className="mt-4">
        <strong>Innovation:</strong> We continuously innovate to enhance the guest experience, embracing new technologies and trends while staying true to our heritage.
      </li>
      <li className="mt-4">
        <strong>Sustainability:</strong> We are dedicated to minimizing our environmental footprint and contributing to the well-being of the communities we serve.
      </li>
    </ol>
  </div>
</div>

      </div>
      <div className="flex flex-col items-start max-w-7xl mx-auto py-10 px-5 my-10 lg:my-28">
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
      <div className="flex flex-col items-start max-w-7xl mx-auto py-10 p-5">
        <div className="mb-8 text-start">
          <h2 className="text-3xl font-bold mb-4">Facility Juwshewaj Hotels</h2>
          <p className="text-gray-600">
            Here are some reasons why you should choose Tourz for your next
            adventure:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-4 mx-auto">
          {data.map((item: any, index: any) => {
            // const item: any = item
            return (
              <div key={index}>
                <RoomCard data={item} />
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
