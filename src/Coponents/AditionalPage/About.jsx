import React from "react";

const About = () => {
  return (
    <div className="bg-base-100 min-h-screen py-12 px-6 lg:px-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10 text-primary">About RENT WHEELS</h2>
        
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800" 
              alt="About Us" 
              className="rounded-2xl shadow-xl border-4 border-primary/20"
            />
          </div>
          <div className="space-y-4 text-lg">
            <p className="font-semibold text-primary">Your Reliable Journey Partner</p>
            <p>Founded in 2024, Rent Wheels has been dedicated to making car rentals easy, transparent, and affordable for everyone.</p>
            <p>We connect car owners with travelers, ensuring high-quality maintenance and 24/7 support. Our mission is to provide the "freedom of movement" without the burden of ownership.</p>
            <div className="flex gap-4 pt-4">
              <div className="text-center p-4 bg-base-200 rounded-xl">
                <p className="text-2xl font-bold text-primary">500+</p>
                <p className="text-sm">Cars</p>
              </div>
              <div className="text-center p-4 bg-base-200 rounded-xl">
                <p className="text-2xl font-bold text-primary">10k+</p>
                <p className="text-sm">Happy Users</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;