import { ReactNode } from "react"
import SideBar from "../sideBar/sideBar"
import Nav from "../nav/nav"

const PageLayout = ({ children }: { children: ReactNode }) => {
    return (
        // <UserProvider>
            <div className="bg-[#f5f5f5] relative h-screen">
                <Nav />
                <SideBar />
                <div className="content ml-[100px] h-full pt-[70px] mt-0 screen-responsive">
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        // </UserProvider>
    )
}

export default PageLayout
