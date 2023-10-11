import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";

const usePricePreferences = () => {
  const { user } = useUser();
  const [preferences, setPreferences] = useState([]);

  const filterByPreferences = (data) => {
    if (!data || !preferences.length) return [];

    return data.filter((item) => {
      if (item.condition === "eBook") return false;
      if (preferences[0] === "all") return true;

      return preferences.some((preference) =>
        item.merchant.toLowerCase().includes(preference)
      );
    });
  };

  const findMinMax = (data, useTotal) => {
    const filtered = filterByPreferences(data);
    if (!filtered.length) {
      return;
    }

    console.log("Filtered Result:", filtered);

    let minMerchant = filtered[0].merchant;
    let maxMerchant = filtered[0].merchant;
    let min = parseFloat(useTotal ? filtered[0].total : filtered[0].price);
    let max = parseFloat(useTotal ? filtered[0].total : filtered[0].price);

    for (const item of filtered) {
      const itemTotal = parseFloat(useTotal ? item.total : item.price);
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
    const useTotal = user.business.useTotalPrice;
    const minMax = findMinMax(data, useTotal);
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
