import { TextField, InputAdornment, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import debounce from "lodash.debounce";
import { useEffect, useMemo, useState } from "react";

export default function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [local, setLocal] = useState(value);
  const [searching, setSearching] = useState(false);

  useEffect(() => setLocal(value), [value]);

  const debounced = useMemo(
    () =>
      debounce((v: string) => {
        onChange(v);
        setSearching(false);
      }, 300),
    [onChange]
  );

  function handleChange(v: string) {
    setLocal(v);
    setSearching(true);
    debounced(v);
  }

  useEffect(() => () => debounced.cancel(), [debounced]);

  return (
    <TextField
      fullWidth
      placeholder="Search products..."
      value={local}
      onChange={(e) => handleChange(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: searching ? (
          <InputAdornment position="end">
            <CircularProgress size={18} />
          </InputAdornment>
        ) : undefined,
      }}
    />
  );
}
