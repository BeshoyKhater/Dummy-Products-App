import { Box, Typography, Paper } from "@mui/material";

export default function ProductsPage() {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Products
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Typography color="text.secondary">Toolbar</Typography>
      </Paper>
    </Box>
  );
}
