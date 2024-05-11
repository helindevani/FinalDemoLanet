"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "@/components/Sidebar";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const ConnectionDetails: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [apiResponse, setApiResponse] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      console.error("JWT token not found");
      return;
    }

    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const userId = decodedToken ? decodedToken.sub : null;
    setUserId(userId);
  }, []);

  console.log(userId);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5057/api/User/AppliedNewConnection/${userId}`
        );


        if (response.data.status == "Pending") {
          const confirmed = window.confirm(`Your LPG No Is ${response.data.lpgNo} In Pending State!!` );
          if (confirmed) {
            router.push("/customer/Dashboard");
          }
        }
        if (response.data.status == "Rejected") {
          const confirmed = window.confirm(`Your LPG No Is ${response.data.lpgNo} In Rejected State Please Applied New Connection!!` );
          if (confirmed) {
            router.push("/customer/NewConnection");
          }
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId, router]);

  return (
    <Sidebar>
      {isLoading && <div>Loading...</div>}
      {!isLoading && apiResponse === "Success" && (
        <div>{/* Add your UI or logic for handling Success response */}</div>
      )}
    </Sidebar>
  );
};

export default ConnectionDetails;
