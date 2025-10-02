import { useQuery } from "@tanstack/react-query";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { fetchCategories } from "../../api/products";
import type { Category } from "../../types/product";

export default function CategoryFilter({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const { data } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  console.log(data);

  return (
    <FormControl fullWidth>
      <InputLabel id="cat">Category</InputLabel>
      <Select
        labelId="cat"
        label="Category"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      >
        <MenuItem value="">
          <em>All</em>
        </MenuItem>
        {data?.map((c, i) => (
          <MenuItem key={i} value={c?.slug}>
            {c?.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
