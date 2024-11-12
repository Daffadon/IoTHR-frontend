import React from "react"
import DoctorSidebar from "../appbar/DoctorSidebar"
import { ToastContainer } from "react-toastify"

const DoctorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full min-h-screen">
      <DoctorSidebar />
      <div className="w-5/6 min-h-[100vh] relative">{children}</div>
      <ToastContainer className="z-10" />
    </div>
  )
}

export default DoctorLayout