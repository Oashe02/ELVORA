"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Paperclip } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance"; 
import { CheckCircle } from "lucide-react";


const GetAQuotePopup = ({isScrolled = false }) => {
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("mobileNumber", form.phone);
      formData.append("message", form.message);
      formData.append("file", file);

      const res = await axiosInstance.post("/quote", formData);
      if (res.data.success) {
        setSuccess(true);
        setForm({ name: "", email: "", phone: "", message: "" });
        setFile(null);
      }
    } catch (err) {
      console.error("Submit error:", err?.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
      <button
          className={`h-[35px] w-[136px] rounded-full text-sm font-semibold transition border 
          ${isScrolled 
            ? "border-gray-300 text-gray-600 bg-white hover:bg-gray-100" 
            : "border-gray-200 text-white hover:bg-[#3096a5] hover:text-white"
          }`}
        >
          GET A QUOTE
        </button>

      </DialogTrigger>
      <DialogContent className="w-full max-w-md p-6 border border-gray-500 shadow-2xl">
        <div className="text-center mb-6">
        <h2
  className={`text-[14px] font-bold border px-6 py-1 rounded-full inline-block transition-all duration-300 
    ${isScrolled ? "border-gray-800 text-black" : "border-gray-300 text-white"}`}
>
  GET A QUOTE
</h2>
          <p className="mt-2 text-sm font-medium tracking-widest text-gray-600 uppercase">
            Submit Your Inquiry Now
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Our dedicated team will be in contact with you shortly.
          </p>
        </div>

        {success ? (
  <div className="flex flex-col items-center gap-3 py-8">
    <CheckCircle className="text-green-600" size={48} />
    <h1 className="text-green-700 text-base font-medium">Your quote has been submitted!</h1>
    <p className="text-green-700 text-base font-medium">We will Reach you Soon..</p>
  </div>
) :  (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="NAME"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 text-sm border border-gray-300 shadow-inner bg-gradient-to-b from-white to-gray-100"
            />
            <input
              type="email"
              name="email"
              placeholder="EMAIL"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 text-sm border border-gray-300 shadow-inner bg-gradient-to-b from-white to-gray-100"
            />
            <input
              type="tel"
              name="phone"
              placeholder="PHONE"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 text-sm border border-gray-300 shadow-inner bg-gradient-to-b from-white to-gray-100"
            />
            <textarea
              name="message"
              placeholder="MESSAGE"
              rows={4}
              value={form.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 text-sm border border-gray-300 shadow-inner bg-gradient-to-b from-white to-gray-100 resize-none"
            ></textarea>
            <label className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 bg-gradient-to-b from-white to-gray-200 cursor-pointer text-sm text-gray-600">
              <span>{file?.name || "Attach File* or Drag your File Here"}</span>
              <Paperclip size={16} />
              <input type="file" onChange={handleFileChange} className="hidden" />
            </label>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 text-white bg-teal-600 hover:bg-teal-700 text-sm font-medium"
            >
              {loading ? "Sending..." : "SUBMIT"}
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GetAQuotePopup;
