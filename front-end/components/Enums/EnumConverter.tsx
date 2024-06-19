export const getBookingStatus = (value: number): string => {
    switch (value) {
      case 0:
        return "Pending";
      case 1:
        return "Confirmed";
        case 2:
        return "Rejected";
      default:
        return "";
    }
  };

    
  export function getOrderStatus (value: number): string  {
    switch (value) {
      case 0:
        return "Placed";
      case 1:
        return "Confirmed";
      case 2:
        return "OnTheWay";
      case 3:
        return "Delivered";
      case 4:
        return "StaffRejected";
        case 5:
        return "Rejected";
      default:
        return "";
    }
  };

  export const getPaymentStatus = (value: number | undefined): string | null  => {
    if (typeof value === "undefined") {
      return null;
    }
    switch (value) {
      case 0:
        return "Pending";
      case 1:
        return "Success";
      case 2:
        return "Failed";
      default:
        return "";
    }
  };

  export const getPaymentDoneOrNot = (value: number): string  => {
    switch (value) {
      case 0:
        return "Pending";
      case 1:
        return "Success";
      case 2:
        return "Failed";
      default:
        return "";
    }
  };


  export const getPaymentMode = (value: number | undefined): string | null=> {
    if (typeof value === "undefined") {
      return null;
    }
    switch (value) {
      case 0:
        return "Online";
      case 1:
        return "COD";
      default:
        return "";
    }
  };

  export const getPaymentType = (value: number ): string => {
    switch (value) {
      case 0:
        return "Online";
      case 1:
        return "COD";
      default:
        return "";
    }
  };

  export function convertToLocalDate(dateString: string | undefined): string | null {
    if (typeof dateString === "undefined") {
      return null;
    }
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

 export const getStatusStrings = (status: string) => {
    switch (status) {
      case "0":
        return "Available";
      case "1":
        return "NotAvailable";
      default:
        return "";
    }
  };

  export const getStatusString = (status: number) => {
    switch (status) {
      case 0:
        return "Available";
      case 1:
        return "NotAvailable";
      default:
        return "";
    }
  };

  export const getSubsidyStatus = (value: boolean): string => {
    switch (value) {
        case true:
            return "Yes";
        case false:
            return "No";
        default:
            return "";
    }
};

export const getStatusClass = (status: number) => {
  switch (status) {
    case 0:
      return "bg-green-500"; 
    case 1:
      return "bg-red-500"; 
    default:
      return "";
  }
};

export const getStatusClasss = (status: string) => {
  switch (status) {
    case "0":
      return "bg-green-500"; 
    case "1":
      return "bg-red-500"; 
    default:
      return ""; 
  }
};

export const getConnectionStatus=(value : number) : string =>{
  switch(value){
      case 0:
          return "Pending";
      case 1:
          return "Approved";
      case 2:
          return "Rejected";
      default :
          return "";
  }
};

export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidMobile = (mobile : any) => {
  const re = /^[0-9]{10}$/;
  return re.test(mobile);
};

export const isValidPassword = (password : any) => {
  const re = /^(?=.*[a-z])(?=.*\d).{5,}$/;
  return re.test(password);
};