import IconButton from "@mui/material/IconButton";
import MenuIcon from '@mui/icons-material/Menu';
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import AppsIcon from '@mui/icons-material/Apps';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Box from "@mui/material/Box";
import styles from "./styles.module.css"

const NavbarComponent = () => {
    return (

        <Card className={styles.header}>
            <Box className={styles.leftBox}>
                <IconButton className={styles.menuButton}>
                    <MenuIcon />
                </IconButton>
                <Typography className={styles.text}>University Residence</Typography>
            </Box>
            <Box className={styles.rightBox}>
                <IconButton className={styles.menuButton}>
                    <AppsIcon />
                </IconButton>
                <IconButton className={styles.menuButton}>
                    <NotificationsIcon />
                </IconButton>
                <IconButton className={styles.menuButton}>
                    <AccountCircleIcon />
                </IconButton>
                <Box className={styles.menuOption}>
                    <Typography>Wade Warren</Typography>
                        <KeyboardArrowDownIcon />
                </Box>
            </Box>
        </Card>
    )
}

export { NavbarComponent }