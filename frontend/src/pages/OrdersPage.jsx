import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../features/order/orderThunks';

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  return (
    <div className="p-6 md:ml-80">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {loading ? <p>Loading...</p> : error ? <p className="text-red-500">{error}</p> :
        orders.map(order => (
          <div key={order._id} className="border p-4 rounded mb-2">
            <p><strong>Gig:</strong> {order.gig?.title}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Amount:</strong> ₹{order.amount}</p>
          </div>
        ))
      }
    </div>
  );
};

export default OrdersPage;
