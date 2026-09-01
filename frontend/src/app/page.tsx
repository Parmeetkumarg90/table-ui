import Box from "@mui/material/Box";
import styles from "./styles.module.css";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import EnhancedTable from "@/components/shared/table/table";

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
      <Card className={styles.listLayout}>
        <EnhancedTable  />
      </Card>
    </Card>
  );
}
