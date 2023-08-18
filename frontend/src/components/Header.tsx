import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Contract, formatUnits, BrowserProvider } from "ethers";

const useStyles = makeStyles(() => ({
  appBar: {
    marginBottom: 4,
  },
  title: {
    flexGrow: 1,
  },
  connectButton: {
    marginLeft: "auto",
  },
}));

const Header: React.FC = () => {
  const classes = useStyles();
  const [usdcBalance, setUsdcBalance] = useState<string | null>(null);
  const [isMetamaskConnected, setIsMetamaskConnected] =
    useState<boolean>(false);

  const handleConnectMetamask = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const provider = new BrowserProvider(window.ethereum);

        // Check if the connected network is the Ethereum mainnet (chainId: 1)
        const network = await provider.getNetwork();
        if (parseInt(network.chainId.toString()) !== 1) {
          console.log("Please switch to Ethereum mainnet.");
          return;
        }

        const signer = await provider.getSigner();
        const usdcContractAddress =
          "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"; // USDC contract address on Ethereum mainnet
        const usdcContract = new Contract(
          usdcContractAddress,
          [
            {
              inputs: [
                { internalType: "address", name: "account", type: "address" },
              ],
              name: "balanceOf",
              outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
              stateMutability: "view",
              type: "function",
            },
          ],
          provider
        );
        const userAddress = await signer.getAddress();
        const balance = await usdcContract.balanceOf(userAddress);
        setUsdcBalance(formatUnits(balance, 6)); // USDC has 6 decimal places
        setIsMetamaskConnected(true);
      } else {
        console.log("Metamask not available.");
      }
    } catch (error) {
      console.error("Error connecting to Metamask:", error);
    }
  };

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Ethereum Balance Checker
        </Typography>
        {isMetamaskConnected ? (
          <Typography variant="subtitle1">
            {usdcBalance !== null ? `${usdcBalance} USDC` : "Fetching..."}
          </Typography>
        ) : (
          <Button
            color="inherit"
            className={classes.connectButton}
            onClick={handleConnectMetamask}
          >
            Connect Wallet
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
