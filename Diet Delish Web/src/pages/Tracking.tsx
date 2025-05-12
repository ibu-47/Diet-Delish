import { useState, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { supabase } from '../lib/supabase';
import { PackageCheck, PackageOpen, Truck, Package, MapPin, CalendarCheck, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

type Order = {
  id: string;
  order_number: string;
  status: 'processing' | 'shipped' | 'out_for_delivery' | 'delivered';
  estimated_delivery: string;
  delivery_address: string;
  delivery_partner: string;
  tracking_events: {
    timestamp: string;
    status: string;
    location: string;
  }[];
};

function Tracking() {
  const { user } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Sample orders data (would be fetched from Supabase in a real implementation)
  const sampleOrders: Order[] = [
    {
      id: '1',
      order_number: '#123456789',
      status: 'out_for_delivery',
      estimated_delivery: 'April 18, 2025',
      delivery_address: 'John Doe, 123 Green Street, Eco City, GA 12345, United States',
      delivery_partner: 'GreenExpress Logistics',
      tracking_events: [
        {
          timestamp: '2025-04-14 08:30:00',
          status: 'Order Confirmed',
          location: 'DietDelish Fulfillment Center'
        },
        {
          timestamp: '2025-04-15 10:15:00',
          status: 'Prepared & Packed',
          location: 'DietDelish Fulfillment Center'
        },
        {
          timestamp: '2025-04-16 12:45:00',
          status: 'Shipped',
          location: 'Distribution Center'
        },
        {
          timestamp: '2025-04-17 09:20:00',
          status: 'Out for Delivery',
          location: 'Local Delivery Hub'
        }
      ]
    },
    {
      id: '2',
      order_number: '#987654321',
      status: 'shipped',
      estimated_delivery: 'April 20, 2025',
      delivery_address: 'John Doe, 123 Green Street, Eco City, GA 12345, United States',
      delivery_partner: 'GreenExpress Logistics',
      tracking_events: [
        {
          timestamp: '2025-04-16 09:30:00',
          status: 'Order Confirmed',
          location: 'DietDelish Fulfillment Center'
        },
        {
          timestamp: '2025-04-17 11:20:00',
          status: 'Prepared & Packed',
          location: 'DietDelish Fulfillment Center'
        },
        {
          timestamp: '2025-04-18 13:15:00',
          status: 'Shipped',
          location: 'Distribution Center'
        }
      ]
    }
  ];

  useEffect(() => {
    // In a real app, this would fetch from Supabase based on the user ID
    setTimeout(() => {
      setOrders(sampleOrders);
      setSelectedOrder(sampleOrders[0]);
      setIsLoading(false);
    }, 1000);
  }, [user]);

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return <PackageOpen className="text-yellow-500" />;
      case 'shipped':
        return <Package className="text-blue-500" />;
      case 'out_for_delivery':
        return <Truck className="text-brand-500" />;
      case 'delivered':
        return <PackageCheck className="text-green-500" />;
      default:
        return <Package />;
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return 'Processing';
      case 'shipped':
        return 'Shipped';
      case 'out_for_delivery':
        return 'Out for Delivery';
      case 'delivered':
        return 'Delivered';
      default:
        return status;
    }
  };

  const getStatusClass = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'out_for_delivery':
        return 'bg-brand-100 text-brand-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Order Tracking</h1>
        <p className="text-gray-600 text-center">Monitor your meal plan deliveries in real-time.</p>
      </motion.div>

      {orders.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Order list */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedOrder?.id === order.id
                        ? 'border-brand-500 bg-brand-50'
                        : 'border-gray-200 hover:border-brand-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{order.order_number}</span>
                      <span className={`text-xs font-medium py-1 px-2 rounded-full ${getStatusClass(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </div>
                    <div className="flex items-center mt-2 text-sm text-gray-600">
                      <Calendar size={16} className="mr-2" />
                      <span>Expected: {order.estimated_delivery}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order details */}
          {selectedOrder && (
            <div className="lg:w-2/3">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-semibold">{selectedOrder.order_number}</h2>
                    <p className="text-gray-600 text-sm mt-1">
                      Estimated delivery: {selectedOrder.estimated_delivery}
                    </p>
                  </div>
                  <span className={`text-sm font-medium py-1 px-3 rounded-full flex items-center ${getStatusClass(selectedOrder.status)}`}>
                    {getStatusIcon(selectedOrder.status)}
                    <span className="ml-2">{getStatusText(selectedOrder.status)}</span>
                  </span>
                </div>

                {/* Shipping information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start">
                      <MapPin className="text-gray-500 mt-1 mr-2 flex-shrink-0" size={18} />
                      <div>
                        <h3 className="font-medium text-gray-800 mb-1">Shipping Address</h3>
                        <p className="text-gray-600 text-sm">
                          {selectedOrder.delivery_address}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start">
                      <Truck className="text-gray-500 mt-1 mr-2 flex-shrink-0" size={18} />
                      <div>
                        <h3 className="font-medium text-gray-800 mb-1">Delivery Partner</h3>
                        <p className="text-gray-600 text-sm">
                          {selectedOrder.delivery_partner}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tracking timeline */}
                <h3 className="font-semibold text-gray-800 mb-4">Tracking History</h3>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                  <div className="space-y-6">
                    {selectedOrder.tracking_events.map((event, index) => (
                      <motion.div 
                        key={index} 
                        className="flex relative"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div className="bg-white border border-brand-500 rounded-full w-8 h-8 flex items-center justify-center z-10">
                          <div className="bg-brand-500 rounded-full w-4 h-4"></div>
                        </div>
                        <div className="ml-6">
                          <div className="font-medium">{event.status}</div>
                          <div className="text-sm text-gray-600">{event.location}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {new Date(event.timestamp).toLocaleString()}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <div className="inline-block p-6 bg-gray-100 rounded-full mb-4">
            <Package size={48} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No orders found</h3>
          <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
          <a href="/plans" className="btn-primary inline-block">
            Browse Meal Plans
          </a>
        </div>
      )}
    </div>
  );
}

export default Tracking;