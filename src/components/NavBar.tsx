import { useState } from "react";
import { Menu, X } from "lucide-react"; 
import { Link, NavLink } from "react-router";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navmenu = [
    { title: "All Books", slug: "books" },
    { title: "Add Book", slug: "create-book" },
    { title: "Borrow Summary", slug: "borrow-summary" },
  ];

  return (
    <header className="bg-black text-white py-4">
      <nav className="container mx-auto flex justify-between items-center">
    
        <Link to="/" className="text-2xl font-bold">
          <span className="text-red-500">BookBuddy</span> Library
        </Link>

        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul className="hidden md:flex gap-6 items-center text-sm md:text-base">
          {navmenu.map((menu) => (
            <li key={menu.slug}>
              <NavLink
                to={menu.slug}
                className={({ isActive }: { isActive: boolean } ) =>
                  isActive ? "text-red-500 font-semibold" : ""
                }
              >
                {menu.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {isOpen && (
        <ul className="md:hidden bg-black px-6 py-4 space-y-3">
          {navmenu.map((menu) => (
            <li key={menu.slug}>
              <NavLink
                to={menu.slug}
                className={({ isActive } : { isActive: boolean }) =>
                  isActive ? "text-red-500 font-semibold" : ""
                }
                onClick={() => setIsOpen(false)}
              >
                {menu.title}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};

export default NavBar;
