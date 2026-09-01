import Card from "@mui/material/Card"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Typography from "@mui/material/Typography";
import styles from "./styles.module.css"
import Button from "@mui/material/Button";

const LeftSideBarComponent = () => {
    return <Card className={styles.layout}>
        <Button className={styles.selectedItem}>
            <CalendarMonthIcon />
            <Typography className={styles.selectedText}>List of Reservations</Typography>
        </Button>
    </Card>
}

export { LeftSideBarComponent }