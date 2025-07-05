import BookDetailsModal from "@/components/addbook/BookDetailsModal";
import { BorrowBookModal } from "@/components/addbook/BorrowBookModal";
import Split from "@/components/addbook/Split";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Swal from "sweetalert2";
import { useDeleteBookMutation, useGetBooksQuery } from "@/redux/api/baseApi";
import { BookOpen, Edit, Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import type { Book } from "@/types/book";
import type { AppRTKError } from "@/types/error";

const AllBooks = () => {
  const { data, isLoading } = useGetBooksQuery(undefined);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [deleteBook] = useDeleteBookMutation(); 
  if (isLoading) {
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  }

  const Books = data?.data;

  if (!Books || Books.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">No books found.</div>
    );
  }

  const onDelete = async (bookId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteBook(bookId).unwrap();
        Swal.fire("Deleted!", "Book has been deleted.", "success");
      } catch (error) {
      const err = error as AppRTKError;
      let errorMessage = "Failed to delete the book.";
      if ("status" in err && "data" in err) {
        errorMessage = err.data?.message || errorMessage;
      } else if ("message" in err) { errorMessage = err.message || errorMessage; }
      Swal.fire("Error", errorMessage, "error");
    }
    }
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex justify-center items-center py-10">
              <Split
                text="All Books"
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
            Books Collection
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              ({Books.length} {Books.length === 1 ? "book" : "books"})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Title</TableHead>
                  <TableHead className="hidden md:table-cell">Author</TableHead>
                  <TableHead className="hidden lg:table-cell">Genre</TableHead>
                  <TableHead className="hidden lg:table-cell">ISBN</TableHead>
                  <TableHead className="hidden md:table-cell text-center">
                    Copies
                  </TableHead>
                  <TableHead className="hidden md:table-cell text-center">
                    Status
                  </TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Books.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2">
                        <BookOpen className="h-12 w-12 text-muted-foreground" />
                        <p className="text-lg font-medium">No books found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  Books.map((book: Book) => (
                    <TableRow key={book._id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">
                        <div className="space-y-1">
                          <div className="font-semibold text-foreground">
                            {book.title}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {book.author}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <Badge variant="outline">{book.genre}</Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell font-mono text-sm">
                        {book.isbn}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-center">
                        <Badge variant="outline" className="font-mono">
                          {book.copies}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-center">
                        {book.available ? (
                          <Badge variant="default">Available</Badge>
                        ) : (
                          <Badge variant="destructive">Unavailable</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-blue-500 hover:bg-blue-600 hover:text-white transition"
                            onClick={() => setSelectedBookId(book._id)}
                          >
                            <Eye className="h-5 w-5" />
                          </Button>

                          <BorrowBookModal book={book} />

                          <Link to={`/update-book/${book._id}`}>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-yellow-500 hover:bg-yellow-600 hover:text-white transition"
                            >
                              <Edit className="h-5 w-5" />
                            </Button>
                          </Link>

                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => onDelete(book._id)}
                            className="text-red-500 hover:bg-red-600 hover:text-white transition"
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      {selectedBookId && (
        <BookDetailsModal
          bookId={selectedBookId}
          onClose={() => setSelectedBookId(null)}
        />
      )}
    </div>
  );
};

export default AllBooks;
