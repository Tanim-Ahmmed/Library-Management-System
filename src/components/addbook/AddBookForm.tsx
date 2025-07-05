import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { useAddBookMutation } from "@/redux/api/baseApi";
import type { AppRTKError } from "@/types/error";

const GENRES = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
];

const AddBookForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isCreateRoute = location.pathname === "/create-book";

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: "" as number | string,
    available: true,
  });

  const [addBook, { isLoading }] = useAddBookMutation();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "copies" ? (value === "" ? "" : parseInt(value)) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      copies:
        typeof formData.copies === "string"
          ? parseInt(formData.copies) || 0
          : formData.copies,
    };

    try {
      await addBook(payload).unwrap();
      toast.success("Book added successfully!");
      navigate("/books");
      setFormData({
        title: "",
        author: "",
        genre: "",
        isbn: "",
        description: "",
        copies: "",
        available: true,
      });
    } catch (error) {
      const err = error as AppRTKError;

      let message = "Try again later.";
      if ("status" in err && "data" in err) {
        message = err.data?.message || message;
      } else if ("message" in err) {
        message = err.message || message;
      }
      toast.error(`Failed to add book. ${message}`);
    }
  };

  return (
    <div
      className={`p-6 rounded-lg mx-auto shadow border border-border ${
        isCreateRoute ? "w-full" : "w-full m-4"
      }`}
    >
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Book title"
            required
          />
        </div>

        <div>
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Author name"
            required
          />
        </div>

        <div>
          <Label htmlFor="genre">Genre</Label>
          <select
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          >
            <option value="">Select Genre</option>
            {GENRES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="isbn">ISBN</Label>
          <Input
            id="isbn"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            placeholder="ISBN number"
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Brief description"
            className="w-full p-2 border rounded"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="copies">Copies</Label>
          <Input
            id="copies"
            name="copies"
            type="number"
            min="0"
            value={formData.copies}
            onChange={handleChange}
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Book"}
        </Button>
      </form>
    </div>
  );
};

export default AddBookForm;
