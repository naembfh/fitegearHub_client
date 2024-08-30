import img from "../assets/image (7).jpg";
const AboutUs = () => {
  return (
    <div className="bg-gradient-to-r from-blue-700 via-gray-900 to-gray-800 min-h-screen px-4 py-10">
      <section id="overview" className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-6 text-white">Company Overview</h2>
        <p className="text-lg text-gray-100 max-w-3xl mx-auto">
          At <strong className="text-yellow-200">FitGearHub</strong>, we believe
          that fitness is more than just a goal—it's a lifestyle. Founded in
          2020, our mission is to provide top-quality fitness equipment that
          helps you achieve your fitness goals and live a healthier life. Our
          vision is to become the leading provider of fitness solutions by
          offering innovative products and exceptional customer service.
        </p>
      </section>

      <section id="team" className="mb-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          Meet Our Team
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {/* Team Member */}
          <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl">
            <img
              src={img}
              alt="Team Member 1"
              className="w-full h-96 object-cover rounded-t-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Mr Khan</h3>
            <p className="text-gray-700">Founder & CEO</p>
            <p className="mt-2 text-gray-600 italic">
              With over a decade of experience in the fitness industry, Khan
              started FitGearHub with a vision to make high-quality fitness
              equipment accessible to everyone. Their dedication to fitness and
              commitment to excellence drives the company's success.
            </p>
          </div>
        </div>
      </section>

      <section
        id="testimonials"
        className="bg-gray-100 py-10 px-4 rounded-lg mb-16"
      >
        <h2 className="text-4xl font-bold text-center mb-6 text-blue-700">
          Customer Testimonials
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {/* Testimonial */}
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <p className="text-gray-600 italic">
              "FitGearHub's equipment has transformed my workout routine. The
              quality is unbeatable, and the customer service is fantastic.
              Highly recommend!"
            </p>
            <p className="mt-4 font-semibold text-gray-800">Jane Doe</p>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section id="contact" className="text-center">
        <h2 className="text-4xl font-bold mb-6 text-white">Contact Us</h2>
        <p className="text-lg text-gray-100 mb-4">
          We'd love to hear from you! For questions or feedback, reach out to us
          through the following channels:
        </p>
        <p className="text-lg text-gray-100">
          <strong className="font-semibold">Email:</strong>{" "}
          <span className="italic">support@fitgearhub.com</span>
        </p>
        <p className="text-lg text-gray-100">
          <strong className="font-semibold">Phone:</strong>{" "}
          <span className="italic">+1 (123) 456-7890</span>
        </p>
        <p className="text-lg text-gray-100">
          <strong className="font-semibold">Address:</strong>{" "}
          <span className="italic">
            123 Fitness Lane, Muscle City, CA 90000
          </span>
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
