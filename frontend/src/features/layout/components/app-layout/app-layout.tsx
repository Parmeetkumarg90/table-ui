"use client";

import { ReactNode, useState } from "react";
import Box from "@mui/material/Box";
import styles from "./styles.module.css";
import { persister, store } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { LeftSideBarComponent } from "@/features/app/components/left-sidebar/left-sidebar";
import { NavbarComponent } from "@/features/app/components/nav-bar/nav-bar";
import theme from "@/theme/app-theme";
import { ThemeProvider } from "@mui/material/styles";

const AppLayoutComponent = ({ children }: { children: ReactNode }) => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persister}>
          <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
            <NavbarComponent
              onSideBarToggle={() => setShowSidebar((prev) => !prev)}
            />
            <Box className={styles.childrenLayout}>
              {showSidebar && <LeftSideBarComponent />}
              {children}
            </Box>
          </SnackbarProvider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
};

export { AppLayoutComponent };
