"use client";
import { FaCheck, FaRegCalendar, FaStar } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import { LiaBookReaderSolid } from "react-icons/lia";
import Layout from "../../components/layout/UserLayout";
import { useEffect, useState } from "react";
import Viewer from "react-viewer";
// import {
//   DatePicker,
//   DateTimePicker,
//   LocalizationProvider,
// } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { ThemeProvider, createTheme } from "@mui/material";
import { toast, ToastContainer } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css";
import NotLoggedInModal from "@/app/components/shared/modals/notLoggedInModal";
import axios from "axios";
import LoadingPage from "@/app/components/loaders/Loader";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import formatDateDifference from "../../../app/helpers/dateDifference";
import { format } from "date-fns";

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
const RoomPage = () => {
  const [roomData, setRoomData] = useState<RoomData>({
    _id: "",
    roomId: 0,
    roomName: "",
    roomType: "",
    price: 0,
    amenities: [],
    images: [],
    availability: false,
  });
  const [occupants, setOccupants] = useState(1);
  const [checkInDate, setcheckInDate] = useState(new Date());
  const [checkOutDate, setcheckOutDate] = useState(new Date());
  const [openCheckIn, setOpenCheckIn] = useState(false);
  const [openCheckOut, setOpenCheckOut] = useState(false);
  const [totalAmount, setTotalAmount] = useState(roomData?.price);
  const [visibleImg, setVisibleImg] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dateDifference, setDateDifference] = useState(1);
  const [notLoggedInModal, setNotLoggedInModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({});
  const images = [
    "https://assets-global.website-files.com/5c6d6c45eaa55f57c6367749/65045f093c166fdddb4a94a5_x-65045f0266217.webp",
    "https://assets-global.website-files.com/5c6d6c45eaa55f57c6367749/65d7d7080ab85f33665b94d6_RoomView022224.webp",
    "https://static01.nyt.com/images/2019/03/24/travel/24trending-shophotels1/24trending-shophotels1-jumbo.jpg?quality=75&auto=webp",
    "https://a0.muscache.com/im/pictures/miso/Hosting-53627561/original/cc19cf5f-d04f-4b61-99b0-53b77aca7ba6.jpeg?im_w=720",
  ];

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const checkInModifiers = {
    selected: checkInDate,
  };
  const checkOutModifiers = {
    selected: checkOutDate,
  };

  const handleDateUpdate = (value: any, type: string) => {
    if (type === "checkIn") {
      if (
        formatDateDifference(new Date(), value) >= 0 &&
        value instanceof Date
      ) {
        setcheckInDate(value);
      } else {
        setcheckInDate(new Date());
      }
    } else {
      if (
        formatDateDifference(new Date(), value) >= 0 &&
        value instanceof Date
      ) {
        setcheckOutDate(value);
      } else {
        setcheckOutDate(new Date());
      }
    }
  };

  const handleBookRoom = async () => {
    if (dateDifference < 1) {
      toast.error(
        "You can't pick a check-in date thats later than check-out date"
      );
      return;
    }

    const userData = localStorage.getItem("userData");
    const user = userData ? JSON.parse(userData) : null;
    console.log({ user });
    if (!user) {
      const booking = {
        roomDetails: {
          roomType: roomData,
          checkinDate: format(checkInDate, "dd-MM-yy"),
          checkOutDate: format(checkOutDate, "dd-MM-yy"),
          occupancy: occupants,
        },
        total_price: totalAmount,
      };
      setBookingDetails(booking);
      localStorage.setItem("roomBookingDetails", JSON.stringify(booking));
      setNotLoggedInModal(true);
    } else {
      delete user?.token;
      const booking = {
        userDetails: user?.user,
        roomDetails: {
          roomType: roomData,
          checkinDate: format(checkInDate, "dd-MM-yy"),
          checkOutDate: format(checkOutDate, "dd-MM-yy"),
          occupancy: occupants,
        },
        total_price: totalAmount,
        email: user?.user?.email,
      };
      try {
        await axios.post(
          `https://sunet-be.onrender.com/api/rooms/create-booking`,
          booking,
          { headers: { Authorization: `Bearer ${user?.token}` } }
        );
        toast.success("Your booking was successful");
      } catch (error: any) {
        toast.error(error?.message);
      }
    }
  };

  useEffect(() => {
    const difference = formatDateDifference(checkInDate, checkOutDate);
    const newDifference = difference + 1;
    setDateDifference(newDifference);
    setTotalAmount(roomData?.price * newDifference);
  }, [checkInDate, checkOutDate]);

  useEffect(() => {
    const roomBookingDetails = localStorage.getItem("roomBookingDetails");
    const savedData = roomBookingDetails
      ? JSON.parse(roomBookingDetails)
      : null;

    if (!savedData) {
      const data = localStorage.getItem("roomData");
      const savedData = data ? JSON.parse(data) : null;
      setRoomData(savedData);
      setTotalAmount(savedData?.price);
    } else {
      setRoomData(savedData?.roomDetails?.roomType);
      setTotalAmount(savedData?.roomDetails?.roomType?.price);
      setcheckInDate(new Date(savedData?.roomDetails?.checkinDate));
      setcheckOutDate(new Date(savedData?.roomDetails?.checkOutDate));
      setOccupants(savedData?.roomDetails?.occupancy);
    }
  }, []);
  return (
    <div>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Layout>
          <ToastContainer />
          <div className="max-w-7xl w-full mx-auto p-5">
            <h1 className="font-semibold text-4xl">
              {roomData?.roomName} <small>({roomData?.roomType})</small>
            </h1>

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
                      setVisibleImg(true);
                      setActiveIndex(index);
                    }}
                  />
                ))}
            </div>

            <div className="mt-10 grid grid-cols-1 md:flex gap-10">
              <div>
                <p className="text-3xl font-semibold mb-5">Room overview</p>
                <p>
                  Step into comfort and elegance with our luxurious hotel rooms.
                  Designed for relaxation, each room features modern amenities,
                  plush bedding, and deluxe bathrooms. Whether traveling for
                  business or leisure, our rooms provide the perfect retreat for
                  a rejuvenating stay.
                </p>
                <div className="mt-5 pt-5">
                  <p className="text-3xl font-semibold mb-5">
                    What&apos;s included
                  </p>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full p-1 bg-green-100 text-green-500 h-fit">
                        <FaCheck size={12} />
                      </div>
                      <p>
                        Beverages, drinking water, morning tea and buffet lunch
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="rounded-full p-1 bg-green-100 text-green-500 h-fit">
                        <FaCheck size={12} />
                      </div>
                      <p>
                        Beverages, drinking water, morning tea and buffet lunch
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="rounded-full p-1 bg-green-100 text-green-500 h-fit">
                        <FaCheck size={12} />
                      </div>
                      <p>
                        Beverages, drinking water, morning tea and buffet lunch
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="rounded-full p-1 bg-green-100 text-green-500 h-fit">
                        <FaCheck size={12} />
                      </div>
                      <p>
                        Beverages, drinking water, morning tea and buffet lunch
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="rounded-full p-1 bg-green-100 text-green-500 h-fit">
                        <FaCheck size={12} />
                      </div>
                      <p>
                        Beverages, drinking water, morning tea and buffet lunch
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-xl p-3 w-full md:w-[45rem] h-fit">
                <p className="whitespace-nowrap text-lg font-semibold">
                  &#8358;{Number(roomData?.price).toLocaleString()}
                </p>

                <div className="text-swGray900 top-24 bg-white w-full rounded-md z-20 mt-5">
                  <div className="flex flex-col gap-5 font-medium w-full">
                    <div className="relative">
                      <p className="text-lg font-medium">Check-in date</p>
                      <div className="flex items-center justify-between border p-2 rounded-md hover:border-jsPrimary100">
                        <p className="text-lg font-medium">
                          {format(checkInDate, "PP")}
                        </p>
                        <div
                          className="w-fit p-2 rounded-full border border-jsPrimary100 text-jsPrimary100 cursor-pointer"
                          onClick={() => setOpenCheckIn(!openCheckIn)}
                        >
                          <FaRegCalendar size={20} />
                        </div>
                      </div>
                      {openCheckIn && (
                        <div className="absolute w-full top-full mt-1 bg-white border rounded-md z-10">
                          <DayPicker
                            styles={{
                              caption: { color: "#C8A008" },
                            }}
                            modifiers={{
                              selected: checkInDate,
                            }}
                            modifiersClassNames={{
                              selected: "my-selected",
                            }}
                            onDayClick={(value) =>
                              handleDateUpdate(value, "checkIn")
                            }
                            className="w-full"
                          />
                          <p
                            className="w-fit ml-auto m-2 p-2 text-jsPrimary100 mt-2 hover:text-white hover:bg-jsPrimary100 cursor-pointer"
                            onClick={() => setOpenCheckIn(false)}
                          >
                            OK
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="relative">
                      <p className="text-lg font-medium">Check-out date</p>
                      <div className="flex items-center justify-between border p-2 rounded-md hover:border-jsPrimary100">
                        <p className="text-lg font-medium">
                          {format(checkOutDate, "PP")}
                        </p>
                        <div
                          className="w-fit p-2 rounded-full border border-jsPrimary100 text-jsPrimary100 cursor-pointer"
                          onClick={() => setOpenCheckOut(!openCheckOut)}
                        >
                          <FaRegCalendar size={20} />
                        </div>
                      </div>
                      {openCheckOut && (
                        <div className="absolute w-full top-full mt-1 bg-white border rounded-md z-10">
                          <DayPicker
                            styles={{
                              caption: { color: "#C8A008" },
                            }}
                            modifiers={{
                              selected: checkOutDate,
                            }}
                            modifiersClassNames={{
                              selected: "my-selected",
                            }}
                            onDayClick={(value) =>
                              handleDateUpdate(value, "checkOut")
                            }
                            className="w-full"
                          />

                          <p
                            className="w-fit ml-auto m-2 p-2 text-jsPrimary100 mt-2 hover:text-white hover:bg-jsPrimary100 cursor-pointer"
                            onClick={() => setOpenCheckOut(false)}
                          >
                            OK
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="mt-2 font-medium">
                    No of nights: {dateDifference}
                  </p>
                </div>

                <div className="mt-5 pt-5 border-t">
                  <div className="flex justify-between items-center text-lg font-medium">
                    <p>Total:</p>
                    <p className="whitespace-nowrap">
                      &#8358;
                      {Number(totalAmount).toLocaleString()}
                    </p>
                  </div>

                  <div
                    className="hover:bg-[#B89010] bg-[#C8A008] cursor-pointer mt-2 font-medium p-5 rounded-md text-center text-white"
                    onClick={handleBookRoom}
                  >
                    Book Now
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Viewer
            visible={visibleImg}
            onClose={() => setVisibleImg(false)}
            images={images.map((image) => ({ src: image }))}
            activeIndex={activeIndex}
          />
          <NotLoggedInModal
            open={notLoggedInModal}
            onClose={setNotLoggedInModal}
            bookingDetails={bookingDetails}
          />
        </Layout>
      )}
    </div>
  );
};

export default RoomPage;
