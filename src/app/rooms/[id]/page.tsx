"use client";
import { FaCheck, FaStar } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import { LiaBookReaderSolid } from "react-icons/lia";
import Layout from "../../components/layout/UserLayout";
import { useState } from "react";
import Viewer from "react-viewer";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { ThemeProvider, createTheme } from "@mui/material";

const RoomPage = () => {
  const [occupants, setOccupants] = useState(1);
  const [checkInDate, setcheckInDate] = useState(dayjs());
  const [checkOutDate, setcheckOutDate] = useState(dayjs());
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const images = [
    "https://assets-global.website-files.com/5c6d6c45eaa55f57c6367749/65045f093c166fdddb4a94a5_x-65045f0266217.webp",
    "https://assets-global.website-files.com/5c6d6c45eaa55f57c6367749/65d7d7080ab85f33665b94d6_RoomView022224.webp",
    "https://static01.nyt.com/images/2019/03/24/travel/24trending-shophotels1/24trending-shophotels1-jumbo.jpg?quality=75&auto=webp",
    "https://a0.muscache.com/im/pictures/miso/Hosting-53627561/original/cc19cf5f-d04f-4b61-99b0-53b77aca7ba6.jpeg?im_w=720",
  ];

  const customTheme = createTheme({
    palette: {
      primary: {
        main: "#C8A008", // Change to your desired primary color
      },
    },
  });

  console.log({ checkInDate });
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
                  setVisible(true);
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
              business or leisure, our rooms provide the perfect retreat for a
              rejuvenating stay.
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
                  <p>Beverages, drinking water, morning tea and buffet lunch</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-full p-1 bg-green-100 text-green-500 h-fit">
                    <FaCheck size={12} />
                  </div>
                  <p>Beverages, drinking water, morning tea and buffet lunch</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-full p-1 bg-green-100 text-green-500 h-fit">
                    <FaCheck size={12} />
                  </div>
                  <p>Beverages, drinking water, morning tea and buffet lunch</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-full p-1 bg-green-100 text-green-500 h-fit">
                    <FaCheck size={12} />
                  </div>
                  <p>Beverages, drinking water, morning tea and buffet lunch</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-full p-1 bg-green-100 text-green-500 h-fit">
                    <FaCheck size={12} />
                  </div>
                  <p>Beverages, drinking water, morning tea and buffet lunch</p>
                </div>
              </div>
            </div>
          </div>
          <div className="border rounded-xl w-full p-3 w-[18rem] md:w-[45rem] h-fit">
            <p className="whitespace-nowrap text-lg font-semibold">
              &#8358;82,000
            </p>

            <div className="text-swGray900 top-24 bg-white w-full rounded-md z-20 mt-5">
              <div className="flex flex-col gap-5 font-medium">
                <ThemeProvider theme={customTheme}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className="rooms flex flex-col gap-2 w-full">
                      <p>Check-in Date</p>
                      <div className="flex relative w-full">
                        {/* <p className="absolute top-1/2 -translate-y-1/2 ml-4">
                        {checkInDate.format("DD-MM-YY")}
                      </p> */}
                        <DatePicker
                          // label="Departure Date"
                          // defaultValue={dayjs()}
                          value={checkInDate}
                          // onClose={() => setDateOpen(null)}
                          onChange={(value: any) => setcheckInDate(value)}
                          // renderInput={(params) => <TextField {...params} />}
                          className="w-full"
                        />
                      </div>
                      <p>Check-out Date</p>
                      <div className="flex relative w-full">
                        {/* <p className="absolute top-1/2 -translate-y-1/2 ml-4">
                        {checkOutDate.format("DD-MM-YY")}
                      </p> */}
                        <DatePicker
                          // label="Arrival Date"
                          // defaultValue={dayjs()}
                          value={checkOutDate}
                          onChange={(value: any) => setcheckOutDate(value)}
                          // onClose={() => setDateOpen(null)}
                          // renderInput={(params) => <TextField {...params} />}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </LocalizationProvider>
                </ThemeProvider>
                <div className="flex justify-between items-center">
                  <p className="">Occupants</p>
                  <div className="rounded-md overflow-hidden flex">
                    <p
                      className="p-2 cursor-pointer rounded-full border"
                      onClick={() =>
                        setOccupants(occupants > 1 ? occupants - 1 : occupants)
                      }
                    >
                      <FiMinus size={20} />
                    </p>
                    <p className="h-10 w-14 flex justify-center items-center">
                      {occupants}
                    </p>
                    <p
                      className="p-2 cursor-pointer rounded-full border"
                      onClick={() => setOccupants(occupants + 1)}
                    >
                      <FiPlus size={20} />
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-5 border-t">
              <div className="flex justify-between items-center text-lg font-medium">
                <p>Total:</p>
                <p className="whitespace-nowrap">&#8358;82,000</p>
              </div>

              <div className="hover:bg-[#B89010] bg-[#C8A008] cursor-pointer mt-2 font-medium p-5 rounded-md text-center text-white">
                Book Now
              </div>
            </div>
          </div>
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
