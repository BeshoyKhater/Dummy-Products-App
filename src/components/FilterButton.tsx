import { Button, Badge, useMediaQuery, useTheme } from "@mui/material";
import { FilterList as FilterIcon } from "@mui/icons-material";

interface FilterButtonProps {
  onClick: () => void;
  activeFiltersCount?: number;
}

export default function FilterButton({
  onClick,
  activeFiltersCount = 0,
}: FilterButtonProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Button
      variant="outlined"
      startIcon={<FilterIcon />}
      onClick={onClick}
      sx={{
        borderRadius: 2,
        px: 3,
        py: 1.5,
        textTransform: "none",
        fontWeight: 500,
        borderColor: "primary.main",
        color: "primary.main",
        "&:hover": {
          backgroundColor: "primary.main",
          color: "white",
        },
      }}
    >
      {isMobile ? "Filters" : "Filter Products"}
      {activeFiltersCount > 0 && (
        <Badge
          badgeContent={activeFiltersCount}
          color="primary"
          sx={{
            ml: 2,
            "& .MuiBadge-badge": {
              fontSize: "0.75rem",
              height: 18,
              minWidth: 18,
            },
          }}
        />
      )}
    </Button>
  );
}
