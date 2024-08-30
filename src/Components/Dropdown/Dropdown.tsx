type DropdownProps = {
    notesShown?: number;
    setNotesShown: (notesShown: number) => void;
};

function Dropdown(props: DropdownProps) {
    const baseStyle = {
        backgroundColor: "#fff",
        borderColor: "#E9ECEF",
        border: "1px solid #E9ECEF",
        color: "#495057",
        fontSize: "16px",
        lineHeight: "16px",
        fontWeight: 400,
        maxHeight: "40px",
        // width: "66px",
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        borderRadius: "4px",
    };

    const showFourNotes = () => {
        props.setNotesShown(2);
    };

    const showEightNotes = () => {
        props.setNotesShown(3);
    };

    const showSixteenNotes = () => {
        props.setNotesShown(4);
    };

    return (
        <div className="dropdown">
            <button
                className="btn btn-secondary dropdown-toggle m-0"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                    ...baseStyle,
                }}
            >
                {props.notesShown}
            </button>
            <ul className="dropdown-menu">
                <li>
                    <button className="dropdown-item" onClick={showFourNotes}>
                        2
                    </button>
                </li>
                <li>
                    <button className="dropdown-item" onClick={showEightNotes}>
                        3
                    </button>
                </li>
                <li>
                    <button
                        className="dropdown-item"
                        onClick={showSixteenNotes}
                    >
                        4
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default Dropdown;
