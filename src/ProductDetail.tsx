import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, ArrowLeft, Loader2, Tag, Package } from 'lucide-react';
import { fetchProductById } from './api';
import { Product, useCart } from './CartContext';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await fetchProductById(parseInt(id));
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Loader2 className="w-12 h-12 text-cyan-400" />
        </motion.div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-xl mb-4">{error || 'Product not found'}</p>
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium"
            >
              Back to Home
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <Link to="/">
          <motion.button
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Products
          </motion.button>
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 flex items-center justify-center"
          >
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              src={product.image}
              alt={product.title}
              className="w-full max-w-md object-contain"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Tag className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-400 uppercase tracking-wider font-medium">
                {product.category}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-white mb-4">{product.title}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating.rate)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-400">
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>

            <p className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6">
              ${product.price.toFixed(2)}
            </p>

            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="flex items-center gap-2 text-green-400 mb-8">
              <Package className="w-5 h-5" />
              <span className="font-medium">In Stock - Ready to Ship</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center justify-center gap-3"
            >
              <ShoppingCart className="w-6 h-6" />
              {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
            </motion.button>

            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-700">
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-1">Free Shipping</p>
                <p className="text-white font-semibold">On all orders</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-1">Warranty</p>
                <p className="text-white font-semibold">1 Year</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-1">Returns</p>
                <p className="text-white font-semibold">30 Days</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
