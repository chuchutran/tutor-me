import { HeaderSimple } from "../components/Header";
import { PATHS } from "../constants/Navigation";
import { Outlet } from "react-router-dom";
import "./RootLayout.css"

const RootLayout = () => (
    <div className="root">
        <HeaderSimple links={PATHS} />
        <div className="content">
            <Outlet />
        </div>
    </div>
);

export default RootLayout;
