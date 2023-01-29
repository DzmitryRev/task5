import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Button, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
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
  const [page, setPage] = useState<number>(1);
  const [seed, setSeed] = useState<string>("");

  useEffect(() => {
    setPage(1);
    setTableData(generateTableData(locale, 1, seed));
  }, [seed, locale]);

  const loadMoreTableItems = () => {
    setTableData((prev) => {
      let loadedTableData = generateTableData(locale, page + 1, seed);
      if (JSON.stringify(prev) !== JSON.stringify(loadedTableData)) {
        setPage(page + 1);
        return [...prev, ...loadedTableData];
      }
      return [...prev];
    });
  };

  const changeTheme = () => {
    setIsDarkMode((previousValue) => !previousValue);
  };
  const changeLocale = (e: SelectChangeEvent<SupportedLocalesType>) => {
    setLocale(e.target.value as SupportedLocalesType);
  };
  const changeSeed = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeed(e.target.value);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box sx={{ maxWidth: "1000px", m: "0 auto", px: 2 }}>
        <Header changeTheme={changeTheme} />
        <Box sx={{ pt: 3 }}>
          <Select
            sx={{ mr: 2 }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={locale}
            onChange={changeLocale}
          >
            {SUPPORTED_LOCALES.map((item) => {
              return (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
          <TextField
            id="outlined-basic"
            label="Seed"
            variant="outlined"
            value={seed}
            onChange={changeSeed}
          />
        </Box>
        <Button onClick={loadMoreTableItems}>Load more</Button>
        <Box sx={{ py: 3 }}>
          <DenseTable tableData={tableData} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
