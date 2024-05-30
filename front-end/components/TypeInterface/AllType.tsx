export interface Booking {
    bookingDate: string; 
    bookingId: string; 
    consumerName: string; 
    createDate: string; 
    createdBy: string; 
    emailId: string; 
    lpgNo: string; 
    paymentDate: string | null; 
    paymentId: string | null; 
    paymentStatus: number;
    paymentType: number; 
    phoneNumber: string; 
    price: string; 
    product: any | null; 
    productID: string; 
    shippingAddress: string; 
    status: number; 
    updateDate: string; 
  }

  export interface TrackByBookingProps {
    data: Booking;
  }

  export interface Order {
    orderId: string;
    lpgNo: string;
    clientName: string;
    clientContact: string;
    clientEmail: string;
    staffId: string;
    bookingId: string;
    amount: string;
    paymentType: number;
    paymentStatus: number;
    createdBy: string;
    address: string;
    productId: string;
    orderStatus: number;
    isStaffAccepted: boolean | null;
    createDate: string;
    updateDate: string;
    updatedBy: string;
    deliveryDate: string | null;
    staff: any | null;
    booking: Booking;
    orderDate: any;
  }
  
  export interface TrackByOrderProps {
    data: Order;
  }