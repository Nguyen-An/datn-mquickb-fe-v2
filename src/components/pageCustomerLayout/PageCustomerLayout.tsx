import { ReactNode } from "react"
import CustomerLayoutHeader from "../header/CustomerLayoutHeader"

const PageCustomerLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="bg-[#000816] relative h-screen">
            <CustomerLayoutHeader />
            <div className="flex items-start justify-center h-screen">
                <div className="w-[400px] ">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default PageCustomerLayout
