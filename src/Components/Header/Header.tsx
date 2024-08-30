import logo from "../../assets/logo-lbc.svg";
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <div className={"p-0"}>
            <NavLink to="/">
                <img
                    src={logo}
                    alt={"Logo"}
                    className={"img-fluid"}
                    style={{ maxHeight: "4.0625rem" }}
                />
            </NavLink>
        </div>
    );
}

export default Header;
