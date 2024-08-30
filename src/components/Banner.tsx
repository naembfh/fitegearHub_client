import video from "../assets/video.mp4";
const Banner = () => {
  return (
    <div className="relative h-64 md:h-96 bg-gray-900">
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover"
      >
        <source src={video} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          Empower Your Fitness Journey
        </h2>
        <p className="mb-6">
          Discover top-quality fitness equipment that brings out the best in
          you.
        </p>
        <button className="bg-gray-900 hover:bg-gray-100 text-white hover:text-gray-900 hover:border border-2 border-gray-900 font-bold py-2 px-4 rounded">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Banner;
