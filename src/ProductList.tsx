import { motion } from 'framer-motion';
import { ProductCard } from './ProductCard';
import { Product } from './CartContext';
import { Loader2, AlertCircle } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const SkeletonCard = ({ index }: { index: number }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: index * 0.05 }}
    className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700"
  >
    <div className="aspect-square bg-gray-700/50 animate-pulse" />
    <div className="p-5 space-y-3">
      <div className="h-4 bg-gray-700/50 rounded animate-pulse w-1/3" />
      <div className="h-5 bg-gray-700/50 rounded animate-pulse w-3/4" />
      <div className="h-4 bg-gray-700/50 rounded animate-pulse w-full" />
      <div className="h-4 bg-gray-700/50 rounded animate-pulse w-2/3" />
      <div className="flex justify-between items-center pt-2">
        <div className="h-8 bg-gray-700/50 rounded animate-pulse w-1/4" />
        <div className="h-10 w-10 bg-gray-700/50 rounded-lg animate-pulse" />
      </div>
    </div>
  </motion.div>
);

export const ProductList = ({ products, loading, error }: ProductListProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <SkeletonCard key={index} index={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-20"
      >
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h3 className="text-xl font-semibold text-gray-100 mb-2">
          Oops! Something went wrong
        </h3>
        <p className="text-gray-400">{error}</p>
      </motion.div>
    );
  }

  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-20"
      >
        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
          <Loader2 className="w-8 h-8 text-gray-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-100 mb-2">
          No products found
        </h3>
        <p className="text-gray-400">Try adjusting your filters</p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
};
