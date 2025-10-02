import { useMemo } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  Box,
  Grid,
  Pagination,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/filters/SearchBar";
import CategoryFilter from "../components/filters/CategoryFilter";
import PriceFilter from "../components/filters/PriceFilter";
import SortSelect from "../components/filters/SortSelect";
import ClearFilters from "../components/filters/ClearFilter";
import {
  fetchProducts,
  fetchProductsByCategory,
  searchProducts,
  fetchAllProducts,
} from "../api/products";
import type { Product } from "../types/product";
import { useProductsQueryParams } from "../hooks/useProductsQueryParams";

function applyClientFilters(
  products: Product[],
  opts: { q?: string; min?: number; max?: number; sort: string }
) {
  let list = [...products];

  if (opts.q) {
    const q = opts.q.toLowerCase();
    list = list.filter((p) => p.title.toLowerCase().includes(q));
  }
  if (opts.min !== undefined) list = list.filter((p) => p.price >= opts.min!);
  if (opts.max !== undefined) list = list.filter((p) => p.price <= opts.max!);

  switch (opts.sort) {
    case "price-asc":
      list.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      list.sort((a, b) => b.price - a.price);
      break;
    case "title-asc":
      list.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "title-desc":
      list.sort((a, b) => b.title.localeCompare(a.title));
      break;
  }

  return list;
}

export default function ProductsPage() {
  const { params, update, clearAll } = useProductsQueryParams();
  const { q, category, min, max, sort, page, pageSize } = params;

  const hasPriceRange = min !== undefined || max !== undefined;
  const hasClientSort = !!sort && sort !== "price-asc";

  const canServerPageBase =
    (!category && !q) || (!!category && !q) || (!!q && !category);

  const enableServerPaging =
    canServerPageBase && !hasPriceRange && !hasClientSort;

  const queryKey = [
    "products",
    { q, category, min, max, sort, page, pageSize, enableServerPaging },
  ];

  const { data, isFetching, isError, error } = useQuery({
    queryKey,
    queryFn: async () => {
      if (enableServerPaging) {
        if (q && !category)
          return searchProducts({
            q,
            limit: pageSize,
            skip: (page - 1) * pageSize,
          });
        if (category && !q)
          return fetchProductsByCategory(category, {
            limit: pageSize,
            skip: (page - 1) * pageSize,
          });
        return fetchProducts({ limit: pageSize, skip: (page - 1) * pageSize });
      }
      const base = await fetchAllProducts(category || undefined);
      const filtered = applyClientFilters(base.products, { q, min, max, sort });
      return {
        products: filtered,
        total: filtered.length,
        limit: filtered.length,
        skip: 0,
      };
    },
    placeholderData: keepPreviousData,
  });

  const clientPaged = useMemo(() => {
    if (!data) return { rows: [] as Product[], totalPages: 0 };
    if (enableServerPaging) {
      return {
        rows: data.products,
        totalPages: Math.max(1, Math.ceil(data.total / pageSize)),
      };
    }
    // paginate client-side
    const totalPages = Math.max(1, Math.ceil(data.total / pageSize));
    const start = (page - 1) * pageSize;
    const rows = data.products.slice(start, start + pageSize);
    return { rows, totalPages };
  }, [data, page, pageSize, enableServerPaging]);

  return (
    <Stack spacing={2}>
      {/* Toolbar */}
      <Paper sx={{ p: 2 }} elevation={0}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <SearchBar
              value={q}
              onChange={(v) => update({ q: v || undefined })}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <CategoryFilter
              value={category}
              onChange={(v) => update({ category: v || undefined })}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <SortSelect value={sort} onChange={(v) => update({ sort: v })} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <PriceFilter
              min={min}
              max={max}
              onChange={(u) => update({ min: u.min, max: u.max })}
            />
          </Grid>
          <Grid
            size={{ xs: 12, md: 6 }}
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
          >
            <ClearFilters onClick={clearAll} />
          </Grid>
        </Grid>
      </Paper>

      {/* Loading */}
      {isFetching && (
        <Grid container spacing={2}>
          {Array.from({ length: 12 }).map((_, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
              <Skeleton
                variant="rectangular"
                height={260}
                sx={{ borderRadius: 2 }}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Error */}
      {isError && (
        <Box>
          <Typography color="error" variant="body1">
            {(error as Error)?.message ||
              "Something went wrong while fetching products."}
          </Typography>
        </Box>
      )}

      {/* Empty */}
      {!isFetching && !isError && clientPaged.rows.length === 0 && (
        <Box textAlign="center" py={6}>
          <Typography variant="h6">No products match your filters.</Typography>
          <Typography color="text.secondary">
            Try adjusting search or filters.
          </Typography>
        </Box>
      )}

      {/* Grid + Pagination */}
      {!isFetching && !isError && clientPaged.rows.length > 0 && (
        <>
          <Grid container spacing={2}>
            {clientPaged.rows.map((p) => (
              <Grid key={p.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <ProductCard product={p} />
              </Grid>
            ))}
          </Grid>

          <Box display="flex" justifyContent="center" py={2}>
            <Pagination
              count={clientPaged.totalPages}
              page={page}
              onChange={(_, value) => update({ page: value })}
              shape="rounded"
              color="primary"
            />
          </Box>
        </>
      )}
    </Stack>
  );
}
