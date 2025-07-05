import AddBookForm from "@/components/addbook/AddBookForm";
import Split from "@/components/addbook/Split";


const AddBooks = () => {

    return (
        <>
        <div className="flex justify-center items-center py-20">
            <Split
            text="Add New Book"
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
        <div className="max-w-3xl mx-auto"> 
        <AddBookForm/>
        </div>
        </>
    );
};

export default AddBooks;