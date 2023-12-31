import { Box, CircularProgress, Typography } from "@mui/material";
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        balance !== null && (
          <Typography
            variant="h6"
            component="div"
            display="flex"
            alignItems="center"
            justifyContent="center"
            my={2}
          >
            Balance: {balance} USDC
          </Typography>
        )
      )}
    </>
  );
};

export default Balance;
