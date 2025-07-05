import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetBookByIdQuery } from "@/redux/api/baseApi";
import Split from "./Split";

interface BookDetailsModalProps {
  bookId: string | null;
  onClose: () => void;
}

const BookDetailsModal = ({ bookId, onClose }: BookDetailsModalProps) => {
  const {
    data: response,
    isLoading,
    isError,
  } = useGetBookByIdQuery(bookId!, {
    skip: !bookId,
  });

  const book = response?.data;

  return (
    <Dialog open={!!bookId} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black max-w-lg md:max-w-2xl rounded-xl">
        <DialogHeader className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
          <DialogTitle className="text-gray-800 text-xl">
            <div className="flex justify-center items-center">
              <Split
                text="Book Details"
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
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <p className="text-center text-sm text-gray-500">Loading...</p>
        ) : isError ? (
          <p className="text-center text-sm text-red-600">
            Failed to load book.
          </p>
        ) : book ? (
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-900">{book.title}</h2>
            <p className="text-gray-700 text-sm">by {book.author}</p>
            <span className="inline-block bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded capitalize">
              {book.genre.toLowerCase()}
            </span>

            <p className="text-sm mt-2 text-gray-800">{book.description}</p>

            <div className="grid grid-cols-2 gap-2 mt-4 text-sm text-gray-700">
              <div>
                ISBN: <span className="text-gray-900">{book.isbn}</span>
              </div>
              <div>
                Copies: <span className="text-gray-900">{book.copies}</span>
              </div>
              <div>
                Available:{" "}
                <span
                  className={`${
                    book.available ? "text-green-600" : "text-red-600"
                  } ml-1`}
                >
                  {book.available ? "Yes" : "No"}
                </span>
              </div>
              <div>
                Publisher:{" "}
                <span className="text-gray-900">{book.publisher || "N/A"}</span>
              </div>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default BookDetailsModal;
