import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Box,
  Button,
  Divider,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
  TextField,
} from "@mui/material";
import Header from "./components/Header";
import DenseTable from "./components/DenseTable";
import { SupportedLocalesType, SUPPORTED_LOCALES } from "./const/locales";
import { generateTableData } from "./services/generateTableDataService";
import { ITableData } from "./models/TableDataModel";
import { useInView } from "react-intersection-observer";

function App() {
  const [tableData, setTableData] = useState<ITableData[]>([]);
  const [locale, setLocale] = useState<SupportedLocalesType>("ru");
  const [page, setPage] = useState<number>(1);
  const [seed, setSeed] = useState<string>("");
  const [numberOfErrors, setNumberOfErrors] = useState<string>("");
  const [sliderErrors, setSliderErrors] = useState<number>(0);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      loadMoreTableItems();
    }
  }, [inView]);

  useEffect(() => {
    if (sliderErrors > 0 && +numberOfErrors <= 1) {
      setNumberOfErrors(`${sliderErrors}`);
    }
  }, [sliderErrors]);

  useEffect(() => {
    setSliderErrors(+numberOfErrors);
  }, [numberOfErrors]);

  useEffect(() => {
    setPage(1);
    setTableData(generateTableData(locale, 1, seed, +numberOfErrors));
  }, [seed, locale, numberOfErrors]);

  const loadMoreTableItems = () => {
    setTableData((prev) => {
      let loadedTableData = generateTableData(locale, page + 1, seed, +numberOfErrors);
      if (JSON.stringify(prev) !== JSON.stringify(loadedTableData)) {
        setPage(page + 1);
        return [...prev, ...loadedTableData];
      }
      return [...prev];
    });
  };

  const changeLocale = (e: SelectChangeEvent<SupportedLocalesType>) => {
    setLocale(e.target.value as SupportedLocalesType);
  };
  const changeSeed = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeed(e.target.value);
  };
  const changeErrors = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfErrors(e.target.value);
  };

  return (
    <>
      <CssBaseline />
      <Box sx={{ maxWidth: "1000px", m: "0 auto", px: 2 }}>
        <Header />
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
            sx={{ mr: 2 }}
            id="outlined-basic"
            label="Seed"
            variant="outlined"
            type="number"
            value={seed}
            onChange={changeSeed}
          />
          <TextField
            sx={{ mr: 2 }}
            id="outlined-basic"
            label="Errors"
            variant="outlined"
            type="number"
            value={numberOfErrors}
            onChange={changeErrors}
          />
          <Box sx={{ width: "150px", display: "inline-block" }}>
            <Slider
              aria-label="Errors"
              defaultValue={0}
              value={sliderErrors}
              onChange={(e, value) => {
                setSliderErrors(value as number);
              }}
              valueLabelDisplay="auto"
              step={0.25}
              marks
              min={0}
              max={1}
            />
          </Box>
        </Box>
        <Button onClick={loadMoreTableItems}>Load more</Button>
        <Box sx={{ py: 3 }}>
          <DenseTable tableData={tableData} />
          <Divider ref={ref} />
        </Box>
      </Box>
    </>
  );
}

export default App;
