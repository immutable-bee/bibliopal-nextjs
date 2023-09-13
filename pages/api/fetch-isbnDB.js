const handler = async (req, res) => {
  const { isbn } = req.query;
  const url = `https://api2.isbndb.com/book/${isbn}`;

  const headers = {
    "Content-Type": "application/json",
    Authorization: process.env.ISBNDB_SECRET,
  };

  try {
    const response = await fetch(url, { headers });

    if (response.ok) {
      const bookData = await response.json();
      console.log(bookData);
      res.status(200).json(bookData);
    } else {
      console.log("response status:", response.status);
      throw new Error("Book not found");
    }
  } catch (error) {
    console.log("error in fetching:", error);
    res.status(500).json({ message: error.message });
  }
};

export default handler;
