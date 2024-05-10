'use client';
import Sidebar from "../../components/Sidebar";
import Dashboard from "./Dashboard/page";
import ContactUs from "@/components/ContactUs";


const Customer=()=>{
    return(
        <Sidebar>
            <Dashboard/>
        </Sidebar>
    );
}

export default Customer;