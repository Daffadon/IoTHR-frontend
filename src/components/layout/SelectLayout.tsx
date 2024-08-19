import { ReactNode } from "react"
import { useUserContext } from "../../context/userContext"
import UserLayout from "./UserLayout"
import DoctorLayout from "./DoctorLayout"

const SelectLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useUserContext()
  if (user?.role === 'user') {
    return (
      <UserLayout>
        {children}
      </UserLayout>
    )
  } else {
    return (
      <DoctorLayout>
        {children}
      </DoctorLayout>
    )
  }
}

export default SelectLayout