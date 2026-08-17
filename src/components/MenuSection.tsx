import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, ChevronUp, MessageCircle, X } from 'lucide-react';
import { menu, categories } from '@/data/menu';
import type { Product } from '@/types';
import { useBranch } from '@/context/BranchContext';
import { generateWhatsAppOrder, openWhatsApp, formatPrice } from '@/utils/whatsapp';
import ProductModal from './ProductModal';

function ProductCard({ product, onSelect }: { product: Product; onSelect: () => void }) {
  const { selectedBranch } = useBranch();

  const displayPrice =
    product.price !== null
      ? formatPrice(product.price)
      : product.priceOptions
        ? `Rs. ${product.priceOptions[0].price.toLocaleString('en-PK')}+`
        : '';

  const quickOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.variants || product.priceOptions) {
      onSelect();
    } else {
      const unitPrice = product.price ?? 0;
      const url = generateWhatsAppOrder(
        product,
        { quantity: 1, price: unitPrice },
        selectedBranch,
      );
      openWhatsApp(url);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      onClick={onSelect}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/5 bg-ink-900/60 transition-all duration-300 hover:border-primary-500/30 hover:bg-ink-900/90"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).style.opacity = '0.3';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-transparent" />
        {product.popular && (
          <span className="absolute left-3 top-3 rounded-full bg-primary-500/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-ink-950">
            Popular
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-bold text-ink-50">{product.name}</h3>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-ink-400">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <span className="text-sm font-bold text-primary-400">{displayPrice}</span>
          <button
            onClick={quickOrder}
            className="flex items-center gap-1.5 rounded-full bg-primary-500/15 px-3 py-1.5 text-xs font-semibold text-primary-400 transition-all hover:bg-primary-500 hover:text-ink-950 active:scale-95"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            Order
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    let items = menu;
    if (activeCategory !== 'ALL') {
      items = items.filter((p) => p.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      );
    }
    return items;
  }, [activeCategory, search]);

  // 3 rows preview: cardsPerRow depends on breakpoints.
  // On desktop 4 per row → 12 items; tablet 3 → 9; mobile 2 → 6; small mobile 1 → 3.
  // We use 9 as a safe "3 rows" default that works across all.
  const PREVIEW_COUNT = 9;
  const visible = expanded ? filtered : filtered.slice(0, PREVIEW_COUNT);
  const canExpand = filtered.length > PREVIEW_COUNT;

  return (
    <section id="menu" className="relative py-20 sm:py-28">
      <div className="container-x">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-label">Our Menu</span>
          <h2 className="mt-3 text-3xl font-bold text-ink-50 sm:text-4xl lg:text-5xl">
            Explore Our Cravings
          </h2>
          <p className="mt-3 text-sm text-ink-400 sm:text-base">
            From cheesy pizzas to juicy burgers — find your favorite and order on WhatsApp.
          </p>
        </div>

        {/* Search */}
        <div className="mx-auto mt-8 max-w-md">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setExpanded(false);
              }}
              placeholder="Search pizzas, burgers, pastas..."
              className="w-full rounded-full border border-white/10 bg-ink-900/60 py-3 pl-11 pr-10 text-sm text-ink-100 placeholder-ink-500 outline-none transition-colors focus:border-primary-500/40 focus:bg-ink-900"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-100"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category filters - sticky */}
        <div className=" radius sticky top-16 z-30 -mx-4 mt-6 border-y border-white/5 bg-ink-900/95 px-4   py-2 shadow-lg backdrop-blur-md sm:top-20">
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setExpanded(false);
                }}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-primary-500 text-ink-950'
                    : 'border border-white/10 bg-ink-900/60 text-ink-200 hover:border-primary-500/30 hover:text-primary-400'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={() => setSelectedProduct(product)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-ink-400">No items found. Try a different search or category.</p>
          </div>
        )}

        {/* View All / Show Less */}
        {canExpand && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setExpanded((v) => !v)}
              className="btn-secondary"
            >
              {expanded ? (
                <>
                  <ChevronUp className="h-4 w-4" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" />
                  View All ({filtered.length})
                </>
              )}
            </button>
          </div>
        )}
      </div>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  );
}
