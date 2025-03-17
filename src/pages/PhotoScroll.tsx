import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Example category data
const categories = [
  {
    label: "Bike Wash",
    image: "https://5.imimg.com/data5/TF/FD/MY-25155805/bike-cleaning-service-500x500.jpg",
  },
  {
    label: "Bike Pickup",
    image: "https://5.imimg.com/data5/SELLER/Default/2023/8/332801597/HI/ZW/NO/43783092/bike-transport-service-500x500.jpg",
  },
  {
    label: "Bike Drop",
    image: "https://5.imimg.com/data5/XR/NB/GLADMIN-48651030/bike-washing-service-500x500.png",
  },
  {
    label: "Bike care",
    image: "https://quickinsure.s3.ap-south-1.amazonaws.com/uploads/static_page/f875c16c-74ce-4a6c-9939-bfa9d018e63f/5%20Bike%20Maintenance%20Tips%20To%20Make%20Your%20Bike%20New%20Again.png",
  },
  {
    label: "Customers Experations",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD-NzxrRevGEKIheNwsoWVRw7DgMeRq3vJxA&s",
  },
  {
    label: "Teams",
    image: "https://enformhr.com/wp-content/uploads/2024/10/positive-feedback-improves-performance.jpg",
  },
  {
    label: "FastGrowing from people",
    image: "https://inc42.com/wp-content/uploads/2017/04/Bike_Cleanse_High_Res_025-1.jpg",
  },
  {
    label: "Trusted Zone",
    image: "https://door2doorcarwash.com/inside/images/project/bike_project-4.webp",
  },
  {
    label: "Waterless Wash & Interior Cleaning",
    image: "https://wp.driveu.in/wp-content/uploads/2023/09/Dashboard-Dressing.png",
  },
  {
    label: "Pressure Wash & Interior Cleaning",
    image: "https://wp.driveu.in/wp-content/uploads/2023/09/Exterior-Foam.png",
  },
  {
    label: "Antiques & Collectibles",
    image: "https://source.unsplash.com/400x300/?antiques",
  },
  // Add more categories as needed
];

export default function GalleryPage() {
  return (
    <div className="bg-gray-50">
      <Navbar />
      {/* HERO SECTION */}
      <div
        className="relative w-full h-[70vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            SIMPLY ART. SIMPLY BEAUTIFUL.
          </h1>
          <p className="text-lg md:text-xl mb-6">
            For seventeen years, artists and buyers have trusted us to show and
            sell their art. Are you next? Join now.
          </p>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row items-center w-full sm:max-w-md mx-auto">
            <input
              type="text"
              placeholder="Enter Keywords"
              className="flex-1 px-4 py-2 text-gray-800 focus:outline-none rounded-l sm:rounded-r-none"
            />
            <button className="px-6 py-2 bg-yellow-500 text-gray-800 font-semibold rounded-r sm:rounded-l-none mt-2 sm:mt-0 hover:bg-yellow-400 transition">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">
          Categories
        </h2>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="relative rounded overflow-hidden shadow hover:shadow-lg transition"
            >
              <img
                src={cat.image}
                alt={cat.label}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-end justify-start p-4 hover:bg-black/30 transition">
                <h3 className="text-white text-lg font-semibold">
                  {cat.label}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
