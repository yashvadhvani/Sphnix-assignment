import React from "react";
import { Box, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box mt={4} textAlign="center">
      <Typography variant="body2">
        © 2023 Sphinx. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
