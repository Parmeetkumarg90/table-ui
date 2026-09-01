"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import { UserCategory } from "@/features/reservation/enum/user-category";
import { CreateReservationPayloadInterface } from "@/store/features/reservation/reservation.types";
import { createReservationService, listReservationService } from "@/store/features/reservation/reservation.service";
import { useAppDispatch } from "@/store/hook/store";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import styles from "./styles.module.css";

interface ReservationCreationFormProps {
    onClose?: () => void;
}

interface FormInputs {
    firstname: string;
    lastname: string;
    age: number | string;
    category: UserCategory;
}

const ReservationCreationFormComponent: React.FC<ReservationCreationFormProps> = ({ onClose }) => {
    const dispatch = useAppDispatch();
    const { loading, limit, page } = useSelector((state: RootState) => state.reservation);

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormInputs>({
        defaultValues: {
            firstname: "",
            lastname: "",
            age: "",
            category: UserCategory.ADULT,
        },
    });

    const onSubmit = async (data: FormInputs) => {
        const payload: CreateReservationPayloadInterface = {
            firstname: data.firstname.trim(),
            lastname: data.lastname.trim(),
            age: Number(data.age),
            category: data.category,
        };

        const resultAction = await dispatch(createReservationService(payload));
        if (createReservationService.fulfilled.match(resultAction)) {
            reset();
            dispatch(listReservationService({ limit, page }));
            onClose?.();
        }
    };

    return (
        <Card className={styles.formCard}>
            <Box className={styles.header}>
                <Typography className={styles.title}>Create Reservation</Typography>
                {onClose && (
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                )}
            </Box>

            <form onSubmit={handleSubmit(onSubmit)} className={styles.formContent}>
                <Box className={styles.row}>
                    <TextField
                        label="First Name"
                        fullWidth
                        size="small"
                        {...register("firstname", {
                            required: "First name is required",
                            maxLength: { value: 80, message: "Maximum 80 characters" },
                        })}
                        error={!!errors.firstname}
                        helperText={errors.firstname?.message}
                    />

                    <TextField
                        label="Last Name"
                        fullWidth
                        size="small"
                        {...register("lastname", {
                            required: "Last name is required",
                            maxLength: { value: 100, message: "Maximum 100 characters" },
                        })}
                        error={!!errors.lastname}
                        helperText={errors.lastname?.message}
                    />
                </Box>

                <Box className={styles.row}>
                    <TextField
                        label="Age"
                        type="number"
                        fullWidth
                        size="small"
                        {...register("age", {
                            required: "Age is required",
                            min: { value: 0, message: "Age must be positive" },
                            max: { value: 150, message: "Age must be valid" },
                            valueAsNumber: true,
                        })}
                        error={!!errors.age}
                        helperText={errors.age?.message}
                    />

                    <Controller
                        name="category"
                        control={control}
                        rules={{ required: "Category is required" }}
                        render={({ field }) => (
                            <FormControl fullWidth size="small" error={!!errors.category}>
                                <InputLabel id="category-select-label">Category</InputLabel>
                                <Select
                                    {...field}
                                    labelId="category-select-label"
                                    label="Category"
                                >
                                    <MenuItem value={UserCategory.ADULT}>Adult</MenuItem>
                                    <MenuItem value={UserCategory.CHILDREN}>Children</MenuItem>
                                </Select>
                                {errors.category && (
                                    <FormHelperText>{errors.category.message}</FormHelperText>
                                )}
                            </FormControl>
                        )}
                    />
                </Box>

                <Box className={styles.actions}>
                    {onClose && (
                        <Button
                            variant="text"
                            onClick={onClose}
                            className={styles.cancelButton}
                            disabled={loading || isSubmitting}
                        >
                            Cancel
                        </Button>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        className={styles.submitButton}
                        disabled={loading || isSubmitting}
                        startIcon={
                            loading || isSubmitting ? (
                                <CircularProgress size={18} color="inherit" />
                            ) : null
                        }
                    >
                        {loading || isSubmitting ? "Creating..." : "Create"}
                    </Button>
                </Box>
            </form>
        </Card>
    );
};

export { ReservationCreationFormComponent };