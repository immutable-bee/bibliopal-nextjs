const saveListing = async (consumerId, listingId) => {
  const response = await fetch("/api/consumer/saveListing", {
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

export default saveListing;
