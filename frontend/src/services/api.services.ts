const backendUrl = "https://sphnix-backend.vercel.app";

export const fetchAddressTransactions = async (address: string) => {
  try {
    const response = await fetch(`${backendUrl}/transactions/${address}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
};

export const fetchAddressBalance = async (address: string) => {
  try {
    const response = await fetch(`${backendUrl}/balance/${address}`);
    const data = await response.json();
    return data.balance;
  } catch (error) {
    console.error("Error fetching balance:", error);
    return null;
  }
};
