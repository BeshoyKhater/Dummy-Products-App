import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Box,
} from "@mui/material";
import type { Product } from "../types/product";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="180"
          image={product.images[0]}
          alt={product.title}
          sx={{ objectFit: "contain" }}
          loading="lazy"
        />
        <CardContent>
          <Typography gutterBottom variant="subtitle1" noWrap>
            {product.title}
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h6">${product.price}</Typography>
            <Typography variant="caption" color="text.secondary">
              {product.category}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
