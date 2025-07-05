import App from "@/App";
import AddBooks from "@/Pages/AddBooks";
import AllBooks from "@/Pages/AllBooks";
import BorrowSummary from "@/Pages/BorrowSummary";
import ErrorPage from "@/Pages/ErrorPage";
import Home from "@/Pages/Home";
import UpdateBook from "@/Pages/UpdateBook";
import { createBrowserRouter } from "react-router";




const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
        {
            path: "/",
            Component: Home,
        },
         {
            path: "/books",
            Component: AllBooks,
        },
         {
            path: "/create-book",
            Component: AddBooks,
        },
        {
           path:"update-book/:id",
           Component: UpdateBook,
        },
        {
           path:"borrow-summary",
           Component: BorrowSummary,
        }
    ]
  },
]);

export default router;