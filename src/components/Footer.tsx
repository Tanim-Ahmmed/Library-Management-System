const Footer = () => {
  return (
    <div className="bg-black text-white border-t border-red-500/20">
      <div className="max-w-screen-xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs md:text-sm text-gray-400 text-center md:text-left">
          &copy; {new Date().getFullYear()} All rights reserved to{" "}
          <span className="text-red-500 font-semibold">BookBuddy</span>.
        </p>
        <div className="flex gap-4 text-gray-400 text-xs md:text-sm">
          <a href="#" className="hover:text-red-500 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-red-500 transition-colors">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
