import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent, SelectProps } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styles from "./styles.module.css";
import { UserCategory } from "@/features/reservation/enum/user-category";
import { ReservationEnhancedTableToolbarProps } from "../../types/reservation.types";

function ReservationEnhancedTableToolbar(
  props: ReservationEnhancedTableToolbarProps,
) {
  const { onOptionSelect, onSearch } = props;

  const onOptionChange = (e: SelectChangeEvent<string[]>) => {
    const refinedCategories = (e.target.value as UserCategory[]).filter(
      (value) => !!value,
    );
    onOptionSelect(refinedCategories);
    e.target.value = refinedCategories.length === 0 ? [""] : refinedCategories;
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <Toolbar className={styles.toolbar}>
      <OutlinedInput
        startAdornment={<SearchIcon />}
        placeholder="Search"
        className={styles.inputField}
        onChange={onInputChange}
      />
      <Select
        className={styles.select}
        defaultValue={[""]}
        displayEmpty
        onChange={onOptionChange}
        multiple
      >
        <MenuItem
          value=""
          disabled
          className={styles.selectOption}
          sx={{ display: "none" }}
        >
          Type
        </MenuItem>
        {Object.keys(UserCategory).map((category) => (
          <MenuItem
            value={UserCategory[category as keyof typeof UserCategory]}
            className={styles.selectOption}
          >
            {category}
          </MenuItem>
        ))}
      </Select>
    </Toolbar>
  );
}

export { ReservationEnhancedTableToolbar };
