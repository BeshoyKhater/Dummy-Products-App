import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Stack,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import SearchBar from "./filters/SearchBar";
import CategoryFilter from "./filters/CategoryFilter";
import PriceFilter from "./filters/PriceFilter";
import SortSelect from "./filters/SortSelect";
import ClearFilters from "./filters/ClearFilter";

interface FilterSidebarProps {
  open: boolean;
  onClose: () => void;
  // Filter values
  q: string;
  category: string;
  min?: number;
  max?: number;
  sort: string;
  // Filter handlers
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onPriceChange: (values: { min?: number; max?: number }) => void;
  onSortChange: (value: string) => void;
  onClearAll: () => void;
}

export default function FilterSidebar({
  open,
  onClose,
  q,
  category,
  min,
  max,
  sort,
  onSearchChange,
  onCategoryChange,
  onPriceChange,
  onSortChange,
  onClearAll,
}: FilterSidebarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const drawerContent = (
    <Box sx={{ width: { xs: 280, sm: 320 }, height: "100%" }}>
      {/* Header */}
      <Box
        sx={{
          p: 2,
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Filters
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Filters Content */}
      <Box sx={{ p: 2, height: "calc(100% - 80px)", overflow: "auto" }}>
        <Stack spacing={3}>
          {/* Search */}
          <Paper
            elevation={0}
            sx={{ p: 2, backgroundColor: "background.default" }}
          >
            <Typography variant="subtitle2" gutterBottom fontWeight={600}>
              Search
            </Typography>
            <SearchBar value={q} onChange={onSearchChange} />
          </Paper>

          {/* Category */}
          <Paper
            elevation={0}
            sx={{ p: 2, backgroundColor: "background.default" }}
          >
            <Typography variant="subtitle2" gutterBottom fontWeight={600}>
              Category
            </Typography>
            <CategoryFilter value={category} onChange={onCategoryChange} />
          </Paper>

          {/* Price Range */}
          <Paper
            elevation={0}
            sx={{ p: 2, backgroundColor: "background.default" }}
          >
            <Typography variant="subtitle2" gutterBottom fontWeight={600}>
              Price Range
            </Typography>
            <PriceFilter min={min} max={max} onChange={onPriceChange} />
          </Paper>

          {/* Sort */}
          <Paper
            elevation={0}
            sx={{ p: 2, backgroundColor: "background.default" }}
          >
            <Typography variant="subtitle2" gutterBottom fontWeight={600}>
              Sort By
            </Typography>
            <SortSelect value={sort} onChange={onSortChange} />
          </Paper>

          {/* Clear Filters */}
          <Box display="flex" justifyContent="center" pt={2}>
            <ClearFilters onClick={onClearAll} />
          </Box>
        </Stack>
      </Box>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "background.paper",
            borderTopRightRadius: 12,
            borderBottomRightRadius: 12,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        "& .MuiDrawer-paper": {
          position: "relative",
          backgroundColor: "background.paper",
          borderRight: 1,
          borderColor: "divider",
          borderRadius: 0,
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}
