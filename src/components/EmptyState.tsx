import { Box, Typography, Button, Paper } from "@mui/material";
import { SearchOff } from "@mui/icons-material";

interface EmptyStateProps {
  title?: string;
  description?: string;
  onClearFilters?: () => void;
}

export default function EmptyState({
  title = "No products match your filters",
  description = "Try adjusting your search terms or filters to find what you're looking for.",
  onClearFilters,
}: EmptyStateProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 6,
        textAlign: "center",
        backgroundColor: "background.paper",
        borderRadius: 3,
      }}
    >
      <Box mb={3}>
        <SearchOff
          sx={{
            fontSize: 80,
            color: "text.secondary",
            opacity: 0.6,
          }}
        />
      </Box>

      <Typography
        variant="h5"
        color="text.primary"
        gutterBottom
        sx={{
          fontWeight: 600,
          mb: 2,
        }}
      >
        {title}
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{
          mb: 4,
          maxWidth: 500,
          mx: "auto",
          lineHeight: 1.6,
        }}
      >
        {description}
      </Typography>

      {onClearFilters && (
        <Button
          variant="outlined"
          color="primary"
          onClick={onClearFilters}
          sx={{
            borderRadius: 2,
            px: 4,
            py: 1.5,
            textTransform: "none",
            fontWeight: 500,
          }}
        >
          Clear All Filters
        </Button>
      )}
    </Paper>
  );
}
