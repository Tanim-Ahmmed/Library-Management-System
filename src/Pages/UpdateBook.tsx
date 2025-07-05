import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import {
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from "@/redux/api/baseApi";
import Split from "@/components/addbook/Split";
import type { AppRTKError } from "@/types/error";

const GENRES = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
];

const UpdateBook = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading } = useGetBookByIdQuery(id);
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: "" as number | string,
  });

  useEffect(() => {
    if (data?.data) {
      const { title, author, genre, isbn, description, copies } = data.data;
      setFormData({
        title,
        author,
        genre,
        isbn,
        description,
        copies: copies.toString(),
      });
    }
  }, [data]);

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
      available:
        typeof formData.copies === "string"
          ? parseInt(formData.copies) > 0
          : formData.copies > 0,
    };

    try {
      await updateBook({ id, ...payload }).unwrap();
      toast.success("Book updated successfully!");
      navigate("/books");
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

  if (isLoading) {
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-center items-center py-20">
        <Split
          text="Update Book"
          className="text-3xl font-bold"
          duration={0.3}
          ease="power3.out"
          splitType="words"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-50px"
        />
      </div>

      <div className="p-6 rounded-lg mx-auto shadow border border-border max-w-3xl">
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

          <Button type="submit" className="w-full" disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update Book"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBook;
