export const metadata = {
  title: "Echo-Pellets",
  description: "Developed By Moon",
};
import DashboardSidebar from "../components/DashboardSidebar";
import "../globals.css"
export default function RootLayout({ children }) {
  
 return (
    <html lang="en">
      <body>
        <div className="flex">
          <div className="w-[20%] ">
            <DashboardSidebar/>
          </div>
          <div className="w-[80%]">{children}</div>
        </div>
      </body>
    </html>
  )
}
