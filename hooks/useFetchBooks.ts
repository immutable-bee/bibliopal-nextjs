import { useState } from "react";
import { SetError } from "@/pages";

interface Book {
  title: string;
  author?: string;
}

const useFetchBooks = () => {
  const [Book, setBook] = useState<Book>({
    title: "",
  });

  const fetchByISBN = async (ISBN: string, setError?: SetError) => {
    try {
      const response = await fetch(`../api/fetch-isbnDB?isbn=${ISBN}`);

      if (!response.ok)
        throw new Error(
          `Http request failed, response code : ${response.status}`
        );

      const data = await response.json();

      console.log("Returned Data:", data);

      const extracetdData = {
        title: data.book?.title,
        author: data.book?.authors.join(", "),
        ISBN,
      };

      if (!extracetdData.title) throw new Error("This book missed a title");

      setBook(extracetdData);
      return extracetdData;
    } catch (err) {
      setError && setError("Book not found");
      console.error(err);
      throw new Error("An error occured");
    }
  };

  return {
    fetchByISBN,
    Book,
  };
};

export default useFetchBooks;
