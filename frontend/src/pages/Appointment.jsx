import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import RelatedDoctors from "../components/RelatedDoctors";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = async () => {
    const foundDoc = doctors.find((doc) => doc._id === docId);
    setDocInfo(foundDoc);
  };

  const getAvilableSlots = async () => {
    let allSlots = [];
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(23, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10,
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      allSlots.push(timeSlots);
    }

    setDocSlots(allSlots);
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvilableSlots();
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  if (!docInfo) {
    return (
      <div className="flex items-center justify-center min-h-[300px] text-[#64748B] text-sm">
        Loading doctor details...
      </div>
    );
  }

  return (
    docInfo && (
      <div className="pb-16">

        {/* ---------- Doctor Information ---------- */}
        <div className="flex flex-col sm:flex-row gap-5">

          {/* Doctor Image */}
          <div className="sm:w-auto">

            <div className="relative w-full sm:max-w-72 overflow-hidden rounded-2xl
                            bg-gradient-to-br from-[#E8F7FA] via-[#F2FBFC] to-[#DCEFF3]
                            border border-[#D6E9ED] shadow-md">

              {/* Soft decorative background */}
              <div className="absolute -top-12 -right-12 w-32 h-32
                              bg-[#BFE7EC] opacity-40 rounded-full">
              </div>

              <div className="absolute -bottom-14 -left-14 w-36 h-36
                              bg-[#CFECEF] opacity-50 rounded-full">
              </div>

              <img
                className="relative z-10 w-full h-auto object-cover"
                src={docInfo.image}
                alt={docInfo.name || "Doctor"}
              />

            </div>

          </div>


          {/* Doctor Details */}
          <div className="flex-1 border border-[#DCE9ED] rounded-2xl
                          p-6 sm:p-8 bg-white shadow-sm
                          hover:shadow-md transition-shadow duration-300">

            {/* Doctor Name */}
            <p className="flex items-center gap-2 text-2xl md:text-3xl
                          font-semibold text-[#123F78]">

              {docInfo.name}

              <img
                className="w-5"
                src={assets.verified_icon}
                alt=""
              />

            </p>


            {/* Degree + Speciality + Experience */}
            <div className="flex flex-wrap items-center gap-2 text-sm
                            mt-3 text-[#64748B]">

              <p className="font-medium">
                {docInfo.degree} - {docInfo.speciality}
              </p>

              <button
                className="py-1 px-3 border border-[#CDE9ED]
                           text-xs rounded-full
                           bg-[#EAF8F1] text-[#087F8C]
                           font-medium"
              >
                {docInfo.experience}
              </button>

            </div>


            {/* Doctor About */}
            <div>

              <p className="flex items-center gap-1 text-sm font-semibold
                            text-[#123F78] mt-5">

                About

                <img
                  className="w-4 opacity-70"
                  src={assets.info_icon}
                  alt=""
                />

              </p>

              <p className="text-sm text-[#64748B] leading-6
                            max-w-[700px] mt-2">

                {docInfo.about}

              </p>

            </div>


            {/* Appointment Fee */}
            <p className="text-[#64748B] font-medium mt-5 text-sm">

              Appointment fee:

              <span className="text-[#123F78] font-semibold ml-1">

                {currencySymbol}
                {docInfo.fees}

              </span>

            </p>

          </div>

        </div>


        {/* ---------- Booking Slots ---------- */}
        <div className="sm:ml-72 sm:pl-4 mt-8 font-medium text-[#334155]">

          <p className="text-lg font-semibold text-[#123F78]">
            Booking slots
          </p>


          {/* Date Slots */}
          <div className="flex gap-3 items-center w-full
                          overflow-x-scroll mt-5 pb-2">

            {docSlots.length > 0 &&
              docSlots.map((item, index) => {

                let labelDate = new Date();
                labelDate.setDate(labelDate.getDate() + index);

                return (
                  <div
                    onClick={() => setSlotIndex(index)}
                    className={`text-center py-5 min-w-16 rounded-full
                    cursor-pointer transition-all duration-200
                    ${
                      slotIndex === index
                        ? "bg-[#087F8C] text-white shadow-md scale-105"
                        : "bg-white border border-[#D9E3E8] text-[#64748B] hover:border-[#087F8C] hover:text-[#087F8C] hover:bg-[#F0FAFA]"
                    }`}
                    key={index}
                  >

                    <p className="text-xs font-medium">
                      {daysOfWeek[labelDate.getDay()]}
                    </p>

                    <p className="text-base font-semibold mt-1">
                      {labelDate.getDate()}
                    </p>

                  </div>
                );
              })}

          </div>


          {/* Time Slots */}
          <div className="flex items-center gap-3 w-full
                          overflow-x-scroll mt-5 pb-2">

            {docSlots.length > 0 &&
              docSlots[slotIndex].map((item, index) => (

                <p
                  onClick={() => setSlotTime(item.time)}
                  key={index}
                  className={`text-sm font-medium flex-shrink-0
                  px-5 py-2.5 rounded-full cursor-pointer
                  transition-all duration-200
                  ${
                    item.time === slotTime
                      ? "bg-[#087F8C] text-white shadow-sm"
                      : "text-[#64748B] bg-white border border-[#CBD5E1] hover:border-[#087F8C] hover:text-[#087F8C] hover:bg-[#F0FAFA]"
                  }`}
                >
                  {item.time.toLowerCase()}
                </p>

              ))}

          </div>


          {/* Book Button */}
          <button
            className="bg-[#087F8C] text-white text-sm font-semibold
                       px-14 py-3.5 rounded-full my-7
                       shadow-sm hover:bg-[#066C77]
                       hover:shadow-lg hover:-translate-y-0.5
                       transition-all duration-300"
          >
            Book an appointment
          </button>

        </div>


        {/* ---------- Related Doctors ---------- */}
        <RelatedDoctors
          docId={docId}
          speciality={docInfo.speciality}
        />

      </div>
    )
  );
};

export default Appointment;