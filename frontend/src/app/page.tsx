import styles from "./styles.module.css";
import Card from "@mui/material/Card";
import { ReservationListTable } from "@/features/reservation/components/reservation-list-table/reservation-list-table";
import { ReservationNavbar } from "@/features/reservation/components/reservation-navbar/reservation-navbar";

export default function Home() {
  return (
    <Card className={styles.layout}>
      <ReservationNavbar />
      <ReservationListTable />
    </Card>
  );
}
