import { Button } from "@mui/material";
import ClearAllIcon from "@mui/icons-material/ClearAll";

export default function ClearFilters({ onClick }: { onClick: () => void }) {
  return (
    <Button onClick={onClick} variant="outlined" startIcon={<ClearAllIcon />}>
      Clear All
    </Button>
  );
}
