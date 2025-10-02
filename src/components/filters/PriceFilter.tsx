import { Box, Slider, Typography } from "@mui/material";

export default function PriceFilter({
  min,
  max,
  onChange,
  minLimit = 0,
  maxLimit = 4000,
}: {
  min?: number;
  max?: number;
  onChange: (u: { min?: number; max?: number }) => void;
  minLimit?: number;
  maxLimit?: number;
}) {
  const value: number[] = [min ?? minLimit, max ?? maxLimit];

  const handleChange = (_: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      onChange({ min: newValue[0], max: newValue[1] });
    }
  };

  return (
    <Box px={2} py={1}>
      <Typography gutterBottom variant="subtitle2">
        Price Range
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={minLimit}
        max={maxLimit}
      />
      <Typography variant="caption" color="text.secondary">
        {value[0]}$ – {value[1]}$
      </Typography>
    </Box>
  );
}
