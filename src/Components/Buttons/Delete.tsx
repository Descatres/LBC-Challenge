import { useState } from "react";

type DeleteProps = {
    id: string;
    deleteNote: (id: string) => void;
};

function Delete(props: DeleteProps) {
    const [hover, setHover] = useState(false);
    const [active, setActive] = useState(false);

    const baseStyle = {
        backgroundColor: "#F8D7DA",
        borderColor: "#F8D7DA",
        borderRadius: "6px",
        color: "#842029",
        fontSize: "16px",
        lineHeight: "18px",
        fontWeight: 600,
        padding: "10px 16px",
    };

    const hoverStyle = {
        backgroundColor: "#F1AEB5",
        borderColor: "#F1AEB5",
    };

    const activeStyle = {
        backgroundColor: "#EA868F",
        borderColor: "#EA868F",
    };

    return (
        <button
            className="btn btn-danger"
            style={{
                ...baseStyle,
                ...(hover ? hoverStyle : {}),
                ...(active ? activeStyle : {}),
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onMouseDown={() => setActive(true)}
            onMouseUp={() => setActive(false)}
            onClick={() => props.deleteNote(props.id)}
        >
            Excluir
        </button>
    );
}

export default Delete;
