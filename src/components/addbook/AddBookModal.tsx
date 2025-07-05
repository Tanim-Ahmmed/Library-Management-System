import { Dialog, DialogContent } from "../ui/dialog";
import AddBookForm from "./AddBookForm";

interface AddBookModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddBookModal = ({ open, onOpenChange }: AddBookModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-none">
        <AddBookForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddBookModal;
