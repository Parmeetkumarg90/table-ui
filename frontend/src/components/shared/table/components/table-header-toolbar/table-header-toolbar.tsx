import Toolbar from '@mui/material/Toolbar';
import { EnhancedTableToolbarProps } from '../../types/table';
import SearchIcon from '@mui/icons-material/Search';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import styles from "./styles.module.css"

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { } = props;
    return (
        <Toolbar className={styles.toolbar}>
            <OutlinedInput startAdornment={<SearchIcon />} placeholder='Search' className={styles.inputField} />
            <Select
                className={styles.select}
                defaultValue=""
                displayEmpty
            >
                <MenuItem value="" disabled sx={{ display: 'none' }}>
                    Type
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
        </Toolbar>
    );
}

export { EnhancedTableToolbar }