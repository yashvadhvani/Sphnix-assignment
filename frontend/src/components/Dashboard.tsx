import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import TransactionHistory from "./TransactionHistory";
import Balance from "./Balance";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "80vh",
    width: "100%",
  },
  form: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    width: "100%",
  },
}));

const Dashboard: React.FC = () => {
  const classes = useStyles();
  const [address, setAddress] = useState<string>("");
  const [finalAddress, setFinalAddress] = useState<string>("");

  const [error, setError] = useState<string | null>(null);

  const isValidEthereumAddress = (address: string): boolean => {
    const regex = /^(0x)?[0-9a-fA-F]{40}$/;
    return regex.test(address);
  };

  const handleCheckBalance = async () => {
    if (!address) {
      setError("Please enter a valid Ethereum address");
      return;
    }
    if (!isValidEthereumAddress(address)) {
      setError("Invalid Ethereum address format");
      return;
    }

    setError(null);
    setFinalAddress(address);
  };

  return (
    <div className={classes.root}>
      <div className={classes.form}>
        <TextField
          label="Ethereum Address"
          variant="outlined"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          error={error !== null}
          helperText={error}
          size="medium"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCheckBalance}
          sx={{ height: "80%", ml: 1 }}
        >
          Go
        </Button>
      </div>
      {finalAddress !== "" && <Balance address={finalAddress} />}
      {finalAddress !== "" && <TransactionHistory address={finalAddress} />}
    </div>
  );
};

export default Dashboard;
