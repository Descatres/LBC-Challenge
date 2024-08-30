import { useEffect, useState } from "react";

type PrimaryProps = {
    page?: number;
    info?: boolean;
    onClick?: () => void;
};
function Primary(props: PrimaryProps) {
    const [hover, setHover] = useState(false);
    const [active, setActive] = useState(false);
    const [finalStyle, setFinalStyle] = useState({});

    const baseStyle = {
        backgroundColor: "#067B95",
        borderColor: "#067B95",
        borderRadius: "6px",
        border: "1px",
        color: "#fff",
        fontWeight: 600,
        fontSize: "16px",
        lineHeight: "18px",
        // maxHeight: "38px",
        // minWidth: "159px",
        padding: "10px 16px",
        display: "flex",
        alignItems: "center",
        whiteSpace: "nowrap",
    };

    const infoStyle = {
        backgroundColor: "#067B95",
        borderColor: "#067B95",
        borderRadius: "4px",
        border: "1px",
        color: "#fff",
        fontSize: "16px",
        lineHeight: "16px",
        fontWeight: 600,
        padding: "12px 16px",
    };

    const hoverStyle = {
        backgroundColor: "#0A8FA1",
        borderColor: "#0A8FA1",
    };

    const activeStyle = {
        backgroundColor: "#067B95",
        borderColor: "#067B95",
    };

    useEffect(() => {
        if (props.info) {
            setFinalStyle(infoStyle);
        } else {
            setFinalStyle(baseStyle);
        }
    }, [props.info]);

    return (
        <button
            className="btn btn-primary"
            style={{
                ...finalStyle,
                pointerEvents: props.info ? "none" : "auto",
                ...(hover ? hoverStyle : {}),
                ...(active ? activeStyle : {}),
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onMouseDown={() => setActive(true)}
            onMouseUp={() => setActive(false)}
            onClick={props?.onClick}
        >
            {props.info ? props.page : "Adicionar Tarefa"}
        </button>
    );
}

export default Primary;
