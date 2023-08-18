import { CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchAddressBalance } from "../services/api.services";

const Balance: React.FC<{ address: string }> = ({ address }) => {
  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        setLoading(true);
        const response = await fetchAddressBalance(address);
        setBalance(response);
        console.log("LL: fetchBalance -> response", response);
      } catch (error) {
        console.error("Error fetching balance:", error);
      } finally {
        setLoading(false);
      }
    };

    if (address && address !== "") {
      fetchBalance();
    }
  }, [address]);
  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        balance !== null && (
          <Typography variant="h6">Balance: {balance} USDC</Typography>
        )
      )}
    </>
  );
};

export default Balance;
