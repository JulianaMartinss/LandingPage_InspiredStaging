import React from "react";
import { Play } from "lucide-react";

const Testimonials: React.FC = () => {
  return (
    <section id="reviews" className="py-24 bg-white scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* TITLE */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-800 mb-4">
            Client Reviews
          </h2>
          <div className="w-20 h-1 bg-olive-gray mx-auto rounded-full mb-6"></div>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Hear directly from satisfied homeowners and Realtor John about their experiences working with Inspired Staging
          </p>
        </div>

        {/* VIDEO REVIEWS */}
        <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-8 items-center md:items-start">
          
          {/* Review 1 */}
          <div className="flex flex-col gap-4 group items-center w-full max-w-[240px]">
            <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all bg-stone-100">
              <video
                src="assets/video1.mp4"
                controls
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="text-center">
              <h3 className="font-serif text-xl font-bold text-stone-800">
                Janice's Story
              </h3>
            </div>
          </div>

          {/* Review 2 */}
          <div className="flex flex-col gap-4 group items-center w-full max-w-[240px]">
            <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all bg-stone-100">
              <video
                src="assets/video2.mp4"
                controls
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="text-center">
              <h3 className="font-serif text-xl font-bold text-stone-800">
                Doug's Story
              </h3>
            </div>
          </div>

        </div>

        {/* TEXT FEEDBACK CARD */}
        <div className="flex justify-center mt-12">
          <div className="bg-white border border-stone-200 rounded-2xl shadow-md p-5 max-w-sm text-center">
            
            {/* PHOTO */}
            <div className="w-16 h-16 mx-auto mb-3">
              <img
                src="assets/john.jpeg"
                alt="Realtor John"
                className="w-full h-full rounded-full object-cover object-[center_30%] shadow-md"
              />
            </div>

            {/* NAME */}
            <div className="text-lg font-serif font-bold text-stone-800 mb-1">
              Realtor John
            </div>

            {/* Stars */}
            <div className="flex justify-center gap-1 mb-4 text-amber-500 text-lg">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>

            {/* Feedback Text */}
            <p className="text-stone-600 leading-snug text-sm">
              Nastia is my secret weapon! Her amazing staging work helps me get top
              dollar, quickly, for my delighted sellers! Buyers lose their minds
              and fight to lock down properties that look like they are in a
              lifestyle magazine.
            </p>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
