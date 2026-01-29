"use client";

import { useState } from "react";
import { updateOrderStatus } from "../../_actions/orders";

export function OrderStatusForm({
  orderId,
  currentStatus,
  currentTrackingNumber,
}: {
  orderId: string;
  currentStatus: string;
  currentTrackingNumber: string;
}) {
  const [status, setStatus] = useState(currentStatus);
  const [trackingNumber, setTrackingNumber] = useState(currentTrackingNumber);
  const [isLoading, setLoading] = useState(false);

  async function handleChange(newStatus: string) {
    setStatus(newStatus);
    setLoading(true);
    await updateOrderStatus(orderId, newStatus, trackingNumber);
    setLoading(false);
  }

  return (
    <>
      <select
        value={status}
        onChange={(e) => handleChange(e.target.value)}
        disabled={isLoading}
      >
        <option value="PROCESSING">Processing</option>
        <option value="SHIPPED">Shipped</option>
        <option value="DELIVERED">Delivered</option>
        <option value="CANCELLED">Cancelled</option>
      </select>
      {status === "SHIPPED" && (
        <input
          type="text"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          onBlur={() => handleChange(status)}
          placeholder="Tracking number"
        />
      )}
    </>
  );
}
