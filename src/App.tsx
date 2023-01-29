import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { darkTheme, lightTheme } from "./styles/themes";
import Header from "./components/Header";
import DenseTable from "./components/DenseTable";
import { SupportedLocalesType, SUPPORTED_LOCALES } from "./const/locales";
import { generateTableData } from "./services/generateTableDataService";
import { ITableData } from "./models/TableDataModel";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [tableData, setTableData] = useState<ITableData[]>([]);
  const [locale, setLocale] = useState<SupportedLocalesType>("ru");

  useEffect(() => {
    setTableData(generateTableData(locale));
  }, [locale]);

  const changeTheme = () => {
    setIsDarkMode((previousValue) => !previousValue);
  };
  const changeLocale = (e: SelectChangeEvent<SupportedLocalesType>) => {
    setLocale(e.target.value as SupportedLocalesType);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box sx={{ maxWidth: "1000px", m: "0 auto", px: 2 }}>
        <Header changeTheme={changeTheme} />
        <Box sx={{ pt: 3 }}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={locale}
            onChange={changeLocale}
          >
            {SUPPORTED_LOCALES.map((item) => {
              return <MenuItem value={item}>{item}</MenuItem>;
            })}
          </Select>
        </Box>
        <Box sx={{ py: 3 }}>
          <DenseTable tableData={tableData} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
