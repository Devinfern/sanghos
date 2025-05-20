
export interface EventBooking {
  id: string;
  event_id: string;
  user_id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  attendees: number;
  special_requests?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'refunded';
  total_amount: number;
  payment_intent_id?: string;
  created_at: string;
}

export interface BookingStats {
  total_bookings: number;
  confirmed_bookings: number;
  total_revenue: number;
  available_capacity: number;
}
