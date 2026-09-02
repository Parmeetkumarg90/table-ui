"use client";
import Box from "@mui/material/Box";
import styles from "./styles.module.css";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import { ReservationCreationFormComponent } from "@/features/reservation/components/reservation-creation-form/reservation-creation-form";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const ReservationNavbar = () => {
  const [showForm, setShowForm] = useState<boolean>(false);

  const onFormOpen = () => {
    setShowForm(true);
  };

  const onFormClose = () => {
    setShowForm(false);
  };

  return (
    <>
      <Box className={styles.header}>
        <Typography className={styles.headerText}>
          List of Reservations
        </Typography>
        <Button
          variant="contained"
          className={styles.headerButton}
          onClick={onFormOpen}
        >
          <AddIcon />
          <Typography className={styles.headerButtonLabel}>
            ADD RESERVATION
          </Typography>
        </Button>
      </Box>
      <Modal open={showForm} onClose={onFormClose} className={styles.modal}>
        <ReservationCreationFormComponent onClose={onFormClose} />
      </Modal>
    </>
  );
};

export { ReservationNavbar };
