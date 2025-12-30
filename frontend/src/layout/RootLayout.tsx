import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToHash from "../components/Footer/helper";

function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen  pt-[73px] items-center">
      <Header />
      <ScrollToHash />

      <main className="container bg-white dark:bg-(--darkbg) min-h-[calc(100vh-410px)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default RootLayout;
