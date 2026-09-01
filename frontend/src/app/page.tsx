import Box from "@mui/material/Box";
import styles from "./styles.module.css";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import { UserListTable } from "@/features/user/components/user-list-table/user-list-table";

export default function Home() {
  return (
    <Card className={styles.layout}>
      <Box className={styles.header}>
        <Typography className={styles.headerText}>List of Reservations</Typography>
        <Button variant="contained" className={styles.headerButton}>
          <AddIcon />
          <Typography className={styles.headerButtonLabel}>ADD RESERVATION</Typography>
        </Button>
      </Box>
      <UserListTable />
    </Card>
  );
}
