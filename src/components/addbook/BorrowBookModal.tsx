import { CalendarIcon, ShoppingBag } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Calendar } from "../ui/calendar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import { format } from "date-fns";
import type { Book } from "@/types/book";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useCreateBorrowMutation } from "@/redux/api/baseApi";

interface Props {
  book: Book;
}

export const BorrowBookModal = ({ book }: Props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [dueDate, setDueDate] = useState<Date | undefined>();
  const [formError, setFormError] = useState<string | null>(null);

  const [borrowBook] = useCreateBorrowMutation();

  const handleBorrow = async () => {
    setFormError(null);

    if (quantity > book.copies) {
      setFormError(`You cannot borrow more than ${book.copies} copies.`);
      return;
    }
    if (!dueDate) {
      setFormError("Please select a due date.");
      return;
    }

    try {
      await borrowBook({
        book: book._id,
        quantity,
        dueDate: dueDate.toISOString(),
      }).unwrap();

      toast.success("Book borrowed successfully!");
      navigate("/borrow-summary");
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to borrow book.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="text-green-500 hover:bg-green-600 hover:text-white transition"
        >
          <ShoppingBag className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Borrow Book</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Quantity</Label>
            <Input
              type="number"
              min={1}
              max={book.copies}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
            <p className="text-xs text-gray-400 mt-1">
              Available copies: {book.copies}
            </p>
          </div>
          <div>
            <Label>Due Date</Label>
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  onClick={() => setPopoverOpen(true)} 
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? (
                    format(dueDate, "PPP")
                  ) : (
                    <span>Pick a due date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white text-black border border-green-600">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={(date) => {
                    setDueDate(date);
                    setPopoverOpen(false); 
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          {formError && <p className="text-red-500 text-sm">{formError}</p>}
          <div className="flex justify-end gap-2 mt-4">
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <Button
              onClick={handleBorrow}
              disabled={quantity < 1 || !dueDate}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Confirm Borrow
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
