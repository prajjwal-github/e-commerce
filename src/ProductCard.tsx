import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from './CartContext';
import { useCart } from './CartContext';

interface ProductCardProps {
  product: Product;
  index: number;
}

export const ProductCard = ({ product, index }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group"
    >
      <Link to={`/product/${product.id}`}>
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20">
          <div className="relative aspect-square overflow-hidden bg-gray-900/50">
            <motion.img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute top-3 right-3 bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
              <span className="text-sm font-medium text-white">
                {product.rating.rate}
              </span>
            </div>
          </div>

          <div className="p-5">
            <p className="text-xs text-cyan-400 uppercase tracking-wider font-medium mb-2">
              {product.category}
            </p>
            <h3 className="text-gray-100 font-semibold text-base mb-2 line-clamp-2 min-h-[3rem] group-hover:text-cyan-400 transition-colors">
              {product.title}
            </h3>
            <p className="text-gray-400 text-sm line-clamp-2 mb-4 min-h-[2.5rem]">
              {product.description}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                ${product.price.toFixed(2)}
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-2.5 rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
              >
                <ShoppingCart className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
