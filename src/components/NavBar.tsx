import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  IconButton,
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

export default function NavBar() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="inherit"
      sx={{ borderBottom: "1px solid #eaeef4", backdropFilter: "blur(6px)" }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <IconButton edge="start" color="primary" sx={{ mr: 1 }}>
            <ShoppingBagIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dummy Products
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
