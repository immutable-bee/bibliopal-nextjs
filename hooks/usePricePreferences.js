import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";

const usePricePreferences = () => {
  const { user } = useUser();
  const [preferences, setPreferences] = useState([]);

  const filterByPreferences = (data) => {
    if (!data || !preferences.length) return [];

    console.log(preferences);
    console.log(data);

    if (preferences[0] === "all") {
      return data;
    } else {
      return data.filter((item) =>
        preferences.some((preference) =>
          item.merchant.toLowerCase().includes(preference)
        )
      );
    }
  };

  const findMinMax = (data) => {
    const filtered = filterByPreferences(data);
    if (!filtered.length) {
      return;
    }

    console.log("Filtered Result:", filtered);

    let minMerchant = filtered[0].merchant;
    let maxMerchant = filtered[0].merchant;
    let min = parseFloat(filtered[0].total);
    let max = parseFloat(filtered[0].total);

    for (const item of filtered) {
      const itemTotal = parseFloat(item.total);
      if (itemTotal < min) {
        min = itemTotal;
        minMerchant = item.merchant;
        console.log(`New Minimum: ${min}`);
      }
      if (itemTotal > max) {
        max = itemTotal;
        maxMerchant = item.merchant;
        console.log(`New Max: ${max}`);
      }
    }

    const priceObject = {
      min: `${minMerchant} - $${min.toFixed(2)}`,
      max: `${maxMerchant} - $${max.toFixed(2)}`,
    };

    return priceObject;
  };

  const getPriceData = (data) => {
    const minMax = findMinMax(data);
    return minMax;
  };

  useEffect(() => {
    if (user) {
      setPreferences(user.business.pricePreferences);
    }
  }, [user]);

  return getPriceData;
};

export default usePricePreferences;
