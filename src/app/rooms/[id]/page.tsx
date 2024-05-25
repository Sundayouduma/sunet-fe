"use client";
import { FaCheck, FaRegCalendar, FaStar } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import { LiaBookReaderSolid } from "react-icons/lia";
import Layout from "../../components/layout/UserLayout";
import { useEffect, useState } from "react";
import Viewer from "react-viewer";
import { toast, ToastContainer } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css";
import NotLoggedInModal from "@/app/components/shared/modals/notLoggedInModal";
import axios from "axios";
import LoadingPage from "@/app/components/loaders/Loader";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import formatDateDifference from "../../../app/helpers/dateDifference";
import { format } from "date-fns";
import React from "react";
import { PaystackButton as ReactPaystackButton } from "react-paystack";
import { useParams, useRouter } from "next/navigation";

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
  const param = useParams();
  const publicKey = "pk_test_2c1e582d761c7350f80ab5c922419a5fd1a06773";

  const [data, setData] = useState<any>({});
  const onSuccess = (reference: string) => {
    console.log("Payment successful", reference);
    handleBookRoom();
  };

  const onClose = () => {
    console.log("Payment closed");
    // Handle payment close
  };

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
  const [totalAmount, setTotalAmount] = useState(
    Number(data?.price ? data?.price : 0)
  );
  const [visibleImg, setVisibleImg] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dateDifference, setDateDifference] = useState(1);
  const [notLoggedInModal, setNotLoggedInModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({});
  const [user, setUser] = useState<any>({});
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  console.log(data?.price);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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

  const handleNotLoggedIn = () => {
    const booking = {
      roomDetails: {
        id: data?._id,
        checkinDate: format(checkInDate, "yyyy-MM-dd"),
        checkOutDate: format(checkOutDate, "yyyy-MM-dd"),
        occupancy: occupants,
      },
      total_price: totalAmount,
    };
    setBookingDetails(booking);
    localStorage.setItem("roomBookingDetails", JSON.stringify(booking));
    // setNotLoggedInModal(true);
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
    // console.log({ user });
    if (!user) {
      handleNotLoggedIn();
    } else {
      delete user?.token;
      const booking = {
        userDetails: user?.user,
        roomDetails: {
          roomType: data,
          checkinDate: format(checkInDate, "yyyy-MM-dd"),
          checkOutDate: format(checkOutDate, "yyyy-MM-dd"),
          occupancy: occupants,
        },
        total_price: totalAmount.toString(),
        email: user?.user?.email,
      };
      // console.log({ booking });

      setUser(user?.user?.email);
      try {
        await axios.post(
          `https://sunet-be.onrender.com/api/rooms/create-booking`,
          booking,
          { headers: { Authorization: `Bearer ${user?.token}` } }
        );
        toast.success("Your booking was successful");
        localStorage.removeItem("roomBookingDetails");
        router.push("/");
      } catch (error: any) {
        toast.error(error?.message);
      }
    }
  };

  useEffect(() => {
    const difference =
      formatDateDifference(checkInDate, checkOutDate) === 0
        ? 1
        : formatDateDifference(checkInDate, checkOutDate);

    setDateDifference(difference);
    setTotalAmount(Number(data?.price ? data?.price : 0) * difference);
  }, [checkInDate, checkOutDate, data?.price]);

  useEffect(() => {
    const roomBookingDetails = localStorage.getItem("roomBookingDetails");
    const userData = localStorage.getItem("userData");
    const user = userData ? JSON.parse(userData) : null;

    setUser(user);
    const savedData = roomBookingDetails
      ? JSON.parse(roomBookingDetails)
      : null;

    if (savedData) {
      setcheckInDate(new Date(savedData?.roomDetails?.checkinDate));
      setcheckOutDate(new Date(savedData?.roomDetails?.checkOutDate));
      setOccupants(savedData?.roomDetails?.occupancy);
    }
  }, []);

  const getRoomData = async () => {
    try {
      const response = await axios.get(
        `https://sunet-be.onrender.com/api/rooms/${param.id}`
      );
      setData(response.data);
      // setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRoomData();
  }, []);
  console.log({ data });

  return (
    <div>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Layout>
          <ToastContainer />
          <div className="max-w-7xl w-full mx-auto p-5">
            <h1 className="font-semibold text-4xl">
              {data?.roomName} <small>({data?.roomType})</small>
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
              {data?.images &&
                data?.images
                  .filter((_: any, index: number) => index <= 2)
                  .map((image: string, index: number) => (
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
                  plush bedding, and Executive Luxury bathrooms. Whether
                  traveling for business or leisure, our rooms provide the
                  perfect retreat for a rejuvenating stay.
                </p>
                <div className="mt-5 pt-5">
                  <p className="text-3xl font-semibold mb-5">
                    What&apos;s included
                  </p>
                  {data?.amenities &&
                    JSON.parse(data?.amenities)?.map((amenity: any) => (
                      <div key={amenity} className="flex items-center gap-2">
                        <div className="rounded-full p-1 bg-green-100 text-green-500 h-fit">
                          <FaCheck size={12} />
                        </div>
                        <p>{amenity}</p>
                      </div>
                    ))}
                </div>
              </div>

              <div className="border rounded-xl p-3 w-full md:w-[45rem] h-fit">
                <p className="whitespace-nowrap text-lg font-semibold">
                  &#8358;{Number(data?.price).toLocaleString()}
                </p>

                <div className="text-swGray900 top-24 bg-white w-full rounded-md z-20 mt-5">
                  <div className="flex flex-col gap-5 font-medium w-full">
                    <div className="relative">
                      <p className="text-lg font-medium">Check-in date</p>
                      <div className="flex items-center justify-between border p-2 rounded-md hover:border-jsPrimary100">
                        <p className="text-lg font-medium">
                          {checkInDate instanceof Date
                            ? format(checkInDate, "PPP")
                            : format(new Date(checkInDate), "PPP")}
                        </p>
                        <div
                          className="w-fit p-2 rounded-full border border-jsPrimary100 text-jsPrimary100 cursor-pointer"
                          onClick={() => setOpenCheckIn(!openCheckIn)}
                        >
                          <FaRegCalendar size={20} />
                        </div>
                      </div>
                      {openCheckIn && (
                        <div className="absolute top-full mt-1 right-0 bg-white border rounded-md z-10">
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
                          {checkInDate instanceof Date
                            ? format(checkOutDate, "PPP")
                            : format(new Date(checkOutDate), "PPP")}
                        </p>
                        <div
                          className="w-fit p-2 rounded-full border border-jsPrimary100 text-jsPrimary100 cursor-pointer"
                          onClick={() => setOpenCheckOut(!openCheckOut)}
                        >
                          <FaRegCalendar size={20} />
                        </div>
                      </div>
                      {openCheckOut && (
                        <div className="absolute top-full mt-1 right-0 bg-white border rounded-md z-10">
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
                      {totalAmount}
                    </p>
                  </div>

                  {user ? (
                    <div className="w-full ">
                      <ReactPaystackButton
                        text="Pay Now"
                        className="payButton hover:bg-[#B89010] bg-[#C8A008] cursor-pointer mt-2 font-medium p-3 rounded-md text-center text-white block w-full"
                        onSuccess={onSuccess} // Use onSuccess instead of callback
                        onClose={onClose}
                        email={user?.user?.email}
                        amount={totalAmount * 100}
                        publicKey={publicKey}
                      />
                    </div>
                  ) : (
                    <div
                      className="hover:bg-[#B89010] bg-[#C8A008] cursor-pointer mt-2 font-medium p-3 rounded-md text-center text-white"
                      onClick={() => {
                        handleNotLoggedIn();
                        router.push("/sign-in");
                      }}
                    >
                      Sign-in to continue
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Viewer
            visible={visibleImg}
            onClose={() => setVisibleImg(false)}
            images={data?.images.map((image: string) => ({ src: image }))}
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
