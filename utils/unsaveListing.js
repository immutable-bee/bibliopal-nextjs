const unsaveListing = async (consumerId, listingId) => {
  const response = await fetch("/api/consumer/unsaveListing", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ consumerId, listingId }),
  });

  if (!response.ok) {
    return;
  }

  const data = await response.json();
  return data;
};

export default unsaveListing;
