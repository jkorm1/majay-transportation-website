"use client";

import { Button } from "@/components/ui/button";

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
  const handleDownloadReceipt = () => {
    const receiptWindow = window.open("", "_blank");
    if (!receiptWindow) return;

    receiptWindow.document.write(`
      <html>
        <head>
          <title>Enrollment Receipt</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; color: #1e3a8a; }
            .container { max-width: 600px; margin: auto; border: 2px solid #1e3a8a; padding: 30px; border-radius: 8px; }
            h1 { text-align: center; color: #1e3a8a; margin-bottom: 5px; }
            h2 { text-align: center; color: #f59e0b; margin-top: 0; }
            .details { margin-top: 30px; }
            .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
            .label { font-weight: bold; }
            .notice { margin-top: 40px; padding: 15px; background-color: #eff6ff; border-left: 4px solid #1e3a8a; font-size: 14px; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Majay Transportation</h1>
            <h2>Enrollment Receipt</h2>
            <div class="details">
              <div class="detail-row"><span class="label">Full Name:</span> <span>${formData.fullName || "N/A"}</span></div>
              <div class="detail-row"><span class="label">Phone:</span> <span>${formData.phone || "N/A"}</span></div>
              <div class="detail-row"><span class="label">Email:</span> <span>${formData.email || "N/A"}</span></div>
              <div class="detail-row"><span class="label">Course:</span> <span>${formData.course || "N/A"}</span></div>
              <div class="detail-row"><span class="label">Start Date:</span> <span>${formData.startDate || "N/A"}</span></div>
              <div class="detail-row"><span class="label">Date Submitted:</span> <span>${new Date().toLocaleString()}</span></div>
            </div>
            <div class="notice">
              <strong>Notice:</strong> Your enrollment has been successfully submitted. You will hear from us real quick to confirm your details. Please save or print this receipt for your records.
            </div>
            <div class="footer">
              © 2024 Majay Transportation. Leading Ghana Forward.<br/>
              KNUST Campus, Kumasi | 0599493721 / 0507971597
            </div>
          </div>
        </body>
      </html>
    `);
    receiptWindow.document.close();
    receiptWindow.print();
  };

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
        <Button
          type="button"
          onClick={handleDownloadReceipt}
          className="w-full bg-blue-950 hover:bg-blue-900 text-white font-bold text-lg py-4 transition-all duration-300"
        >
          Download Receipt
        </Button>
      </div>
    );
  }

  return (
    <div className="p-3 rounded-lg text-center text-sm font-semibold bg-red-100 text-red-700">
      {submitMessage}
    </div>
  );
};
