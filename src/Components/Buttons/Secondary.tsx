import { useEffect, useState } from "react";

type SecondaryProps = {
    previous?: boolean;
    disabled?: boolean;
    totalPages: number;
    currentPage: number;
    onClick?: () => void;
};
function Secondary(props: SecondaryProps) {
    const [hover, setHover] = useState(false);
    const [active, setActive] = useState(false);
    const [finalStyle, setFinalStyle] = useState({});

    const baseStyle = {
        backgroundColor: "#fff",
        borderColor: "#E9ECEF",
        border: "1px solid #E9ECEF",
        color: "#000000",
        fontSize: "16px",
        fontWeight: 600,
        maxHeight: "40px",
        borderRadius: "4px",
    };

    const disabledStyle = {
        backgroundColor: "#fff",
        borderColor: "#E9ECEF",
        border: "1px solid #E9ECEF",
        color: "#ADB5BD",
        maxHeight: "40px",
        borderRadius: "4px",
    };

    const hoverStyle = {
        backgroundColor: "#E9ECEF",
        borderColor: "#E9ECEF",
    };

    const activeStyle = {
        backgroundColor: "#fff",
        borderColor: "#E9ECEF",
    };
    useEffect(() => {
        if (props.disabled) {
            setFinalStyle(disabledStyle);
        } else {
            setFinalStyle(baseStyle);
        }
    }, [props.disabled]);

    return (
        <button
            className="btn btn-primary"
            style={{
                ...finalStyle,
                pointerEvents: props.disabled ? "none" : "auto",
                ...(hover ? hoverStyle : {}),
                ...(active ? activeStyle : {}),
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onMouseDown={() => setActive(true)}
            onMouseUp={() => setActive(false)}
            onClick={props.onClick}
        >
            {props.previous ? "Anterior" : "Seguinte"}
        </button>
    );
}

export default Secondary;
