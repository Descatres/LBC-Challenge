import { useState } from "react";
import { Note } from "../../types/Note";
import { Delete } from "../Buttons";

type TableProps = {
    notes: Note[];
    notesShown: number;
    totalPages: number;
    currentPage: number;
    deleteNote: (id: string) => void;
    toggleComplete: (id: string) => void;
};

function Table(props: TableProps) {
    // creates unique key val pair for each note to toggle checkbox color from white to "#067B95"
    const [checkedStates, setCheckedStates] = useState<Record<string, boolean>>(
        () =>
            props.notes.reduce((acc, note) => {
                acc[note.id] = note.completed;
                return acc;
            }, {} as Record<string, boolean>)
    );

    const handleCheckboxChange = (id: string) => {
        props.toggleComplete(id);

        setCheckedStates((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    const sortedNotes = [...props.notes].sort((a, b) => {
        return parseInt(b.id) - parseInt(a.id);
    });

    const incompleteNotes = sortedNotes.filter((note) => !note.completed);
    const completedNotes = sortedNotes.filter((note) => note.completed);

    const notesToDisplay = [...incompleteNotes, ...completedNotes];

    const startIndex = (props.currentPage - 1) * props.notesShown;
    const endIndex = Math.min(
        startIndex + props.notesShown,
        notesToDisplay.length
    );

    const recentNotes = notesToDisplay.slice(startIndex, endIndex);

    return (
        <>
            {recentNotes.map((note) => (
                <table className="d-flex flex-column gap-2" key={note.id}>
                    <tr
                        className="d-flex flex-row align-items-center"
                        style={{ marginTop: "-8px" }}
                    >
                        <td
                            className="d-flex align-items-center m-0"
                            style={{
                                width: "60%",
                            }}
                        >
                            <div
                                className="d-flex align-items-center m-0 gap-2"
                                style={{
                                    width: "90%",
                                }}
                            >
                                <input
                                    type="checkbox"
                                    id="customCheckbox"
                                    className="form-check-input m-0"
                                    checked={note.completed}
                                    onChange={() => {
                                        handleCheckboxChange(note.id);
                                    }}
                                    style={{
                                        width: "16px",
                                        height: "16px",
                                        borderRadius: "2px",
                                        border: "1px solid #ABB5BE",
                                        backgroundColor: checkedStates[note.id]
                                            ? "#067B95"
                                            : "white",
                                    }}
                                />
                                <label
                                    htmlFor="customCheckbox  m-0"
                                    style={{
                                        fontSize: "16px",
                                        maxHeight: "50px",
                                        fontWeight: 400,
                                        // lineHeight: "28px",
                                        textDecoration: note.completed
                                            ? "line-through"
                                            : "none",
                                        overflow: "scroll",
                                        scrollbarWidth: "none",
                                        msOverflowStyle: "none",
                                    }}
                                >
                                    {note.text}
                                </label>
                                {note.completed && (
                                    <span
                                        className="badge"
                                        style={{
                                            padding: "4px 8px",
                                            borderRadius: "12px",
                                            backgroundColor: "#28A745",
                                            color: "white",
                                            fontSize: "10px",
                                            fontWeight: 600,
                                            lineHeight: "1",
                                        }}
                                    >
                                        Concluída
                                    </span>
                                )}
                            </div>
                        </td>
                        <td
                            className="d-flex align-items-center m-0"
                            style={{
                                width: "25.4%",
                            }}
                        >
                            <p className="m-0">{note.lastUpdate}</p>
                        </td>
                        <td>
                            <Delete
                                id={note.id}
                                deleteNote={props.deleteNote}
                            />
                        </td>
                    </tr>
                    <hr
                        style={{
                            borderColor: "#DEE2E6",
                            borderWidth: "1px",
                            marginTop: 0,
                            marginBottom: 0,
                            padding: 0,
                            width: "100%",
                        }}
                    />
                </table>
            ))}
        </>
    );
}

export default Table;
