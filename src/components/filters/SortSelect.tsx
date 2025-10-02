import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import type { SortKey } from "../../hooks/useProductsQueryParams";

export default function SortSelect({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (v: SortKey) => void;
}) {
  const handle = (e: SelectChangeEvent) => onChange(e.target.value as SortKey);
  return (
    <FormControl fullWidth>
      <InputLabel id="sort">Sort by</InputLabel>
      <Select labelId="sort" label="Sort by" value={value} onChange={handle}>
        <MenuItem value="price-asc">Price: Low → High</MenuItem>
        <MenuItem value="price-desc">Price: High → Low</MenuItem>
        <MenuItem value="title-asc">Name: A → Z</MenuItem>
        <MenuItem value="title-desc">Name: Z → A</MenuItem>
      </Select>
    </FormControl>
  );
}
