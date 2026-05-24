"use client";

interface EnrollmentSuccessProps {
  submitMessage: string;
  formData: {
    fullName: string;
    phone: string;
    email: string;
    course: string;
    startDate: string;
    note: string;
  };
}

export const EnrollmentSuccess = ({
  submitMessage,
  formData,
}: EnrollmentSuccessProps) => {
  if (submitMessage.includes("Success")) {
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
          Enrollment Accepted!
        </h3>
        <p className="text-green-700 text-base">
          We have received your enrollment. You will hear from us real quick to
          confirm your details.
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
