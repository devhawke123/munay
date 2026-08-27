import { ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useProductsApi } from "../../hooks/useProductsApi";
import { apiProductToProduct } from "../../types/product";

export function BestSellers() {
  const { data } = useProductsApi();
  const topProducts = [...(data ?? [])]
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 3)
    .map(apiProductToProduct);

  return (
    <div className="bg-white border border-brand-border rounded-[14px] p-6 shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-display font-bold text-text-primary tracking-tight">Best Sellers</h3>
        <Link
          to="/admin/products"
          className="text-xs font-display font-semibold text-brand-accent"
        >
          All →
        </Link>
      </div>

      {/* List */}
      <div className="flex flex-col gap-4">
        {topProducts.length === 0 && (
          <p className="text-[11.5px] text-text-muted">No products yet.</p>
        )}
        {topProducts.map((product, index) => (
          <Link
            key={product.id}
            to={`/admin/products/${product.id}`}
            className="flex items-start gap-2.5"
          >
            <div className="relative w-[30px] h-[29px] rounded-[3px] bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
              {product.images?.[0] ? (
                <img
                  src={product.images[0].url}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <ImageIcon size={13} className="text-text-muted" />
              )}
              <div className="absolute -top-1.5 -left-1.5 w-4 h-4 rounded-lg bg-gradient-to-br from-brand-accent to-brand flex items-center justify-center">
                <span className="text-[8px] font-display font-extrabold text-white">#{index + 1}</span>
              </div>
            </div>
            <div>
              <p className="text-[11.5px] font-display font-medium text-text-primary leading-tight">
                {product.name}
              </p>
              <p className="text-[10.5px] text-text-muted mt-0.5">{product.sold} sold</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
