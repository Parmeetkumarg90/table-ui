import { ReactNode } from "react";
import Box from "@mui/material/Box";
import "./styles.css"
import IconButton from "@mui/material/IconButton";
import MenuIcon from '@mui/icons-material/Menu';
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import AppsIcon from '@mui/icons-material/Apps';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { persister, store } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import Snackbar from "@mui/material/Snackbar";

const AppLayoutComponent = ({ children }: { children: ReactNode }) => {
    return (
        <Snackbar>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persister}>
                    <Card className="header">
                        <Box className="left-box">
                            <IconButton className="menu-button">
                                <MenuIcon />
                            </IconButton>
                            <Typography className="text">University Residence</Typography>
                        </Box>
                        <Box className="right-box">
                            <IconButton className="menu-button">
                                <AppsIcon />
                            </IconButton>
                            <IconButton className="menu-button">
                                <NotificationsIcon />
                            </IconButton>
                            <IconButton className="menu-button">
                                <AccountCircleIcon />
                            </IconButton>
                            <Box className="menu-option">
                                <Typography>Wade Warren</Typography>
                                <IconButton className="menu-option-button">
                                    <KeyboardArrowDownIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    </Card>
                    {children}
                </PersistGate>
            </Provider>
        </Snackbar>
    )
}

export { AppLayoutComponent }