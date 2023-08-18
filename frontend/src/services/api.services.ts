const backendUrl = "https://careful-hare-hem.cyclic.cloud/";

export const fetchAddressTransactions = async (address: string) => {
  try {
    const response = await fetch(`${backendUrl}/usdc/transactions/${address}`);
    const data = await response.json();
    return data.usdcTransfers;
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
