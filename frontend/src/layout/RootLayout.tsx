import { Outlet } from "react-router-dom";
import Header from "./Header";


function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen w-screen">
      
        <Header />
      
      <main className="container">
        <Outlet />
      </main>
      <div className="container">//FOOTER WILL GO HERE</div>
    </div>
  );
}

export default RootLayout;
