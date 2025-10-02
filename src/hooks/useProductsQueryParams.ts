import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export type SortKey = "price-asc" | "price-desc" | "title-asc" | "title-desc";

export function useProductsQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useMemo(() => {
    const q = searchParams.get("q") ?? "";
    const category = searchParams.get("category") ?? "";
    const min = searchParams.get("min")
      ? Number(searchParams.get("min"))
      : undefined;
    const max = searchParams.get("max")
      ? Number(searchParams.get("max"))
      : undefined;
    const sort = (searchParams.get("sort") as SortKey) ?? "price-asc";
    const page = searchParams.get("page")
      ? Math.max(1, Number(searchParams.get("page")))
      : 1;
    const pageSize = searchParams.get("pageSize")
      ? Math.max(1, Number(searchParams.get("pageSize")))
      : 12;

    return { q, category, min, max, sort, page, pageSize };
  }, [searchParams]);

  function update(
    updates: Partial<Record<string, string | number | undefined>>
  ) {
    const next = new URLSearchParams(searchParams);
    for (const [k, v] of Object.entries(updates)) {
      if (v === undefined || v === "" || v === null) next.delete(k);
      else next.set(k, String(v));
    }
    if (Object.keys(updates).some((k) => !["page", "pageSize"].includes(k))) {
      next.set("page", "1");
    }
    setSearchParams(next, { replace: false });
  }

  function clearAll() {
    setSearchParams(new URLSearchParams(), { replace: false });
  }

  return { params, update, clearAll };
}
