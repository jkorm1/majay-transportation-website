"use client";

import { useState } from "react";
import { Phone, MapPin, Clock, Shield, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations";
import { EnrollmentModal } from "@/components/EnrollmentModal";
import Image from "next/image";

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    course: "Class 1",
    startDate: "",
    note: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.message) {
        setSubmitMessage(data.message);
        setFormData({
          fullName: "",
          phone: "",
          email: "",
          course: "Class 1",
          startDate: "",
          note: "",
        });
      } else {
        setSubmitMessage(
          data.error || "Error submitting form. Please try again.",
        );
      }
    } catch (error) {
      console.error("[v0] Form submission error:", error);
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : "Error submitting form. Please try again.",
      );
      if (error instanceof Error && error.message.includes("fetch")) {
        setSubmitMessage(
          "Network error. Please check your connection and try again.",
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full opacity-10 blur-3xl"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="text-white"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="mb-8">
                <motion.div
                  className="inline-block mb-6"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="h-20 w-20 sm:h-14 sm:w-14 rounded-full overflow-hidden bg-white shadow-md">
                    <img
                      src="/logo.png"
                      alt="Majay Logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-balance">
                Start Your Driving Journey Today
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 text-balance">
                Professional driving instruction right on KNUST campus. Learn
                from experienced instructors with modern vehicles.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-blue-950 font-bold text-lg px-8 py-6"
                >
                  Enroll Now
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-black hover:bg-white hover:text-blue-950 font-bold text-lg px-8 py-6"
                >
                  Learn More
                </Button>
              </div>
              <div className="space-y-3 text-blue-100">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <span className="font-semibold">0599493721 / 0507971597</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <span>KNUST Campus, Kumasi</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="hidden md:block"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative w-full h-96">
                <Image
                  src="/car.png"
                  alt="Majay Driving School Car"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <motion.div
                className="bg-white/95 backdrop-blur rounded-2xl p-8 shadow-2xl"
                whileHover={{
                  y: -10,
                  boxShadow: "0 30px 60px rgba(0, 0, 0, 0.3)",
                }}
              >
                <h3 className="text-2xl font-bold text-blue-950 mb-6">
                  Special Offer
                </h3>
                <div className="mb-8">
                  <p className="text-sm text-gray-600 mb-2">2-Week Program</p>
                  <div className="text-5xl font-bold text-yellow-500 mb-2">
                    GH₵ 1,000
                  </div>
                  <p className="text-gray-700 text-sm mb-6">
                    Weekly lessons included
                  </p>
                  <p className="text-blue-950 font-semibold italic">
                    Unlock a skill that will last a lifetime.
                  </p>
                </div>
                <Button
                  onClick={() => setShowForm(true)}
                  className="w-full bg-blue-950 hover:bg-blue-900 text-white font-bold text-lg py-6"
                >
                  Get Started
                </Button>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs text-gray-600 text-center">
                    Campus-based for your convenience • Flexible scheduling
                    available
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Curved bottom wave — sharp left entry, deep flare up on the right */}
        <div
          className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none"
          style={{ height: "90px" }}
        >
          <svg
            viewBox="0 0 1440 90"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <path
              d="M0,90 L0,72 C120,80 340,88 700,82 C1000,76 1260,40 1440,16 L1440,90 Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/20 to-transparent pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center text-blue-950 mb-4">
              Courses We Offer
            </h2>
            <p className="text-center text-gray-600 mb-16 text-lg">
              Choose the right program for your needs
            </p>
          </AnimatedSection>
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            <StaggerItem>
              <motion.div
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 border-2 border-blue-200 hover:shadow-lg transition-shadow h-full"
                whileHover={{ y: -5 }}
              >
                <div className="w-14 h-14 bg-blue-950 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold text-blue-950 mb-3">
                  Class 1
                </h3>
                <p className="text-gray-700 mb-4">
                  Private Vehicles - Perfect for beginners who want to master
                  the basics of driving safely and confidently.
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 font-bold mt-1">•</span>
                    <span>Theory and practical lessons</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 font-bold mt-1">•</span>
                    <span>Modern vehicles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 font-bold mt-1">•</span>
                    <span>DVLA exam preparation</span>
                  </li>
                </ul>
              </motion.div>
            </StaggerItem>
            <StaggerItem>
              <motion.div
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 border-2 border-blue-200 hover:shadow-lg transition-shadow h-full"
                whileHover={{ y: -5 }}
              >
                <div className="w-14 h-14 bg-blue-950 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold text-blue-950 mb-3">
                  Defensive Driving
                </h3>
                <p className="text-gray-700 mb-4">
                  Advanced techniques to anticipate hazards and drive safely in
                  all conditions. For experienced drivers.
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 font-bold mt-1">•</span>
                    <span>Hazard awareness</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 font-bold mt-1">•</span>
                    <span>Emergency handling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 font-bold mt-1">•</span>
                    <span>Safe driving practices</span>
                  </li>
                </ul>
              </motion.div>
            </StaggerItem>
            <StaggerItem>
              <motion.div
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 border-2 border-blue-200 hover:shadow-lg transition-shadow h-full"
                whileHover={{ y: -5 }}
              >
                <div className="w-14 h-14 bg-blue-950 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold text-blue-950 mb-3">
                  Refresher Training
                </h3>
                <p className="text-gray-700 mb-4">
                  Brush up on your skills and stay updated with the latest
                  driving regulations and best practices.
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 font-bold mt-1">•</span>
                    <span>Skills update</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 font-bold mt-1">•</span>
                    <span>Regulation review</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 font-bold mt-1">•</span>
                    <span>Confidence building</span>
                  </li>
                </ul>
              </motion.div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Why Choose Majay Section */}
      <section className="bg-gradient-to-br from-blue-950 to-blue-900 relative overflow-hidden">
        {/* Top wave — curves down from white Courses section */}
        <div
          className="absolute top-0 left-0 w-full overflow-hidden leading-none pointer-events-none"
          style={{ height: "90px" }}
        >
          <svg
            viewBox="0 0 1440 90"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <path
              d="M0,0 C200,70 500,90 720,60 C960,28 1200,75 1440,30 L1440,0 Z"
              fill="white"
            />
          </svg>
        </div>

        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 w-72 h-72 bg-yellow-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center text-white mb-4">
              Why Choose Majay?
            </h2>
            <p className="text-center text-blue-100 mb-16 text-lg">
              Leading Ghana Forward with Excellence
            </p>
          </AnimatedSection>
          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            <StaggerItem>
              <motion.div
                className="flex gap-4 text-white"
                whileHover={{ x: 10 }}
              >
                <Users className="w-8 h-8 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Campus-Based</h3>
                  <p className="text-blue-100">
                    Conveniently located on KNUST campus, saving you time and
                    money on travel.
                  </p>
                </div>
              </motion.div>
            </StaggerItem>
            <StaggerItem>
              <motion.div
                className="flex gap-4 text-white"
                whileHover={{ x: 10 }}
              >
                <Clock className="w-8 h-8 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Flexible Schedule</h3>
                  <p className="text-blue-100">
                    Book your lessons around your classes and personal
                    commitments.
                  </p>
                </div>
              </motion.div>
            </StaggerItem>
            <StaggerItem>
              <motion.div
                className="flex gap-4 text-white"
                whileHover={{ x: 10 }}
              >
                <Zap className="w-8 h-8 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Modern Vehicles</h3>
                  <p className="text-blue-100">
                    Learn in well-maintained, modern cars with the latest safety
                    features.
                  </p>
                </div>
              </motion.div>
            </StaggerItem>
            <StaggerItem>
              <motion.div
                className="flex gap-4 text-white"
                whileHover={{ x: 10 }}
              >
                <Shield className="w-8 h-8 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">DVLA Assistance</h3>
                  <p className="text-blue-100">
                    We help you prepare and apply for your Ghana DVLA license
                    with confidence.
                  </p>
                </div>
              </motion.div>
            </StaggerItem>
          </StaggerContainer>
        </div>

        {/* Bottom wave — curves back up into white CTA section */}
        <div
          className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none"
          style={{ height: "90px" }}
        >
          <svg
            viewBox="0 0 1440 90"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <path
              d="M0,90 C180,20 420,80 720,45 C1020,10 1260,70 1440,30 L1440,90 Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-950 mb-6 text-balance">
              Ready to Master the Road?
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Join hundreds of students who have successfully learned to drive
              with Majay Transportation.
            </p>
          </AnimatedSection>
          <AnimatedSection>
            <motion.div
              className="bg-gradient-to-r from-blue-950 to-blue-900 rounded-2xl p-12 text-white mb-8"
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-sm font-semibold text-yellow-400 mb-2">
                SPECIAL OFFER
              </p>
              <h3 className="text-4xl font-bold mb-4">GH₵ 1,000 for 2 Weeks</h3>
              <p className="text-blue-100 mb-8">
                Complete course with all lessons included
              </p>
              <Button
                onClick={() => setShowForm(true)}
                className="bg-yellow-400 hover:bg-yellow-500 text-blue-950 font-bold text-lg px-10 py-6"
              >
                Enroll Today
              </Button>
            </motion.div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="space-y-4">
              <p className="text-gray-700">
                <span className="font-bold">Call us now:</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="tel:0599493721"
                  className="inline-flex items-center gap-2 bg-blue-950 text-white px-8 py-3 rounded-lg hover:bg-blue-900 font-semibold"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone className="w-5 h-5" />
                  0599493721
                </motion.a>
                <motion.a
                  href="tel:0507971597"
                  className="inline-flex items-center gap-2 bg-blue-950 text-white px-8 py-3 rounded-lg hover:bg-blue-900 font-semibold"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone className="w-5 h-5" />
                  0507971597
                </motion.a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-950 text-blue-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-2">
            <span className="font-bold text-white">Majay Transportation</span> -
            Leading Ghana Forward
          </p>
          <p className="text-sm">
            Ghana&apos;s Premier Transport & Driving School System
          </p>
          <p className="text-xs mt-4 text-blue-200">
            © 2024 Majay Transportation. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Enrollment Modal Component */}
      <EnrollmentModal
        showForm={showForm}
        setShowForm={setShowForm}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitMessage={submitMessage}
      />
    </div>
  );
}
