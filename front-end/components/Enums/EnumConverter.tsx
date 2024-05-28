export const getBookingStatus = (value: number): string => {
    switch (value) {
      case 0:
        return "Pending";
      case 1:
        return "Confirmed";
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
        return "On The Way";
      case 3:
        return "Delivered";
      case 4:
        return "Staff Rejected";
        case 5:
        return "Rejected";
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

