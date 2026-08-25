import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets_admin/assets";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { aToken, backendUrl } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {

      if (!docImg) {
        return toast.error("Please upload a profile picture for the doctor.");
      }

      const formData = new FormData();

      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      // console log formdata
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } }
      );

      if (data.success) {

        toast.success(
          data.message || "Doctor profile created successfully."
        );

        setDocImg(false);
        setName("");
        setPassword("");
        setEmail("");
        setAddress1("");
        setAddress2("");
        setDegree("");
        setAbout("");
        setFees("");

      } else {

        toast.error(
          data.message || "Unable to add the doctor. Please check the details and try again."
        );

      }

    } catch (error) {

      if (error.response && error.response.data && error.response.data.message) {

        toast.error(error.response.data.message);

      } else {

        toast.error(
          "Unable to connect to the server. Please check your internet connection and try again."
        );

      }

      console.log(error);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="
        w-full
        min-h-screen
        px-4
        py-5
        sm:px-6
        sm:py-7
        lg:px-8
        bg-gradient-to-br
        from-[#F7FCFD]
        via-white
        to-[#EEF8FA]
      "
    >

      {/* Page Heading */}
      <div className="max-w-5xl mx-auto mb-5">

        <p className="
          text-xl
          sm:text-2xl
          font-bold
          text-[#123F78]
        ">
          Add Doctor
        </p>

        <p className="
          mt-1
          text-sm
          text-[#64748B]
        ">
          Create and manage a new doctor profile for MediAyuCare.
        </p>

      </div>


      {/* Main Card */}
      <div
        className="
          relative
          max-w-5xl
          mx-auto
          bg-white
          border border-[#DCECEF]
          rounded-2xl
          px-4 py-5
          sm:px-6 sm:py-7
          lg:px-8 lg:py-8
          shadow-[0_12px_40px_rgba(18,63,120,0.08)]
          max-h-[calc(100vh-150px)]
          overflow-y-auto
        "
      >

        {/* Decorative Top Line */}
        <div
          className="
            absolute
            top-0
            left-0
            w-full
            h-1
            rounded-t-2xl
            bg-gradient-to-r
            from-[#087F8C]
            to-[#123F78]
          "
        />


        {/* Upload Section */}
        <div
          className="
            flex
            flex-col
            sm:flex-row
            items-center
            sm:items-start
            gap-4
            mb-8
            p-4
            sm:p-5
            rounded-xl
            bg-[#F7FCFD]
            border border-[#E2F0F2]
          "
        >

          <label
            htmlFor="doc-img"
            className="
              relative
              flex-shrink-0
              cursor-pointer
              group
            "
          >

            <img
              className="
                w-20
                h-20
                sm:w-24
                sm:h-24
                object-cover
                bg-[#E8F7F9]
                rounded-full
                border-2
                border-[#DCECEF]
                p-1
                transition-all
                duration-200
                group-hover:border-[#087F8C]
                group-hover:shadow-md
              "
              src={
                docImg
                  ? URL.createObjectURL(docImg)
                  : assets.upload_area
              }
              alt="Upload doctor"
            />

          </label>

          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            name=""
            id="doc-img"
            hidden
          />

          <div className="text-center sm:text-left">

            <p className="
              text-[#334155]
              font-semibold
              text-sm
              sm:text-base
            ">
              Doctor Profile Picture
            </p>

            <p className="
              mt-1
              text-xs
              sm:text-sm
              text-[#64748B]
              leading-5
            ">
              Upload a clear profile image of the doctor.
              <br />
              JPG, PNG or other supported image formats.
            </p>

          </div>

        </div>


        {/* Form Fields */}
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-5
            lg:gap-8
            text-[#64748B]
          "
        >

          {/* Left Column */}
          <div className="flex flex-col gap-5">

            {/* Name */}
            <div className="flex flex-col gap-1.5">

              <label className="text-[#334155] font-medium text-sm">
                Doctor Name
              </label>

              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="
                  w-full
                  border border-[#D8E5E8]
                  rounded-lg
                  px-3.5
                  py-3
                  text-[#334155]
                  bg-[#FBFDFD]
                  outline-none
                  placeholder:text-[#94A3B8]
                  focus:border-[#087F8C]
                  focus:ring-2
                  focus:ring-[#087F8C]/10
                  transition-all
                  duration-200
                "
                type="text"
                placeholder="Enter doctor's name"
                required
              />

            </div>


            {/* Email */}
            <div className="flex flex-col gap-1.5">

              <label className="text-[#334155] font-medium text-sm">
                Doctor Email
              </label>

              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="
                  w-full
                  border border-[#D8E5E8]
                  rounded-lg
                  px-3.5
                  py-3
                  text-[#334155]
                  bg-[#FBFDFD]
                  outline-none
                  placeholder:text-[#94A3B8]
                  focus:border-[#087F8C]
                  focus:ring-2
                  focus:ring-[#087F8C]/10
                  transition-all
                  duration-200
                "
                type="email"
                placeholder="doctor@example.com"
                required
              />

            </div>


            {/* Password */}
            <div className="flex flex-col gap-1.5">

              <label className="text-[#334155] font-medium text-sm">
                Set Password
              </label>

              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="
                  w-full
                  border border-[#D8E5E8]
                  rounded-lg
                  px-3.5
                  py-3
                  text-[#334155]
                  bg-[#FBFDFD]
                  outline-none
                  placeholder:text-[#94A3B8]
                  focus:border-[#087F8C]
                  focus:ring-2
                  focus:ring-[#087F8C]/10
                  transition-all
                  duration-200
                "
                type="password"
                placeholder="Create a secure password"
                required
              />

            </div>


            {/* Experience */}
            <div className="flex flex-col gap-1.5">

              <label className="text-[#334155] font-medium text-sm">
                Experience
              </label>

              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="
                  w-full
                  border border-[#D8E5E8]
                  rounded-lg
                  px-3
                  py-3
                  text-[#334155]
                  bg-[#FBFDFD]
                  outline-none
                  focus:border-[#087F8C]
                  focus:ring-2
                  focus:ring-[#087F8C]/10
                  transition-all
                  duration-200
                "
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Years</option>
                <option value="3 Year">3 Years</option>
                <option value="4 Year">4 Years</option>
                <option value="5 Year">5 Years</option>
                <option value="6 Year">6 Years</option>
                <option value="8 Year">8 Years</option>
                <option value="9 Year">9 Years</option>
                <option value="10 Year">10 Years</option>
              </select>

            </div>


            {/* Fees */}
            <div className="flex flex-col gap-1.5">

              <label className="text-[#334155] font-medium text-sm">
                Consultation Fees
              </label>

              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                className="
                  w-full
                  border border-[#D8E5E8]
                  rounded-lg
                  px-3.5
                  py-3
                  text-[#334155]
                  bg-[#FBFDFD]
                  outline-none
                  placeholder:text-[#94A3B8]
                  focus:border-[#087F8C]
                  focus:ring-2
                  focus:ring-[#087F8C]/10
                  transition-all
                  duration-200
                "
                type="number"
                placeholder="Enter consultation fee"
                required
              />

            </div>

          </div>


          {/* Right Column */}
          <div className="flex flex-col gap-5">

            {/* Speciality */}
            <div className="flex flex-col gap-1.5">

              <label className="text-[#334155] font-medium text-sm">
                Speciality
              </label>

              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className="
                  w-full
                  border border-[#D8E5E8]
                  rounded-lg
                  px-3
                  py-3
                  text-[#334155]
                  bg-[#FBFDFD]
                  outline-none
                  focus:border-[#087F8C]
                  focus:ring-2
                  focus:ring-[#087F8C]/10
                  transition-all
                  duration-200
                "
              >
                <option value="General physician">
                  General physician
                </option>
                <option value="Gynecologist">
                  Gynecologist
                </option>
                <option value="Dermatologist">
                  Dermatologist
                </option>
                <option value="Pediatricians">
                  Pediatricians
                </option>
                <option value="Neurologist">
                  Neurologist
                </option>
                <option value="Gastroenterologist">
                  Gastroenterologist
                </option>
              </select>

            </div>


            {/* Degree */}
            <div className="flex flex-col gap-1.5">

              <label className="text-[#334155] font-medium text-sm">
                Degree
              </label>

              <input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                className="
                  w-full
                  border border-[#D8E5E8]
                  rounded-lg
                  px-3.5
                  py-3
                  text-[#334155]
                  bg-[#FBFDFD]
                  outline-none
                  placeholder:text-[#94A3B8]
                  focus:border-[#087F8C]
                  focus:ring-2
                  focus:ring-[#087F8C]/10
                  transition-all
                  duration-200
                "
                type="text"
                placeholder="e.g. MBBS, MD"
                required
              />

            </div>


            {/* Address */}
            <div className="flex flex-col gap-1.5">

              <label className="text-[#334155] font-medium text-sm">
                Clinic Address
              </label>

              <input
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                className="
                  w-full
                  border border-[#D8E5E8]
                  rounded-lg
                  px-3.5
                  py-3
                  text-[#334155]
                  bg-[#FBFDFD]
                  outline-none
                  placeholder:text-[#94A3B8]
                  focus:border-[#087F8C]
                  focus:ring-2
                  focus:ring-[#087F8C]/10
                  transition-all
                  duration-200
                "
                type="text"
                placeholder="Address line 1"
                required
              />

              <input
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                className="
                  w-full
                  border border-[#D8E5E8]
                  rounded-lg
                  px-3.5
                  py-3
                  text-[#334155]
                  bg-[#FBFDFD]
                  outline-none
                  placeholder:text-[#94A3B8]
                  focus:border-[#087F8C]
                  focus:ring-2
                  focus:ring-[#087F8C]/10
                  transition-all
                  duration-200
                "
                type="text"
                placeholder="Address line 2"
                required
              />

            </div>

          </div>

        </div>


        {/* About Doctor */}
        <div className="mt-6">

          <label className="
            block
            text-[#334155]
            font-medium
            text-sm
            mb-1.5
          ">
            About Doctor
          </label>

          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            className="
              w-full
              px-4
              py-3
              border border-[#D8E5E8]
              rounded-lg
              text-[#334155]
              bg-[#FBFDFD]
              outline-none
              placeholder:text-[#94A3B8]
              resize-none
              focus:border-[#087F8C]
              focus:ring-2
              focus:ring-[#087F8C]/10
              transition-all
              duration-200
            "
            rows={5}
            placeholder="Write a short professional description about the doctor..."
          ></textarea>

        </div>


        {/* Submit */}
        <div className="
          flex
          justify-end
          mt-6
          pt-5
          border-t border-[#EDF2F3]
        ">

          <button
            type="submit"
            className="
              w-full
              sm:w-auto
              bg-gradient-to-r
              from-[#087F8C]
              to-[#123F78]
              px-8
              sm:px-10
              py-3
              text-white
              rounded-lg
              text-sm
              font-semibold
              shadow-[0_6px_18px_rgba(8,127,140,0.20)]
              hover:shadow-[0_8px_24px_rgba(8,127,140,0.28)]
              hover:-translate-y-0.5
              active:translate-y-0
              transition-all
              duration-300
            "
          >
            Add Doctor
          </button>

        </div>

      </div>

    </form>
  );
};

export default AddDoctor;