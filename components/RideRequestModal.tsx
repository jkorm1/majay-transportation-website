"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { RideRequestSuccess } from "./RideRequestSuccess";

interface RideRequestModalProps {
  showForm: boolean;
  setShowForm: (show: boolean) => void;
  formData: {
    name: string;
    phone: string;
    location: string;
    pickupTime: string;
    customTime: string;
    price: string;
    notes: string;
  };
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  isSubmitting: boolean;
  submitMessage: string;
}

export const RideRequestModal = ({
  showForm,
  setShowForm,
  formData,
  handleInputChange,
  handleSubmit,
  isSubmitting,
  submitMessage,
}: RideRequestModalProps) => {
  if (!showForm) return null;

  const isSuccess = submitMessage && submitMessage.includes("success");

  // 添加调试日志
  console.log("RideRequestModal formData:", formData);
  console.log("RideRequestModal submitMessage:", submitMessage);
  console.log("RideRequestModal isSuccess:", isSuccess);

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", duration: 0.4 }}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-950 to-blue-900 text-white p-6 flex items-center justify-between z-10 rounded-t-2xl">
          <h2 className="text-2xl font-bold">
            {isSuccess ? "Confirmation" : "Request a Ride"}
          </h2>
          <button
            onClick={() => {
              setShowForm(false);
            }}
            className="p-1 hover:bg-white/20 rounded-lg transition"
            aria-label="Close form"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          {isSuccess ? (
            <RideRequestSuccess
              submitMessage={submitMessage}
              formData={formData}
            />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-blue-950 mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-950 focus:ring-2 focus:ring-blue-200"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-blue-950 mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-950 focus:ring-2 focus:ring-blue-200"
                  placeholder="0599493721"
                />
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-semibold text-blue-950 mb-2"
                >
                  Pickup Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-950 focus:ring-2 focus:ring-blue-200"
                  placeholder="Your pickup location"
                />
              </div>
              {/* 添加取货时间选择字段 */}
              <div>
                <label
                  htmlFor="pickupTime"
                  className="block text-sm font-semibold text-blue-950 mb-2"
                >
                  Pickup Time
                </label>
                <select
                  id="pickupTime"
                  name="pickupTime"
                  value={formData.pickupTime}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-950 focus:ring-2 focus:ring-blue-200"
                >
                  <option value="">Select pickup time</option>
                  <option value="Right Now">Right Now</option>
                  <option value="Custom">Set Custom Time</option>
                </select>
              </div>
              {/* 自定义时间输入，仅在选择"Set Custom Time"时显示 */}
              {formData.pickupTime === "Custom" && (
                <div>
                  <label
                    htmlFor="customTime"
                    className="block text-sm font-semibold text-blue-950 mb-2"
                  >
                    Select Time
                  </label>
                  <input
                    type="time"
                    id="customTime"
                    name="customTime"
                    value={formData.customTime || ""}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-950 focus:ring-2 focus:ring-blue-200"
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-semibold text-blue-950 mb-2"
                >
                  Willing to Pay
                </label>
                <select
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-950 focus:ring-2 focus:ring-blue-200"
                >
                  <option value="">Select amount</option>
                  <option value="20">GH₵ 20</option>
                  <option value="25">GH₵ 25</option>
                  <option value="30">GH₵ 30</option>
                  <option value="40">GH₵ 40</option>
                  <option value="50">GH₵ 50</option>
                </select>
              </div>

              {/* 添加备注字段 */}
              <div>
                <label
                  htmlFor="notes"
                  className="block text-sm font-semibold text-blue-950 mb-2"
                >
                  Additional Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-950 focus:ring-2 focus:ring-blue-200"
                  placeholder="Any additional information... (e.g., I'm going to Queens Hall, I have luggage, I'm in a hurry, etc.)"
                />
              </div>
              {submitMessage && !isSuccess && (
                <div className="p-3 rounded-lg text-center text-sm font-semibold bg-red-100 text-red-700">
                  {submitMessage}
                </div>
              )}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-950 font-bold text-lg py-3 disabled:opacity-50 transition-all duration-300"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin rounded-full h-5 w-5 border-2 border-blue-950 border-t-transparent"></span>
                    <span>Submitting...</span>
                  </span>
                ) : (
                  "Request Ride"
                )}
              </Button>
              <p className="text-xs text-gray-500 text-center">
                We'll contact you shortly to confirm your ride.
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
