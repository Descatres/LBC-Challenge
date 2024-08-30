import { useEffect, useState } from "react";
import { Primary } from "../Buttons";
import { Secondary } from "../Buttons";
import { Dropdown } from "../Dropdown";
import Table from "./Table";
import { Note } from "../../types/Note";

type NotesTableProps = {
    notes: Note[];
    tasksCount: number;
    addNote: (noteText: string) => void;
    toggleComplete: (id: string) => void;
    deleteNote: (id: string) => void;
    handleToast: (actionType: "added" | "completed" | "deleted" | null) => void;
};

function NotesTable(props: NotesTableProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [disabledP, setDisabledP] = useState(totalPages > 1);
    const [disabledN, setDisabledN] = useState(totalPages > 1);
    const [notesShown, setNotesShown] = useState(4);
    const [newNoteText, setNewNoteText] = useState<string>("");

    useEffect(() => {
        setTotalPages(Math.ceil(props.notes.length / notesShown));
    }, [props.notes, notesShown]);

    useEffect(() => {
        if (totalPages === 1) {
            setDisabledP(true);
            setDisabledN(true);
        } else if (currentPage === 1 && totalPages > 1) {
            setDisabledP(true);
            setDisabledN(false);
        } else if (currentPage === totalPages && totalPages > 1) {
            setDisabledN(true);
            setDisabledP(false);
        } else {
            setDisabledP(false);
            setDisabledN(false);
        }
    }, [totalPages, currentPage]);

    useEffect(() => {
        if (totalPages < 1) {
            setCurrentPage(1);
            setTotalPages(1);
        }
        if (currentPage < 1) {
            setCurrentPage(1);
        } else if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    const handleAddNote = () => {
        if (newNoteText.trim() === "") return;
        props.addNote(newNoteText);
        setNewNoteText("");
        props.handleToast("added");
    };

    const handleToggleComplete = (id: string) => {
        props.toggleComplete(id);
        if (!props.notes.filter((note) => note.id === id)[0].completed) {
            props.handleToast("completed");
        } else {
            props.handleToast(null);
        }
    };

    const handleDeleteNote = (id: string) => {
        props.deleteNote(id);
        props.handleToast("deleted");
    };

    const handleShowPrevious = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleShowNext = () => {
        setCurrentPage(currentPage + 1);
    };

    return (
        <div
            className={"card"}
            style={{
                padding: "32px",
                borderRadius: "8px",
                boxShadow: "0px -5px 0px 0px #67C0C2",
                border: "1px solid #CED4DA",
                background: "#F8F9FA",
                maxWidth: "1110px",
                maxHeight: "607px",
                overflow: "hidden",
            }}
        >
            <div className={"card-body  d-flex flex-column p-0 gap-3"}>
                <h1
                    className={"card-title m-0"}
                    style={{
                        fontSize: "40px",
                        fontWeight: 700,
                        lineHeight: "48.41px",
                        letterSpacing: "-0.02em",
                        textAlign: "left",
                    }}
                >
                    As minhas tarefas
                </h1>
                <p
                    className={"card-text m-0"}
                    style={{
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "20px",
                        letterSpacing: "-0.02em",
                        marginBottom: "6px",
                    }}
                >
                    Descrição da tarefa:
                </p>
                <div
                    className={" d-flex flex-row gap-2 p-0"}
                    style={{ justifyContent: "space-between" }}
                >
                    <input
                        type="text"
                        className="form-control"
                        id="Descrição da tarefa"
                        // placeholder="Tarefa fixe"
                        aria-describedby="taskDescription"
                        value={newNoteText}
                        onChange={(e) => setNewNoteText(e.target.value)}
                        style={{
                            maxWidth: "403px",
                            minWidth: "201.5px",
                            border: "1px solid #DEE2E6",
                            borderRadius: "6px",
                            // maxHeight: "40px",
                            // padding: "9px 16px",
                        }}
                    />
                    <Primary onClick={handleAddNote} />
                    <div
                        className={" d-flex flex-row p-0"}
                        style={{ gap: "16px" }}
                    >
                        <p
                            className={"card-text p-0 align-self-center"}
                            style={{
                                fontSize: "16px",
                                fontWeight: 400,
                                lineHeight: "20px",
                                marginTop: "0px",
                                marginBottom: "0px",
                                marginRight: "0px",
                                marginLeft: "40px", // 40px/1920px ≈ 0.0208 = 2.08vw; 40+8 = 48px
                                minWidth: "102px",
                            }}
                        >
                            Página {currentPage} de {totalPages}
                        </p>
                        <div className={" d-flex flex-row gap-1 p-0"}>
                            <Secondary
                                previous
                                disabled={disabledP}
                                onClick={handleShowPrevious}
                                totalPages={totalPages}
                                currentPage={currentPage}
                            />
                            <Primary info page={currentPage} />
                            <Secondary
                                disabled={disabledN}
                                onClick={handleShowNext}
                                totalPages={totalPages}
                                currentPage={currentPage}
                            />
                            <Dropdown
                                notesShown={notesShown}
                                setNotesShown={setNotesShown}
                            />
                        </div>
                    </div>
                </div>
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
                <div className={"d-flex flex-row p-0 mt-1"}>
                    <p
                        className={"card-text p-0 m-0 align-self-center"}
                        style={{
                            fontSize: "16px",
                            fontWeight: 800,
                            lineHeight: "19.36px",
                            width: "60%",
                        }}
                    >
                        Tarefa
                    </p>
                    <p
                        className={"card-text p-0 m-0 align-self-center"}
                        style={{
                            fontSize: "16px",
                            fontWeight: 800,
                            lineHeight: "19.36px",
                        }}
                    >
                        Última atualização a:
                    </p>
                </div>
                <hr
                    style={{
                        borderColor: "#DEE2E6",
                        borderWidth: "2px",
                        marginTop: 0,
                        marginBottom: 0,
                        padding: 0,
                        width: "100%",
                    }}
                />
                <Table
                    notes={props.notes}
                    deleteNote={handleDeleteNote}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    toggleComplete={handleToggleComplete}
                    notesShown={notesShown}
                />
                <div className={"d-flex flex-row p-0"}>
                    <p
                        className={"card-text p-0 m-0 align-self-center"}
                        style={{
                            fontSize: "20px",
                            fontWeight: 500,
                            lineHeight: "24.2px",
                            minWidth: "174px",
                            flex: "1",
                        }}
                    >
                        Total de tarefas: {props?.tasksCount}
                    </p>
                    <div
                        className={"d-flex flex-row"}
                        style={{
                            gap: "16px",
                        }}
                    >
                        <p
                            className={"card-text p-0 m-0 align-self-center"}
                            style={{
                                fontSize: "16px",
                                fontWeight: 400,
                                lineHeight: "20px",
                                minWidth: "102px",
                            }}
                        >
                            Página {currentPage} de {totalPages}
                        </p>
                        <div className={" d-flex flex-row gap-1 p-0"}>
                            <Secondary
                                previous
                                disabled={disabledP}
                                totalPages={totalPages}
                                currentPage={currentPage}
                            />
                            <Primary info page={currentPage} />
                            <Secondary
                                disabled={disabledN}
                                totalPages={totalPages}
                                currentPage={currentPage}
                            />
                            <Dropdown
                                notesShown={notesShown}
                                setNotesShown={setNotesShown}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotesTable;
