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
  const { onOptionSelect, onSearch, selectedOptions } = props;
  const selectedOptionsSet = new Set(selectedOptions);

  const debouncingOnOptionChange = getDebounce(
    (e: SelectChangeEvent<string[]>) => {
      const value = e.target.value;
      const categories = typeof value === "string" ? value.split(",") : value;
      const refinedCategories = (categories as UserCategory[]).filter(
        (val) => !!val,
      );
      onOptionSelect(refinedCategories);
    },
  );

  const debouncingOnInputChange = getDebounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSearch(e.target.value);
    },
  );

  return (
    <Toolbar className={styles.toolbar}>
      <OutlinedInput
        startAdornment={<SearchIcon />}
        placeholder="Search"
        className={styles.inputField}
        onChange={debouncingOnInputChange}
      />
      <Select
        className={styles.select}
        value={selectedOptions}
        displayEmpty
        onChange={debouncingOnOptionChange}
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
            >
              {selectedOptionsSet.has(value) ? (
                <CheckBoxIcon />
              ) : (
                <CheckBoxOutlineBlankIcon />
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
