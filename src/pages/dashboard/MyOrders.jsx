import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Hourglass,
  Check,
  Cog,
  Truck,
  X,
  Package,
  User,
  Briefcase,
  Wallet,
  MessageCircle,
} from "lucide-react";

export default function MyOrders() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
    confirmed: "bg-blue-100 text-blue-800 border-blue-300",
    processing: "bg-purple-100 text-purple-800 border-purple-300",
    shipped: "bg-indigo-100 text-indigo-800 border-indigo-300",
    delivered: "bg-green-100 text-green-800 border-green-300",
    cancelled: "bg-red-100 text-red-800 border-red-300",
  };

  const statusIcons = {
    pending: <Hourglass className="w-4 h-4" />,
    confirmed: <Check className="w-4 h-4" />,
    processing: <Cog className="w-4 h-4" />,
    shipped: <Truck className="w-4 h-4" />,
    delivered: <Check className="w-4 h-4" />,
    cancelled: <X className="w-4 h-4" />,
  };

  const statusDescriptions = {
    pending: "Your order is awaiting confirmation",
    confirmed: "Order confirmed! We're preparing your card",
    processing: "Your card is being manufactured",
    shipped: "Your card is on its way!",
    delivered: "Your card has been delivered",
    cancelled: "This order was cancelled",
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/orders/my-orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (data.success) {
        setOrders(data.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-brand-dark">My Orders</h1>
          <p className="text-gray-600 mt-1">Track your NFC card orders</p>
        </div>
        <button
          onClick={() => navigate("/dashboard/cart")}
          className="btn-primary whitespace-nowrap"
        >
          + Order New Card
        </button>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <Package className="w-12 h-12 text-gray-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No orders yet
          </h3>
          <p className="text-gray-600 mb-6">
            You haven't ordered any NFC cards yet. Get started by creating your
            first card!
          </p>
          <button
            onClick={() => navigate("/dashboard/cart")}
            className="btn-primary"
          >
            Order Your First Card
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100 hover:border-brand-primary/30 transition-all"
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">
                        Order #{order.orderNumber}
                      </h3>
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${
                          statusColors[order.orderStatus]
                        }`}
                      >
                        {statusIcons[order.orderStatus]} {order.orderStatus}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {statusDescriptions[order.orderStatus]}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Order Date</p>
                    <p className="text-base font-semibold text-gray-900">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl">
                  {/* Card Info */}
                  <div className="flex items-center gap-3">
                    {order.profile?.avatarUrl ? (
                      <img
                        src={order.profile.avatarUrl}
                        alt={order.profile.name}
                        className="w-12 h-12 rounded-lg object-cover border-2 border-white shadow-sm"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-brand-primary/10 border-2 border-brand-primary/20 flex items-center justify-center">
                        {order.cardType === "personal" ? (
                          <User className="w-5 h-5 text-brand-primary" />
                        ) : (
                          <Briefcase className="w-5 h-5 text-brand-primary" />
                        )}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {order.profile?.name || "NFC Card"}
                      </p>
                      <p className="text-xs text-gray-600">
                        {order.cardType === "personal"
                          ? "Personal Card"
                          : "Business Card"}
                      </p>
                    </div>
                  </div>

                  {/* Shipping Info */}
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Ship to:</p>
                    <p className="text-sm font-medium text-gray-900">
                      {order.shippingCity}, {order.shippingCountry}
                    </p>
                    <p className="text-xs text-gray-600 truncate">
                      {order.shippingAddress}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="text-xs text-gray-600 mb-1">Total</p>
                    <p className="text-2xl font-bold text-brand-primary">
                      {order.totalAmount} JOD
                    </p>
                  </div>
                </div>

                {/* Order Timeline */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-xs">
                    <div
                      className={`flex items-center gap-1 ${
                        [
                          "pending",
                          "confirmed",
                          "processing",
                          "shipped",
                          "delivered",
                        ].includes(order.orderStatus)
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      <div className="w-2 h-2 rounded-full bg-current"></div>
                      <span>Ordered</span>
                    </div>
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <div
                      className={`flex items-center gap-1 ${
                        [
                          "confirmed",
                          "processing",
                          "shipped",
                          "delivered",
                        ].includes(order.orderStatus)
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      <div className="w-2 h-2 rounded-full bg-current"></div>
                      <span>Confirmed</span>
                    </div>
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <div
                      className={`flex items-center gap-1 ${
                        ["processing", "shipped", "delivered"].includes(
                          order.orderStatus
                        )
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      <div className="w-2 h-2 rounded-full bg-current"></div>
                      <span>Processing</span>
                    </div>
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <div
                      className={`flex items-center gap-1 ${
                        ["shipped", "delivered"].includes(order.orderStatus)
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      <div className="w-2 h-2 rounded-full bg-current"></div>
                      <span>Shipped</span>
                    </div>
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <div
                      className={`flex items-center gap-1 ${
                        order.orderStatus === "delivered"
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      <div className="w-2 h-2 rounded-full bg-current"></div>
                      <span>Delivered</span>
                    </div>
                  </div>
                </div>

                {/* Delivery Dates */}
                {(order.shippedAt || order.deliveredAt) && (
                  <div className="mt-3 flex gap-4 text-xs text-gray-600">
                    {order.shippedAt && (
                      <p>
                        Shipped on:{" "}
                        {new Date(order.shippedAt).toLocaleDateString()}
                      </p>
                    )}
                    {order.deliveredAt && (
                      <p>
                        Delivered on:{" "}
                        {new Date(order.deliveredAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Payment Method Footer */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-3 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Wallet className="w-4 h-4" />
                    <span>Payment: Cash on Delivery</span>
                  </div>
                  {order.orderStatus === "delivered" && (
                    <span className="text-green-600 font-medium">
                      <Check className="inline w-4 h-4 mr-1" />
                      Completed
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Help Section */}
      {orders.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-7 h-7 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Need help with your order?
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                If you have any questions about your order or need to make
                changes, please contact our support team.
              </p>
              <button className="text-sm font-medium text-brand-primary hover:text-brand-primary/80 transition-colors">
                Contact Support →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
