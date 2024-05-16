import Sidebar from "@/components/Sidebar";

export default function LastBooking() {
  return (
    <Sidebar>
      <div className="page-wrapper">
        <div className="sticky flex justify-between top-0 bg-white p-3 h-10 mb-10 sm:h-auto w-auto text-sm z-30 border">
          <h3 className="text-xl text-blue-800 font-semibold text-primary">
            Last Booking Details
          </h3>
          <nav className="flex items-center space-x-2">
            <a href="#" className="text-gray-400 hover:text-blue-800">
              Home
            </a>
            <span className="text-gray-400">{`>`}</span>
            <span className="text-gray-600">Last Booking Details</span>
          </nav>
        </div>
        <div className="container m-auto h-screen">
          <div className="w-auto">
            <div className="bg-white shadow-md rounded px-8 pt-14 pb-16 m-10 w-auto h-auto"></div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
