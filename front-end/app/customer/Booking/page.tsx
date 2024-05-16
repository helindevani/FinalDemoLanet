import Sidebar from "@/components/Sidebar";

export default function Booking() {
  return (
    <Sidebar>
      <div className="page-wrapper">
        <div className="sticky flex justify-between top-0 bg-white p-3 h-10 mb-10 sm:h-auto w-auto text-sm z-30 border">
          <h3 className="text-xl text-blue-800 font-semibold text-primary">
            Book Your Cylinder
          </h3>
          <nav className="flex items-center space-x-2">
            <a href="#" className="text-gray-400 hover:text-blue-800">
              Home
            </a>
            <span className="text-gray-400">{`>`}</span>
            <span className="text-gray-600">Book Your Cylinder</span>
          </nav>
        </div>
        <div className="container m-auto h-screen">
          <div className="max-w-4xl mx-auto h-screen">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-6 m-10 w-auto h-auto">
              <form className="space-y-4 px-5 py-8">
                <div className="flex items-center">
                  <label className="w-1/4 text-gray-700" htmlFor="LpgNo">
                    LPG Connection No
                  </label>
                  <input
                    className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="LpgNo"
                    name="LpgNo"
                    type="text"
                    disabled
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-1/4 text-gray-700" htmlFor="Name">
                    Consumer Name
                  </label>
                  <input
                    className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="Name"
                    name="Name"
                    type="text"
                    disabled
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-1/4 text-gray-700" htmlFor="PhoneNumber">
                    Register Phone No
                  </label>
                  <input
                    className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="PhoneNumber"
                    name="PhoneNumber"
                    type="text"
                    disabled
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-1/4 text-gray-700" htmlFor="EmailId">
                    Consumer Email Id
                  </label>
                  <input
                    className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="EmailId"
                    name="EmailId"
                    type="text"
                    disabled
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-1/4 text-gray-700" htmlFor="Product">
                    Product Details
                  </label>
                  <input
                    className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="Product"
                    name="Product"
                    type="text"
                    disabled
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-1/4 text-gray-700" htmlFor="Price">
                    Cylinder Price
                  </label>
                  <input
                    className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="Price"
                    name="Price"
                    type="text"
                    disabled
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-1/4 text-gray-700" htmlFor="Address">
                    Shipping Address
                  </label>
                  <textarea
                    className="w-3/4 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="Address"
                    name="Address"
                    rows={2}
                    disabled
                  >
                    </textarea>
                </div>

                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    id="createProductBtn"
                    className="bg-blue-800 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Book
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
