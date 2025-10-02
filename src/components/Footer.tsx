import { Box, Container, Typography, Link } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{ borderTop: "1px solid #eaeef4", mt: 4, py: 3 }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Dummy Products • Built with React,
          TypeScript, MUI & React Query
        </Typography>
        <Typography variant="body2" color="text.secondary">
          API by{" "}
          <Link href="https://dummyjson.com" target="_blank" rel="noreferrer">
            dummyjson.com
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}
