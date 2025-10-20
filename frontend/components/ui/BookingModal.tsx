"use client";

import { useState } from "react";
import { X, Calendar, MapPin, Users, DollarSign } from "lucide-react";
import { eventsAPI } from "@/lib/api";
import { toast } from "react-hot-toast";

interface BookingModalProps {
  event: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ event, isOpen, onClose }: BookingModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const totalAmount = event.price * quantity;
  const availableSpots = event.capacity - (event.registeredCount || 0);

  const handleBooking = async () => {
    setLoading(true);
    try {
      const response = await eventsAPI.bookEvent(event._id, { quantity });
      
      if (response.data.checkoutUrl) {
        // Redirect to Chapa payment
        window.location.href = response.data.checkoutUrl;
      } else {
        // Free event - booking confirmed
        toast.success("Booking confirmed successfully!");
        onClose();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-muted">
          <h2 className="text-xl font-bold text-primary">Book Event</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent/50 rounded-full"
          >
            <X className="w-5 h-5 text-muted" />
          </button>
        </div>

        {/* Event Info */}
        <div className="p-6 space-y-4">
          <h3 className="text-lg font-semibold text-primary">{event.title}</h3>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-center space-x-2 text-muted">
              <Calendar className="w-4 h-4" />
              <span>{new Date(event.startAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2 text-muted">
              <MapPin className="w-4 h-4" />
              <span>{event.venue}</span>
            </div>
            <div className="flex items-center space-x-2 text-muted">
              <Users className="w-4 h-4" />
              <span>{availableSpots} spots available</span>
            </div>
            <div className="flex items-center space-x-2 text-muted">
              <DollarSign className="w-4 h-4" />
              <span>{event.price === 0 ? "Free" : `${event.price} ETB per ticket`}</span>
            </div>
          </div>

          {/* Quantity Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-primary">
              Number of Tickets
            </label>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-full border border-muted flex items-center justify-center hover:bg-accent/50"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="w-12 text-center font-medium text-primary">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(availableSpots, quantity + 1))}
                className="w-8 h-8 rounded-full border border-muted flex items-center justify-center hover:bg-accent/50"
                disabled={quantity >= availableSpots}
              >
                +
              </button>
            </div>
          </div>

          {/* Total */}
          <div className="bg-accent/10 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium text-primary">Total Amount:</span>
              <span className="text-xl font-bold text-primary">
                {totalAmount === 0 ? "Free" : `${totalAmount} ETB`}
              </span>
            </div>
          </div>

          {/* Book Button */}
          <button
            onClick={handleBooking}
            disabled={loading || availableSpots === 0}
            className="w-full py-3 text-white rounded-lg gradient-primary hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Processing..." : availableSpots === 0 ? "Sold Out" : "Book Now"}
          </button>

          <p className="text-xs text-muted text-center">
            {event.price > 0 
              ? "You will be redirected to Chapa for secure payment"
              : "Your booking will be confirmed immediately"
            }
          </p>
        </div>
      </div>
    </div>
  );
}