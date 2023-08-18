import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Transaction } from "../types/transaction.type";
import { fetchAddressTransactions } from "../services/api.services";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  tableContainer: {
    marginTop: 2,
    width: "100%",
  },
  tableHeader: {
    fontWeight: "bold",
  },
}));

interface TransactionHistoryProps {
  address: string;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ address }) => {
  const classes = useStyles();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const response = await fetchAddressTransactions(address);
        setTransactions(response);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    if (address && address !== "") {
      fetchTransactions();
    }
  }, [address]);

  return (
    <Box className={classes.root}>
      <Typography variant="h5" mb={2}>
        Transaction History
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table sx={{ width: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeader}>Date</TableCell>
                <TableCell className={classes.tableHeader}>Tx Hash</TableCell>
                <TableCell className={classes.tableHeader}>
                  Block Number
                </TableCell>
                <TableCell className={classes.tableHeader}>From</TableCell>
                <TableCell className={classes.tableHeader}>To</TableCell>
                <TableCell className={classes.tableHeader}>
                  Value (ETH)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {new Date(
                      parseInt(transaction.timeStamp) * 1000
                    ).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`https://etherscan.io/tx/${transaction.hash}`}
                      target="_blank"
                      rel="noopener"
                    >
                      {transaction.hash}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`https://etherscan.io/block/${transaction.blockNumber}`}
                      target="_blank"
                      rel="noopener"
                    >
                      {transaction.blockNumber}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`https://etherscan.io/address/${transaction.from}`}
                      target="_blank"
                      rel="noopener"
                    >
                      {transaction.from}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`https://etherscan.io/address/${transaction.to}`}
                      target="_blank"
                      rel="noopener"
                    >
                      {transaction.to}
                    </Link>
                  </TableCell>
                  <TableCell>{Number(transaction.value) / 1000000}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default TransactionHistory;
