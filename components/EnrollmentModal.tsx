"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { EnrollmentSuccess } from "./EnrollmentSuccess";

interface EnrollmentModalProps {
  showForm: boolean;
  setShowForm: (show: boolean) => void;
  formData: {
    fullName: string;
    phone: string;
    email: string;
    course: string;
    startDate: string;
    note: string;
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

export const EnrollmentModal = ({
  showForm,
  setShowForm,
  formData,
  handleInputChange,
  handleSubmit,
  isSubmitting,
  submitMessage,
}: EnrollmentModalProps) => {
  if (!showForm) return null;

  const isSuccess = submitMessage && submitMessage.includes("Success");

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
            {isSuccess ? "Confirmation" : "Enroll Now"}
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
            <EnrollmentSuccess
              submitMessage={submitMessage}
              formData={formData}
            />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-semibold text-blue-950 mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
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
                  htmlFor="email"
                  className="block text-sm font-semibold text-blue-950 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-950 focus:ring-2 focus:ring-blue-200"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="course"
                  className="block text-sm font-semibold text-blue-950 mb-2"
                >
                  Select Course
                </label>
                <select
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-950 focus:ring-2 focus:ring-blue-200"
                >
                  <option value="Beginner Course (Regular)">
                    Beginner Course (Regular) - GH₵ 1,000 (3 Weeks)
                  </option>
                  <option value="Beginner Course (Premium)">
                    Beginner Course (Premium) - GH₵ 1,500 (4 Weeks)
                  </option>
                  <option value="Refresher Course">
                    Refresher Course - GH₵ 650 (1 Week)
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-semibold text-blue-950 mb-2"
                >
                  Preferred Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-950 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div>
                <label
                  htmlFor="note"
                  className="block text-sm font-semibold text-blue-950 mb-2"
                >
                  Additional Notes
                </label>
                <textarea
                  id="note"
                  name="note"
                  value={formData.note}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-950 focus:ring-2 focus:ring-blue-200"
                  placeholder="Any additional questions or information..."
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
                  "Complete Enrollment"
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                We'll contact you shortly to confirm your enrollment.
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
