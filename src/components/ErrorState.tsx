import { Box, Typography, Button, Paper } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";

interface ErrorStateProps {
  message?: string;
}

export default function ErrorState({
  message = "Something went wrong while fetching products.",
}: ErrorStateProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        textAlign: "center",
        backgroundColor: "background.paper",
        borderRadius: 3,
      }}
    >
      <Box mb={2}>
        <ErrorOutline
          sx={{
            fontSize: 64,
            color: "error.main",
            opacity: 0.8,
          }}
        />
      </Box>

      <Typography
        variant="h6"
        color="error.main"
        gutterBottom
        sx={{ fontWeight: 600 }}
      >
        Oops! Something went wrong
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 3, maxWidth: 400, mx: "auto" }}
      >
        {message}
      </Typography>
    </Paper>
  );
}
