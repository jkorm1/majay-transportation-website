"use client";

interface RideRequestSuccessProps {
  submitMessage: string;
  formData: {
    name: string;
    phone: string;
    location: string;
    pickupTime: string;
    customTime: string;
  };
}

export const RideRequestSuccess = ({
  submitMessage,
  formData,
}: RideRequestSuccessProps) => {
  // Add debug logs
  console.log("RideRequestSuccess formData:", formData);
  console.log("formData.pickupTime:", formData.pickupTime);
  console.log("formData.customTime:", formData.customTime);

  if (submitMessage.includes("success")) {
    const isRightNow = formData.pickupTime === "Right Now";

    // Add debug log
    console.log("isRightNow:", isRightNow);

    return (
      <div className="p-8 bg-green-50 border border-green-200 rounded-xl text-center space-y-5">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-green-800">
          {isRightNow ? "Driver is on the way!" : "Ride Request Accepted!"}
        </h3>
        <p className="text-green-700 text-base">
          {isRightNow
            ? "Great news! A driver is heading to your location right now. You'll receive a call shortly to confirm your details."
            : `We have received your ride request for ${formData.customTime || "the specified time"}. You will hear from us real quick to confirm your details.`}
        </p>
      </div>
    );
  }

  return (
    <div className="p-3 rounded-lg text-center text-sm font-semibold bg-red-100 text-red-700">
      {submitMessage}
    </div>
  );
};
