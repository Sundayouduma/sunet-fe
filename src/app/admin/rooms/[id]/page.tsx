"use client";
import AdminLayout from "@/app/components/layout/AdminLayout";
import { useState } from "react";
import { FaCheck, FaStar } from "react-icons/fa";
import { LiaBookReaderSolid } from "react-icons/lia";
import Viewer from "react-viewer";

const Room = () => {
  const [visibleImg, setVisibleImg] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const images = [
    "https://assets-global.website-files.com/5c6d6c45eaa55f57c6367749/65045f093c166fdddb4a94a5_x-65045f0266217.webp",
    "https://assets-global.website-files.com/5c6d6c45eaa55f57c6367749/65d7d7080ab85f33665b94d6_RoomView022224.webp",
    "https://static01.nyt.com/images/2019/03/24/travel/24trending-shophotels1/24trending-shophotels1-jumbo.jpg?quality=75&auto=webp",
    "https://a0.muscache.com/im/pictures/miso/Hosting-53627561/original/cc19cf5f-d04f-4b61-99b0-53b77aca7ba6.jpeg?im_w=720",
  ];

  return (
    <AdminLayout>
      <div className="max-w-7xl w-full mx-auto p-5">
        <h1 className="font-semibold text-4xl">
          Room 203 <small>(standard)</small>
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
              </div>
            </div>
          </div>

          {/* <div className="border rounded-xl p-3 w-full md:w-[45rem] h-fit">
            <p className="whitespace-nowrap text-lg font-semibold">
              &#8358;{Number(roomData?.price).toLocaleString()}
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
              <p className="mt-2 font-medium">No of nights: {dateDifference}</p>
            </div>

            <div className="mt-5 pt-5 border-t">
              <div className="flex justify-between items-center text-lg font-medium">
                <p>Total:</p>
                <p className="whitespace-nowrap">
                  &#8358;
                  {Number(totalAmount).toLocaleString()}
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
                  Please login to complete your order
                </div>
              )}
            </div>
          </div> */}
        </div>
      </div>
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
