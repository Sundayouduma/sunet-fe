"use client";
import Layout from "./components/layout/UserLayout";
import { TypeAnimation } from "react-type-animation";
import RoomCard from "./components/shared/roomCard/RoomCard";
import resturantImg from "../../public/images/exclusiveResturant.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { TiHeartOutline } from "react-icons/ti";
import { FaRegSnowflake, FaWifi } from "react-icons/fa";
import { TbPhotoPentagon } from "react-icons/tb";
import Image from "next/image";
import LoadingPage from "./components/loaders/Loader";

export default function Home() {
  const [rooms, setRooms] = useState([]);
  const [slide, setSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRooms = async () => {
      try {
        const response = await axios.get(
          `https://sunet-be.onrender.com/api/rooms/all`
        );
        setRooms(response?.data);
        setLoading(false);
      } catch (error: any) {
        console.log(error);
      }
    };

    getRooms();
  }, []);

  // console.log(rooms);

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
      url: "https://res.cloudinary.com/dzv98o7ds/image/upload/v1715895933/WhatsApp_Image_2024-05-03_at_22.50.50_10_ng12hu.jpg",
    },
    {
      url: "https://res.cloudinary.com/dzv98o7ds/image/upload/v1715895932/WhatsApp_Image_2024-05-03_at_22.50.50_7_e8bw7f.jpg",
    },
  ];
  const whyChooseUsImg = [
    "/images/whyChooseUs1.jpg",
    "/images/whyChooseUs2.jpg",
    "/images/whyChooseUs3.jpg",
    "/images/whyChooseUs4.jpg",
    "/images/whyChooseUs5.jpg",
    "/images/whyChooseUs6.jpg",
  ];

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <Layout>
          <section
            id="home"
            className="w-full h-[600px] md:h-[720px] relative p-3 group "
          >
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
          </section>

          <section
            id="about-us"
            className="flex flex-col items-start max-w-7xl mx-auto py-5 px-5 my-5 lg:my-12 pt-32"
          >
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
                  Juwsheyaj hotels is the most preferred hotel in Nigeria, it is
                  all about the right blend, Located in Federal capital
                  territory of Nigeria, Abuja. We offer our clients a perfect
                  combination of business and leisure amenities with dining and
                  recreational options delicately infused in one amazing space.
                  We crown all these with services that meet the highest
                  Executive Business Suites.
                  <br />
                  <br />
                  Overlooking Juwsheyaj hotel is Asorock and its only a 10
                  minute drive to the city center and a 25 minute drive from the
                  airport
                  <br />
                  <br />
                  Our hotels are designed for your comfort and convenience. Your
                  security is our primary concern and you will find our customer
                  care is second to none.
                </p>
              </div>
            </div>
          </section>

          <section
            id="why-choose-us"
            className="flex flex-col items-start max-w-7xl mx-auto py-10 px-5 mt-10 lg:mt-16 pt-32"
          >
            <div className="mb-8 text-center w-full">
              <h2 className="text-[2rem] mb-4 text-[#222222]">
                Why choose Juwsheyaj Hotels
              </h2>
              <p className="text-gray-600">
                Here are some reasons why you should choose Tourz for your next
                adventure:
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-10 lg:gap-5">
              <div className="w-full lg:w-1/2">
                <div className="flex flex-col lg:flex-row lg:text-start text-center gap-5 items-center">
                  <div className="bg-yellow-50 p-3 rounded-full">
                    <TiHeartOutline size={40} color="#B89010" />
                  </div>
                  <div>
                    <p className="text-xl font-medium mb-5">
                      24 Hour Housekeeping
                    </p>
                    <p>
                      Provide ultimate comfort and security to our clients with
                      round-the-clock housekeeping and security services. Keep
                      premises clean and well-guarded with dedicated
                      professionals who exceed expectations. Create an
                      exceptional experience that puts our clients at ease and
                      feels like home.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:text-start text-center gap-5 items-center mt-10">
                  <div className="bg-yellow-50 p-3 rounded-full">
                    <FaWifi size={40} color="#B89010" />
                  </div>
                  <div>
                    <p className="text-xl font-medium mb-5">
                      High Speed Internet Access
                    </p>
                    <p>
                      Experience endless possibilities with Juwsheyaj residence
                      high-speed internet! Connect with people from around the
                      world, access informative content, and enjoy the power of
                      technology. Our fast streaming and unlimited connectivity
                      is a game-changer for work or play. Come embrace this
                      technology and achieve your goals and dreams. There's no
                      limit to what you can do! Get ready for an exciting
                      journey of discovery and growth with Juwsheyaj.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:text-start text-center gap-5 items-center mt-10">
                  <div className="bg-yellow-50 p-3 rounded-full">
                    <FaRegSnowflake size={40} color="#B89010" />
                  </div>
                  <div>
                    <p className="text-xl font-medium mb-5">Air Conditioning</p>
                    <p>
                      Our efficient and powerful air conditioning system keeps
                      every room in your building cool and comfortable. It works
                      flawlessly and uses minimal energy, providing maximum
                      cooling power. Whether it's a commercial or residential
                      property, our system will keep you cool and collected
                      during hot summer days. You can rest easy knowing you have
                      a reliable and effective solution to beat the heat.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:text-start text-center gap-5 items-center mt-10">
                  <div className="bg-yellow-50 p-3 rounded-full">
                    <TbPhotoPentagon size={40} color="#B89010" />
                  </div>
                  <div>
                    <p className="text-xl font-medium mb-5">
                      Rooftop Restaurants and lounge
                    </p>
                    <p>
                      Immerse yourself in Abuja's stunning skyline! Rooftop
                      dining offers incredible views, delicious food, and an
                      upscale atmosphere. Explore the city and make
                      unforgettable memories with loved ones. Reach new heights
                      and step out of your comfort zone. Enjoy the beauty of
                      Abuja and broaden your horizons today.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center w-full lg:w-1/2">
                <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-5">
                  {whyChooseUsImg.map((item) => (
                    <div
                      key={item}
                      className="relative min-h-[200px] max-h-[200px] min-w-full max-w-full"
                    >
                      <Image src={item} alt={item} layout="fill" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section
            id="rooms"
            className="flex flex-col items-start max-w-7xl mx-auto p-5 pt-32"
          >
            <div className="mb-8 text-center w-full">
              <h2 className="text-[2rem] mb-4 text-[#222222]">
                Our Exclusive Rooms
              </h2>
            </div>

            <div className="w-full flex justify-center items-center flex-wrap gap-10 pt-4 mx-auto">
              {rooms.map((item: any) => {
                // const item: any = item
                return (
                  <div key={item?._id}>
                    <RoomCard data={item} />
                  </div>
                );
              })}
            </div>
          </section>

          <section
            id="services"
            className="flex flex-col max-w-7xl mx-auto py-10 p-5 pt-32"
          >
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
                    Roof Top Lounge
                  </p>
                  <p className="text-gray-700">
                    Our state-of-the-art facilities provide an unparalleled
                    ambiance, ensuring that every visit is an unforgettable
                    experience. Come and immerse yourself in a world of
                    unparalleled refinement, where the finest drinks and
                    impeccable service await you. Your journey to an
                    extraordinary evening begins here.
                  </p>
                </div>
              </div>
              <div className="grid gap-5 p-5 border max-w-sm w-full shadow text-center">
                <div className="relative mx-auto h-60 w-60 sm:h-72 sm:w-72">
                  <Image src={resturantImg} alt="resturant" fill />
                </div>
                <div className="col-span-full">
                  <p className="text-2xl font-bold text-jsPrimary200 mb-3">
                    Exclusive Resturant
                  </p>
                  <p className="text-gray-700">
                    Savor the flavors of our locally sourced ingredients
                    expertly crafted into delectable dishes at our restaurant.
                    Whether you're craving a hearty breakfast, a leisurely
                    lunch, or a sumptuous dinner, our culinary team ensures an
                    unforgettable dining experience awaits you.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section
            id="mission"
            className="flex flex-col items-start max-w-7xl mx-auto py-5 px-5 mt-5 lg:mt-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 pt-4">
              <div className="flex flex-col items-start animate-fade-in">
                <h3 className="text-2xl font-semibold mb-2 w-full text-center">
                  Our vision
                </h3>
                <p className="text-gray-600 text-md text-start mt-4 leading-loose">
                  At Juwsheyaj, we believe in creating unforgettable experiences
                  for our guests. Nestled at No 1, lukulu Street wuse zone 3,
                  Abuja, our hotel offers a blend of luxury, comfort, and
                  personalized service, making it the perfect choice for both
                  leisure and business travelers. Our Story has been a landmark
                  in location , enchanting guests with its timeless charm and
                  hospitality.
                  <br />
                  <br /> From its humble beginnings to becoming a beacon of
                  excellence in the hospitality industry, our journey is woven
                  with stories of warmth and dedication.
                  <br />
                  <br /> Our Vision is simple - to redefine hospitality by
                  providing unparalleled service and creating lasting memories
                  for every guest who walks through our doors. We strive to
                  exceed expectations at every turn, ensuring that each stay is
                  a memorable one.
                </p>
              </div>
              <div className="flex flex-col items-start animate-fade-in">
                <h3 className="text-2xl font-semibold mb-2 w-full text-center">
                  Our Values
                </h3>
                <ol className="text-gray-600 text-md text-start leading-10">
                  <li className="mt-4">
                    <strong>Excellence:</strong> We are committed to excellence
                    in everything we do, from the service we provide to the
                    experiences we curate.
                  </li>
                  <li className="mt-4">
                    <strong>Hospitality:</strong> Hospitality is at the heart of
                    our ethos. We welcome guests with open arms and genuine
                    warmth, ensuring they feel at home from the moment they
                    arrive.
                  </li>
                  <li className="mt-4">
                    <strong>Innovation:</strong> We continuously innovate to
                    enhance the guest experience, embracing new technologies and
                    trends while staying true to our heritage.
                  </li>
                  <li className="mt-4">
                    <strong>Sustainability:</strong> We are dedicated to
                    minimizing our environmental footprint and contributing to
                    the well-being of the communities we serve.
                  </li>
                </ol>
              </div>
            </div>
          </section>
          <section id="contact-us" className="mt-32 flex flex-col gap-8">
            <h3 className="text-2xl font-semibold mb-2 w-full text-center">
              Contact us
            </h3>

            <div style={{ width: "100%" }}>
              <iframe
                width="100%"
                height="400"
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
                src="https://maps.google.com/maps?width=100%25&amp;height=500&amp;hl=en&amp;q=No%201,%20lukulu%20Street%20wuse%20zone%203,%20Abuja+(Juwsheyaj%20Hotel)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              >
                <a href="https://www.gps.ie/">gps trackers</a>
              </iframe>
            </div>
          </section>
        </Layout>
      )}
    </>
  );
}
