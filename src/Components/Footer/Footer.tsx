import { useState } from "react";
import logo from "../../assets/logo-lbc.svg";

function Footer() {
    const appliant = "João Catré";
    const [text, _] = useState("Exercício desenvolvido por: ");

    return (
        <div
            className={"d-flex flex-row p-0 align-items-center"}
            style={{ gap: "2rem" }}
        >
            <img
                src={logo}
                alt="Logo"
                className={"img-fluid"}
                style={{ height: "2rem" }}
            />
            <p className={"text-center mb-0"}>
                {text} {appliant}
            </p>
        </div>
    );
}

export default Footer;
