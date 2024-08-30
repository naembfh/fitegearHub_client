const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Contact Information */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-400 mb-2">
              <strong className="font-semibold">Email:</strong>{" "}
              <span className="italic">support@fitgearhub.com</span>
            </p>
            <p className="text-gray-400 mb-2">
              <strong className="font-semibold">Phone:</strong>{" "}
              <span className="italic">+1 (123) 456-7890</span>
            </p>
            <p className="text-gray-400">
              <strong className="font-semibold">Address:</strong>{" "}
              <span className="italic">
                123 Fitness Lane, Muscle City, CA 90000
              </span>
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-300 transition-colors"
            >
              <i className="fi fi-brands-facebook text-2xl"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-300 transition-colors"
            >
              <i className="fi fi-brands-twitter text-2xl"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-300 transition-colors"
            >
              <i className="fi fi-brands-instagram text-2xl"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-300 transition-colors"
            >
              <i className="fi fi-brands-linkedin text-2xl"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
