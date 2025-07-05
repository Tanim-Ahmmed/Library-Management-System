import Split from "@/components/addbook/Split";
import { useGetBorrowQuery } from "@/redux/api/baseApi";

interface BorrowItem {
  totalQuantity: number;
  book: {
    title: string;
    isbn: string;
  };
}

const BorrowSummary = () => {
  const { data, isLoading } = useGetBorrowQuery(undefined);

  if (isLoading) {
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  }

   const borrow: BorrowItem[] = data?.data;

  if (!borrow || borrow.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No borrowed books found.
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-center items-center my-10">
        <Split
          text="Books Borrow Summary"
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
      <div className="space-y-4">
        {borrow.map((item, i: number) => (
          <div
            key={i}
            className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all"
          >
            <p className="text-sm text-gray-500">
              Quantity: {item.totalQuantity}
            </p>
            <p className="text-lg font-medium">Title: {item.book?.title}</p>
            <p className="text-sm text-gray-600">ISBN: {item.book?.isbn}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BorrowSummary;
