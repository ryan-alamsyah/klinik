
import { Snackbar, Alert } from "@mui/material";
import type { AlertColor } from "@mui/material";


interface ToastProps {
  open: boolean;
  message: string;
  severity?: AlertColor; // 'success' | 'error' | 'info' | 'warning'
  onClose: () => void;
}

const Toast = ({ open, message, severity = "success", onClose }: ToastProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;