import { ReactNode } from "react";

export interface HeaderProps {
  children?: ReactNode;
}

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

  export interface RootState {
    auth: AuthState;
  }
  
  export interface AuthState {
    token: string | null;
    error: string | null;
    loading: boolean;
    status: string;
  }
  
  export interface LayoutProps {
    children: ReactNode;
  }

  export interface ConnectionDetails {
    lpgNo: string;
    firstName: string;
    lastName: string;
    gender: string;
    maritalStatus: string;
    dob: string;
    nationality: string;
    relatedType: number;
    relatedFirstName: string;
    relatedLastName: string;
    address: string;
    district: string;
    state: string;
    pinCode: string;
    productId: string;
    product: {
      productId: string;
      productName: string;
      productImage: string;
      brandId: string;
      brand: {
        brandId: string;
        brandName: string;
        brandStatus: number;
        createDate: string;
        updateDate: string;
        createdBy: string;
      };
      categoryId: string;
      category: any; // Adjust type according to your data structure
      quantity: string;
      unitPrice: string;
      status: number;
      createDate: string;
      updateDate: string;
      createdBy: string;
    };
    emailId: string;
    phoneNumber: string;
    poiName: string;
    poiNo: string;
    poi: string;
    poaName: string;
    poaNo: string;
    poa: string;
    photoGraph: string;
    isPNG: boolean;
    isGovScheme: boolean;
    aadharCardNo: string;
    rationState: string;
    rationCardNumber: string;
    isDeclarationAccept: boolean;
    status: number;
    createdDate: string;
    updateDate: string;
    userId: string;
  }
  