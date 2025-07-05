import { Link } from "react-router";
import AllBooks from "./AllBooks";

const Home = () => {
  return (
    <div>
      <div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')]">
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Welcome to <span className="text-red-500">BookBuddy</span> Library
          </h1>
          <p className="text-lg md:text-xl max-w-xl">
            Discover, borrow, and explore a world of knowledge. Your reading
            journey starts here.
          </p>
          <Link
            to="/books"
            className="mt-6 px-6 py-3 bg-red-500 hover:bg-red-600 rounded-xl text-white font-semibold transition duration-300"
          >
            Explore Now
          </Link>
        </div>
      </div>
      <div>
        <AllBooks />
        <div className="flex justify-center items-center mt-10">
          <Link
            to="/books"
            className=" px-6 py-3 bg-red-500 hover:bg-red-600 rounded-xl text-white font-semibold transition duration-300"
          >
            View All Books
          </Link>
        </div>
      </div>

      <div className="bg-gray-100 py-16 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
          Why Choose <span className="text-red-500">BookBuddy</span>?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1600px] mx-auto">
          <div className="bg-white shadow-md p-6 rounded-lg hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2 text-red-500">
              Huge Collection
            </h3>
            <p className="text-gray-600">
              Access thousands of books across genres and authors — all in one
              place.
            </p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2 text-red-500">
              Easy Borrowing
            </h3>
            <p className="text-gray-600">
              Borrow books with a single click and manage your reading list
              seamlessly.
            </p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2 text-red-500">
              Track & Return
            </h3>
            <p className="text-gray-600">
              Stay updated with due dates and return reminders. No late fees
              ever!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
