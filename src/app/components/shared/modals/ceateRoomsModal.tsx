import { IoClose } from "react-icons/io5";
import { FC, useEffect, useState } from "react";
import InputField from "../input-fields/InputFields";
import { FiPaperclip } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";

interface CreateRoomModalProps {
  open: boolean;
  onClose: (value: boolean) => void;
  reload: () => void;
  type: string;
  data?: any;
  id?: any;
}
const CreateRoomModal: FC<CreateRoomModalProps> = ({
  open,
  onClose,
  reload,
  type,
  data,
  id,
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<{
    amenities: string[];
    roomType: string;
    roomName: string;
    price: string;
    availability: boolean;
    images: File[];
  }>({
    amenities: [],
    roomType: "",
    roomName: "",
    price: "",
    availability: true,
    images: [],
  });
  const amenities = ["Wifi", "Tv", "Air Conditioning", "Chiller", "Microwave"];
  const options = [
    { value: "Executive Luxury", label: "Executive Luxury" },
    { value: "Executive Business Suite", label: "Executive Business Suite" },
  ];
  const optionsAvailability = [
    { value: true, label: "Available" },
    { value: false, label: "Not Available" },
  ];
  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderColor: "#B89010", // Replace with your desired color
      borderRadius: "8px",
      borderWidth: "1px",
      padding: "2px",
      boxShadow: state.isFocused ? 0 : 0, // this will remove the blue border
      "&:hover": {
        borderColor: "#B89010", // border style on hover
      },
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#B89010"
        : state.isFocused
        ? "#f0f0f0"
        : "#fff",
    }),
  };
  // console.log(formData);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e: any, amenity: string) => {
    const isChecked = e.target.checked; // Check if the checkbox is checked

    setFormData((prev: any) => {
      if (isChecked) {
        // If checked, add the amenity to the array
        return {
          ...prev,
          amenities: [...prev.amenities, amenity],
        };
      } else {
        // If unchecked, remove the amenity from the array
        return {
          ...prev,
          amenities: prev.amenities.filter((a: string) => a !== amenity),
        };
      }
    });
  };

  const handleFileChange = (e: any) => {
    const files = Array.from(e.target.files) as File[];

    files.length > 0
      ? files.map((item: any) =>
          setFormData((prev: any) => ({
            ...prev,
            images: [...prev.images, item],
          }))
        )
      : setFormData((prev: any) => ({
          ...prev,
          images: [...prev.images, files[0]],
        }));
  };

  const handleFileDelete = (index: number) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  const handleCreateRoom = async () => {
    setLoading(true);
    const payload = new FormData();
    if (type === "create") {
      payload.append("roomName", formData.roomName);
      payload.append("roomType", formData.roomType);
      payload.append("price", formData.price);
      payload.append("amenities", JSON.stringify(formData.amenities));
      formData.images.forEach((image, index) => {
        payload.append("images", image);
      });

      try {
        const response = await axios.post(
          "https://sunet-be.onrender.com/api/rooms/create",
          payload
        );
        if (response.status === 201 || response.status === 200) {
          reload();
          onClose(false);
          toast.success("Room has been created successfully");
        } else {
          console.error("Room created failed:", response.statusText);
          toast.error("Room creation failed. Please try again later.");
        }
      } catch (error: any) {
        console.error("Room creation failed:", error?.message);
        toast.error(error?.message);
      } finally {
        setLoading(false);
        setFormData({
          amenities: [],
          roomType: "",
          roomName: "",
          price: "",
          availability: true,
          images: [],
        });
      }
    } else {
      Object.values(formData).map((e: any) => {
        if (e.length > 0) {
          const key = Object.keys(formData).find(
            (key: any) => formData[key as keyof typeof formData] === e
          );
          console.log({key});
          
          if (key === "images") {
            formData.images.forEach((item) => {
              payload.append(key, item);
            });
          } else if (key === "amenities") {
            payload.append(key, JSON.stringify(formData.amenities));
            payload.append("availability", JSON.stringify(formData.availability));
          } else if (key === "availability") {
           
          } else if (key) {
            const value = formData[key as keyof typeof formData];
            payload.append(key, value as string);
          }
        }
      });
      try {
        console.log({payload});
        
        const response = await axios.put(
          `https://sunet-be.onrender.com/api/rooms/${id}`,
          payload
        );
        if (response.status === 200) {
          toast.success("Room has been updated successfully");
          reload();
          onClose(false);
        } else {
          console.error(response.data?.message);
          toast.error("Room creation failed. Please try again later.");
        }
      } catch (error: any) {
        console.error("Room creation failed:", error);
        toast.error(error?.message);
      } finally {
        setLoading(false);
        setFormData((prev) => ({
          ...prev,
          images: [],
        }));
      }
    }
  };

  useEffect(() => {
    if (data?.amenities) {
      setFormData((prev) => ({
        ...prev,
        amenities: JSON.parse(data?.amenities),
        roomType: data?.roomType,
        roomName: data?.roomName,
        price: data?.price,
        availability: data?.availability
        // images: data?.images,
      }));
    }
  }, [data]);
  console.log(formData);

  if (!open) return;
  return (
    <main className="fixed h-[100vh] w-[100vw] top-0 left-0 bg-black bg-opacity-25 p-5 flex justify-center items-center z-[100]">
      <ToastContainer />
      <div
        className="h-[80vh] flex items-center max-w-lg w-full"
        style={{
          overflow: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="p-5 bg-white rounded-2xl relative w-full text-sm">
          <div className="flex justify-end">
            <IoClose
              size={25}
              className="cursor-pointer"
              onClick={() => onClose(false)}
            />
          </div>

          <div className="mt-5   flex flex-col gap-3">
            <div>
              <p className="font-medium">Room Name</p>
              <InputField
                name="roomName"
                css="border-2 border-jsPrimary100"
                value={formData.roomName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <p className="font-medium">Price</p>
              <InputField
                name="price"
                css="border-2 border-jsPrimary100"
                value={Number(formData.price).toLocaleString()}
                onChange={(e) =>
                  handleInputChange({
                    target: {
                      name: e.target.name,
                      value: e.target.value.replace(/\D/g, ""), // remove non-digit characters
                    },
                  })
                }
              />
            </div>
            <div className="relative">
              <p className="font-medium">Room Type</p>
              <Select
                options={options}
                value={options.find((e) => e.value === formData.roomType)}
                onChange={(e: any) =>
                  setFormData((prev) => ({ ...prev, roomType: e.value }))
                }
                styles={customStyles}
              />
            </div>
            <div className="relative">
              <p className="font-medium">Update Room Availability</p>
              <Select
                options={optionsAvailability}
                value={optionsAvailability.find((e) => e.value === formData.availability)}
                onChange={(e: any) =>
                {  setFormData((prev) => ({ ...prev, availability: e.value })); console.log({});
                }
                }
                styles={customStyles}
              />
            </div>
            <div>
              <p className="font-medium">Amenities</p>
              <div className="flex flex-col gap-1 mt-1">
                {amenities.map((item, index) => (
                  <label
                    key={index}
                    htmlFor={item}
                    className="flex item-center gap-2"
                  >
                    <input
                      type="checkbox"
                      id={item}
                      checked={formData.amenities.includes(item)}
                      onChange={(e) => handleCheckbox(e, item)}
                      className="h-5 w-5 accent-jsPrimary100"
                    />{" "}
                    {item}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className="font-medium">Images</p>

              <div className="border border-jsPrimary100 rounded-md w-fit py-2 px-4 mt-1 cursor-pointer">
                <label htmlFor="roomImgs">
                  <input
                    type="file"
                    id="roomImgs"
                    className="hidden"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    // onClick={(e) => (e.target.value = null)}
                  />
                  <div className="flex gap-3 items-center cursor-pointer">
                    <FiPaperclip size={20} />
                    <p>Select Images</p>
                  </div>
                </label>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {formData.images.length > 0 &&
                formData.images.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="w-full bg-gray-200 rounded-md flex justify-between items-center p-2"
                  >
                    <p>{item.name}</p>
                    <FaRegTrashAlt
                      size={20}
                      className="text-red-500 cursor-pointer"
                      onClick={() => handleFileDelete(index)}
                    />
                  </div>
                ))}
            </div>

            <div className="flex justify-end">
              <button
                className={`relative bg-jsPrimary100 rounded-md py-2 px-4 text-white`}
                onClick={handleCreateRoom}
              >
                Create Room
                {type === "create" ? (
                  <div
                    className={`${
                      loading ||
                      Object.values(formData).some((e: any) => e.length < 1)
                        ? "bg-white bg-opacity-50 h-full w-full absolute top-0 left-0 cursor-not-allowed"
                        : "hidden"
                    }`}
                  />
                ) : (
                  <div
                    className={`${
                      loading
                        ? "bg-white bg-opacity-50 h-full w-full absolute top-0 left-0 cursor-not-allowed"
                        : "hidden"
                    }`}
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreateRoomModal;
