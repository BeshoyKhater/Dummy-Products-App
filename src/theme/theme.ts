import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1f7a8c" },
    secondary: { main: "#bf1363" },
    background: { default: "#f7f9fb", paper: "#ffffff" },
    text: { primary: "#0f172a", secondary: "#475569" },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: `'Inter', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif`,
    h6: { fontWeight: 700 },
  },
  components: {
    MuiButton: { defaultProps: { variant: "contained" } },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 14, boxShadow: "0 6px 20px rgba(0,0,0,0.06)" },
      },
    },
  },
});

export default theme;
