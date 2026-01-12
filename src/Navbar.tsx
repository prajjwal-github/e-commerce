import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, User, LogOut, Zap } from 'lucide-react';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';

export const Navbar = () => {
  const { getCartItemsCount } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();
  const cartCount = getCartItemsCount();

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-lg border-b border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <Zap className="w-8 h-8 text-cyan-400" fill="currentColor" />
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              NEOTECH
            </span>
          </Link>

          <div className="flex items-center space-x-8">
            <Link to="/">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className={`text-sm font-medium transition-colors ${
                  isActive('/')
                    ? 'text-cyan-400'
                    : 'text-gray-300 hover:text-cyan-400'
                }`}
              >
                Home
              </motion.span>
            </Link>

            {user && (
              <div className="flex items-center space-x-2 text-gray-300">
                <User className="w-4 h-4" />
                <span className="text-sm">{user.name}</span>
              </div>
            )}

            <Link to="/cart">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <ShoppingCart
                  className={`w-6 h-6 ${
                    isActive('/cart') ? 'text-cyan-400' : 'text-gray-300'
                  } hover:text-cyan-400 transition-colors`}
                />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </motion.div>
            </Link>

            {user ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="flex items-center space-x-1 text-gray-300 hover:text-red-400 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </motion.button>
            ) : (
              <Link to="/checkout">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-shadow"
                >
                  Sign In
                </motion.button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
