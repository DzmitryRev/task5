import React from "react";
import { Box, FormControlLabel, Typography } from "@mui/material";
import { MaterialUISwitch } from "../styles/MaterialUIThemeSwitcher";

interface IHeaderProps {
  changeTheme(): void;
}

export default function Header({ changeTheme }: IHeaderProps) {
  return (
    <Box
      sx={{
        maxWidth: "1000px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        py: 2,
      }}
    >
      <Typography variant="h6">Random users app</Typography>
      <FormControlLabel
        sx={{ m: 0, width: "fit-content" }}
        control={<MaterialUISwitch onChange={changeTheme} defaultChecked />}
        label=""
      />
    </Box>
  );
}
