import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent, SelectProps } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styles from "./styles.module.css";
import { UserCategory } from "@/features/reservation/enum/user-category";
import { ReservationEnhancedTableToolbarProps } from "../../types/reservation.types";
import { getDebounce } from "@/utils/optimizers";

function ReservationEnhancedTableToolbar(
  props: ReservationEnhancedTableToolbarProps,
) {
  const { onOptionSelect, onSearch, selectedOptions } = props;

  const debouncingOnOptionChange = getDebounce(
    (e: SelectChangeEvent<string[]>) => {
      const refinedCategories = (e.target.value as UserCategory[]).filter(
        (value) => !!value,
      );
      onOptionSelect(refinedCategories);
      e.target.value =
        refinedCategories.length === 0 ? [""] : refinedCategories;
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
        defaultValue={[""]}
        value={selectedOptions.length > 0 ? selectedOptions : [""]}
        displayEmpty
        onChange={debouncingOnOptionChange}
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
