import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Lock } from 'lucide-react';

interface CheckoutFormData {
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
}

interface CheckoutProps {
  onSubmit: (data: CheckoutFormData) => void;
  total: number;
}

export const Checkout = ({ onSubmit, total }: CheckoutProps) => {
  const [formData, setFormData] = useState<CheckoutFormData>({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
  });

  const [errors, setErrors] = useState<Partial<CheckoutFormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof CheckoutFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<CheckoutFormData> = {};

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email required';
    }
    if (!formData.cardNumber || formData.cardNumber.length < 16) {
      newErrors.cardNumber = 'Valid card number required';
    }
    if (!formData.cardName) {
      newErrors.cardName = 'Cardholder name required';
    }
    if (!formData.expiry || !/^\d{2}\/\d{2}$/.test(formData.expiry)) {
      newErrors.expiry = 'Format: MM/YY';
    }
    if (!formData.cvv || formData.cvv.length < 3) {
      newErrors.cvv = 'CVV required';
    }
    if (!formData.address) {
      newErrors.address = 'Address required';
    }
    if (!formData.city) {
      newErrors.city = 'City required';
    }
    if (!formData.zipCode) {
      newErrors.zipCode = 'ZIP code required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    return parts.length ? parts.join(' ') : value;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
      >
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-semibold text-white">Payment Information</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Card Number
            </label>
            <input
              type="text"
              name="cardNumber"
              value={formatCardNumber(formData.cardNumber)}
              onChange={(e) =>
                handleChange({
                  ...e,
                  target: { ...e.target, value: e.target.value.replace(/\s/g, '') },
                })
              }
              maxLength={19}
              placeholder="1234 5678 9012 3456"
              className={`w-full bg-gray-900/50 border ${
                errors.cardNumber ? 'border-red-500' : 'border-gray-700'
              } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors`}
            />
            {errors.cardNumber && (
              <p className="text-red-400 text-sm mt-1">{errors.cardNumber}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Cardholder Name
            </label>
            <input
              type="text"
              name="cardName"
              value={formData.cardName}
              onChange={handleChange}
              placeholder="John Doe"
              className={`w-full bg-gray-900/50 border ${
                errors.cardName ? 'border-red-500' : 'border-gray-700'
              } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors`}
            />
            {errors.cardName && (
              <p className="text-red-400 text-sm mt-1">{errors.cardName}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                name="expiry"
                value={formData.expiry}
                onChange={handleChange}
                placeholder="MM/YY"
                maxLength={5}
                className={`w-full bg-gray-900/50 border ${
                  errors.expiry ? 'border-red-500' : 'border-gray-700'
                } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors`}
              />
              {errors.expiry && (
                <p className="text-red-400 text-sm mt-1">{errors.expiry}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                CVV
              </label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder="123"
                maxLength={4}
                className={`w-full bg-gray-900/50 border ${
                  errors.cvv ? 'border-red-500' : 'border-gray-700'
                } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors`}
              />
              {errors.cvv && (
                <p className="text-red-400 text-sm mt-1">{errors.cvv}</p>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Billing Information</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={`w-full bg-gray-900/50 border ${
                errors.email ? 'border-red-500' : 'border-gray-700'
              } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors`}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="123 Main St"
              className={`w-full bg-gray-900/50 border ${
                errors.address ? 'border-red-500' : 'border-gray-700'
              } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors`}
            />
            {errors.address && (
              <p className="text-red-400 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="New York"
                className={`w-full bg-gray-900/50 border ${
                  errors.city ? 'border-red-500' : 'border-gray-700'
                } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors`}
              />
              {errors.city && (
                <p className="text-red-400 text-sm mt-1">{errors.city}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                ZIP Code
              </label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                placeholder="10001"
                className={`w-full bg-gray-900/50 border ${
                  errors.zipCode ? 'border-red-500' : 'border-gray-700'
                } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors`}
              />
              {errors.zipCode && (
                <p className="text-red-400 text-sm mt-1">{errors.zipCode}</p>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center justify-center gap-2"
      >
        <Lock className="w-5 h-5" />
        Complete Purchase - ${total.toFixed(2)}
      </motion.button>
    </form>
  );
};
