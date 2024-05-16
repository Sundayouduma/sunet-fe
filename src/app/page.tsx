"use client";
import Layout from "./components/layout/UserLayout";
import { TypeAnimation } from "react-type-animation";
import RoomCard from "./components/shared/roomCard/RoomCard";
import Image from "next/image";
import resturantImg from "../../public/images/resturant.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

export default function Home() {
  const [rooms, setRooms] = useState([]);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const getRooms = async () => {
      try {
        const response = await axios.get(
          `https://sunet-be.onrender.com/api/rooms/all`
        );
        setRooms(response?.data);
      } catch (error: any) {
        console.log(error);
      }
    };

    getRooms();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (slide < slides.length - 1) {
        setSlide(slide + 1);
      } else {
        setSlide(0);
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [slide]);

  const slides = [
    {
      url: "https://res.cloudinary.com/dzv98o7ds/image/upload/v1713353419/juwsheyaj-bg-img_ayl8kn.jpg",
    },
    {
      url: "https://res.cloudinary.com/dzv98o7ds/image/upload/v1714338856/ewipbpjleqegnaaegtba.jpg",
    },
    {
      url: "https://res.cloudinary.com/dzv98o7ds/image/upload/v1713353419/juwsheyaj-bg-img_ayl8kn.jpg",
    },
    {
      url: "https://res.cloudinary.com/dzv98o7ds/image/upload/v1714338856/ewipbpjleqegnaaegtba.jpg",
    },
    {
      url: "https://res.cloudinary.com/dzv98o7ds/image/upload/v1713353419/juwsheyaj-bg-img_ayl8kn.jpg",
    },
    {
      url: "https://res.cloudinary.com/dzv98o7ds/image/upload/v1714338856/ewipbpjleqegnaaegtba.jpg",
    },
  ];

  return (
    <Layout>
      <div className="w-full h-[600px] md:h-[780px] relative p-3 group">
        <div
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${slides[slide].url})`,
          }}
          className="h-full w-full rounded-xl bg-cover bg-center bg-no-repeat transition-all duration-500 ease-in-out"
        ></div>
        <div className="absolute inset-0 flex justify-center items-center p-10">
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
        <div
          className="md:hidden md:group-hover:block absolute top-1/2 z-20 bg-black bg-opacity-50 text-white cursor-pointer rounded-full p-2 -translate-y-1/2 left-5"
          onClick={() =>
            slide === 0 ? setSlide(slides.length - 1) : setSlide(slide - 1)
          }
        >
          <BsChevronCompactLeft size={30} />
        </div>
        <div
          className="md:hidden md:group-hover:block absolute top-1/2 z-20 bg-black bg-opacity-50 text-white cursor-pointer rounded-full p-2 -translate-y-1/2 right-5"
          onClick={() =>
            slide === slides.length - 1 ? setSlide(0) : setSlide(slide + 1)
          }
        >
          <BsChevronCompactRight size={30} />
        </div>
      </div>

      <div className="flex flex-col items-start max-w-7xl mx-auto py-5 px-5 my-5 lg:my-12">
        <div className="grid md:grid-cols-2 items-center">
          <div className="max-w-1/2 w-full h-auto py-5 hidden md:block">
            <img
              src="https://res.cloudinary.com/dzv98o7ds/image/upload/v1714338856/ewipbpjleqegnaaegtba.jpg"
              alt="hotel"

              // // height={100}
              // // className="h-full w-full"
              // style={{
              //   objectFit: "cover", // cover, contain, none
              // }}
            />
          </div>
          <div className="border shadow-lg p-5 flex flex-col justify-center h-full">
            <p className="uppercase text-jsPrimary100 font-medium ">
              a b o u t &nbsp;&nbsp;u s
            </p>
            <h3 className="text-[2rem] my-3 text-[#222222]">
              The Most Preferred Hotel in Nigeria
            </h3>
            <p className="text-[#b1a36c]">
              Juwshewaj hotels is the most preferred hotel in Nigeria, it is all
              about the right blend, Located in Federal capital territory of
              Nigeria, Abuja. We offer our clients a perfect combination of
              business and leiusre amenities with dining and recreational
              options delicately infused in one amazing space. We crown all
              these with services that meet the highest standards.
              <br />
              <br />
              Overlooking Juwshewaj hotel is Asorock and its only a 10 minute
              drive to the city center and a 20 minute drive from the airport
              <br />
              <br />
              Our hotels are designed for your comfort and convenience. Your
              security is our primary concern and you will find our customer
              care is second to none.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start max-w-7xl mx-auto py-10 px-5 my-10 lg:my-16">
        <div className="mb-8 text-center w-full">
          <h2 className="text-[2rem] mb-4 text-[#222222]">
            Why choose Juwshewaj Hotels
          </h2>
          <p className="text-gray-600">
            Here are some reasons why you should choose Tourz for your next
            adventure:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-4">
          <div className="flex flex-col border p-3 rounded-md">
            <div className="bg-blue-500 rounded-full w-fit p-3 text-white text-3xl mb-4">
              {/* Icon */}
              <i className="fas fa-bed"></i>
            </div>
            <h3 className="text-lg text-center font-semibold mb-2">
              Luxurious Accommodations
            </h3>
            <p className="text-gray-600 text-center text-sm">
              Experience the epitome of comfort and luxury with our elegantly
              designed rooms and suites.
            </p>
          </div>

          <div className="flex flex-col  border p-3 rounded-md">
            <div className="bg-yellow-500 w-fit rounded-full p-3 text-white text-3xl mb-4">
              {/* Icon */}
              <i className="fas fa-utensils"></i>
            </div>
            <h3 className="text-lg text-center font-semibold mb-2">
              Gourmet Dining
            </h3>
            <p className="text-gray-600 text-center text-sm">
              Indulge in culinary delights crafted by our world-class chefs,
              offering a symphony of flavors.
            </p>
          </div>

          <div className="flex flex-col border p-3 rounded-md">
            <div className="bg-green-500 w-fit rounded-full p-3 text-white text-3xl mb-4">
              {/* Icon */}
              <i className="fas fa-swimming-pool"></i>
            </div>
            <h3 className="text-lg text-center font-semibold mb-2">
              Relaxation and Recreation
            </h3>
            <p className="text-gray-600 text-sm text-center">
              Unwind and rejuvenate in our state-of-the-art spa facilities or
              take a refreshing dip in our sparkling pool.
            </p>
          </div>

          <div className="flex flex-col border p-3 rounded-md">
            <div className="bg-purple-500 w-fit rounded-full p-3 text-white text-3xl mb-4">
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
        <div className="mb-8 text-center w-full">
          <h2 className="text-[2rem] mb-4 text-[#222222]">
            Our Exclusive Rooms
          </h2>
        </div>

        <div className="w-full flex justify-center items-center flex-wrap gap-10 pt-4 mx-auto">
          {rooms.map((item: any) => {
            // const item: any = item
            return (
              <div key={item?.roomId}>
                <RoomCard data={item} />
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col max-w-7xl mx-auto py-10 p-5">
        <h2 className="text-[2rem] w-full text-center text-[#222222] mb-4">
          Exceptional services
        </h2>
        <div className="flex gap-10 mt-10  justify-center flex-wrap">
          <div className="grid gap-5 p-5 border max-w-sm w-full shadow text-center">
            <div className="mx-auto h-60 w-60 sm:h-72 sm:w-72">
              <img
                src={
                  "https://res.cloudinary.com/dzv98o7ds/image/upload/v1714339322/IMG20240406122247_ritv84.jpg"
                }
                alt="gym"
                className="h-full w-full"
              />
            </div>
            <div className="col-span-full">
              <p className="text-2xl font-bold text-jsPrimary200 mb-3">
                Exclusive Bar
              </p>
              <p className="text-gray-700">
                Our state-of-the-art facilities provide an unparalleled
                ambiance, ensuring that every visit is an unforgettable
                experience. Come and immerse yourself in a world of unparalleled
                refinement, where the finest drinks and impeccable service await
                you. Your journey to an extraordinary evening begins here.
              </p>
            </div>
          </div>
          <div className="grid gap-5 p-5 border max-w-sm w-full shadow text-center">
            <div className="mx-auto h-60 w-60 sm:h-72 sm:w-72">
              <Image src={resturantImg} alt="pool" className="h-full w-full" />
            </div>
            <div className="col-span-full">
              <p className="text-2xl font-bold text-jsPrimary200 mb-3">
                Exclusive Resturant
              </p>
              <p className="text-gray-700">
                Savor the flavors of our locally sourced ingredients expertly
                crafted into delectable dishes at our restaurant. Whether you're
                craving a hearty breakfast, a leisurely lunch, or a sumptuous
                dinner, our culinary team ensures an unforgettable dining
                experience awaits you.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start max-w-7xl mx-auto py-5 px-5 my-5 lg:my-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 pt-4">
          <div className="flex flex-col items-start animate-fade-in">
            <h3 className="text-2xl font-semibold mb-2 w-full text-center">
              Our vision
            </h3>
            <p className="text-gray-600 text-md text-start mt-4 leading-loose">
              At Juwshewaj, we believe in creating unforgettable experiences for
              our guests. Nestled at No 1, lukulu Street wuse zone 3, Abuja, our
              hotel offers a blend of luxury, comfort, and personalized service,
              making it the perfect choice for both leisure and business
              travelers. Our Story has been a landmark in location , enchanting
              guests with its timeless charm and hospitality.
              <br />
              <br /> From its humble beginnings to becoming a beacon of
              excellence in the hospitality industry, our journey is woven with
              stories of warmth and dedication.
              <br />
              <br /> Our Vision is simple - to redefine hospitality by providing
              unparalleled service and creating lasting memories for every guest
              who walks through our doors. We strive to exceed expectations at
              every turn, ensuring that each stay is a memorable one.
            </p>
          </div>
          <div className="flex flex-col items-start animate-fade-in">
            <h3 className="text-2xl font-semibold mb-2 w-full text-center">
              Our Values
            </h3>
            <ol className="text-gray-600 text-md text-start leading-10">
              <li className="mt-4">
                <strong>Excellence:</strong> We are committed to excellence in
                everything we do, from the service we provide to the experiences
                we curate.
              </li>
              <li className="mt-4">
                <strong>Hospitality:</strong> Hospitality is at the heart of our
                ethos. We welcome guests with open arms and genuine warmth,
                ensuring they feel at home from the moment they arrive.
              </li>
              <li className="mt-4">
                <strong>Innovation:</strong> We continuously innovate to enhance
                the guest experience, embracing new technologies and trends
                while staying true to our heritage.
              </li>
              <li className="mt-4">
                <strong>Sustainability:</strong> We are dedicated to minimizing
                our environmental footprint and contributing to the well-being
                of the communities we serve.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </Layout>
  );
}
