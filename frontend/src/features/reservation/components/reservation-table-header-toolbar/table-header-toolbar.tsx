import { useState, useEffect, useMemo } from "react";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styles from "./styles.module.css";
import { UserCategory } from "@/features/reservation/enum/user-category";
import { ReservationEnhancedTableToolbarProps } from "../../types/reservation.types";
import { getDebounce } from "@/utils/optimizers";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

function ReservationEnhancedTableToolbar(
  props: ReservationEnhancedTableToolbarProps,
) {
  const { onOptionSelect, onSearch, selectedOptions, search = "" } = props;
  const [searchValue, setSearchValue] = useState(search);
  const selectedOptionsSet = new Set(selectedOptions);

  useEffect(() => {
    setSearchValue(search || "");
  }, [search]);

  const debouncedSearch = useMemo(
    () => getDebounce((val: string) => onSearch(val), 500),
    [onSearch],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedSearch(value);
  };

  const handleOptionChange = (e: SelectChangeEvent<string[]>) => {
    const value = e.target.value;
    const categories = typeof value === "string" ? value.split(",") : value;
    const refinedCategories = (categories as UserCategory[]).filter(
      (val) => !!val,
    );
    onOptionSelect(refinedCategories);
  };

  return (
    <Toolbar className={styles.toolbar}>
      <OutlinedInput
        startAdornment={<SearchIcon />}
        placeholder="Search"
        className={styles.inputField}
        onChange={handleInputChange}
        value={searchValue}
      />
      <Select
        className={styles.select}
        value={selectedOptions}
        displayEmpty
        onChange={handleOptionChange}
        multiple
        renderValue={(selected) => {
          if (!selected || selected.length === 0) {
            return "Type";
          }
          return selected.join(", ");
        }}
        MenuProps={{
          PaperProps: {
            className: styles.selectMenuPaper,
          },
        }}
      >
        {Object.keys(UserCategory).map((category) => {
          const value = UserCategory[category as keyof typeof UserCategory];
          return (
            <MenuItem
              key={category}
              value={value}
              className={styles.selectOption}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "transparent",
                },
              }}
            >
              {selectedOptionsSet.has(value) ? (
                <CheckBoxIcon className={styles.selectIcon} />
              ) : (
                <CheckBoxOutlineBlankIcon className={styles.selectIcon} />
              )}
              {value}
            </MenuItem>
          );
        })}
      </Select>
    </Toolbar>
  );
}

export { ReservationEnhancedTableToolbar };
