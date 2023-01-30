import React from "react";
import { Box, FormControlLabel, Typography } from "@mui/material";

export default function Header() {
  return (
    <Box
      sx={{
        maxWidth: "1000px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 2,
      }}
    >
      <Typography variant="h6">Random users app</Typography>
    </Box>
  );
}
