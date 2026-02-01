import { useSnackbar } from "notistack";

const useSnackbarNotification = () => {
    const { enqueueSnackbar } = useSnackbar();

    const showSuccess = (message: string) => {
        enqueueSnackbar(message, {
            variant: "success",
            anchorOrigin: {
                vertical: "top",
                horizontal: "center",
            },
        });
    };

    const showError = (message: string) => {
        enqueueSnackbar(message, {
            variant: "error",
            anchorOrigin: {
                vertical: "top",
                horizontal: "center",
            },
        });
    };

    return { showSuccess, showError };
};

export default useSnackbarNotification;