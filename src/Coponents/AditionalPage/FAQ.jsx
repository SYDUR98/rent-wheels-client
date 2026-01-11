import React from "react";

const FAQ = () => {
  const faqs = [
    { q: "How do I book a car?", a: "Simply browse cars, select your preferred dates, and click the 'Book Now' button." },
    { q: "What documents do I need?", a: "You need a valid driving license and a government-issued ID (NID/Passport)." },
    { q: "Can I cancel my booking?", a: "Yes, you can cancel up to 24 hours before the rental starts for a full refund." },
    { q: "Is insurance included?", a: "Basic insurance is included with every rental, but you can opt for premium coverage." }
  ];

  return (
    <div className="bg-base-100 min-h-screen py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-primary uppercase tracking-widest">Frequently Asked Questions</h2>
        <div className="join join-vertical w-full">
          {faqs.map((faq, index) => (
            <div key={index} className="collapse collapse-arrow join-item border border-base-300">
              <input type="radio" name="my-accordion-4" defaultChecked={index === 0} /> 
              <div className="collapse-title text-xl font-medium text-primary">
                {faq.q}
              </div>
              <div className="collapse-content"> 
                <p className="opacity-70">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;