import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import NotesTable from "../../Components/NotesTable/NotesTable";
import Toast from "../../Components/Toast/Toast";
import { Note } from "../../types/Note";
import { useState } from "react";

type HomeProps = {
    notes: Note[];
    addNote: (noteText: string) => void;
    tasksCount: number;
    deleteNote: (id: string) => void;
    toggleComplete: (id: string) => void;
};

function Home(props: HomeProps) {
    const [actionType, setActionType] = useState<
        "added" | "completed" | "deleted" | null
    >(null);

    const handleToast = (
        actionType: "added" | "completed" | "deleted" | null
    ) => {
        setActionType(actionType);
    };

    return (
        <div className={"d-flex flex-column gap-5 p-0 vh-100"}>
            <Header />
            <NotesTable
                notes={props.notes}
                addNote={props.addNote}
                tasksCount={props.tasksCount}
                deleteNote={props.deleteNote}
                toggleComplete={props.toggleComplete}
                handleToast={handleToast}
            />
            <Toast actionType={actionType} />
            <div
                className={
                    "d-flex flex-column gap-5 justify-content-end flex-grow-1"
                }
            >
                <hr
                    style={{
                        borderColor: "black",
                        borderWidth: "1px",
                        marginTop: 0,
                        marginBottom: 0,
                        marginLeft: "-21.1vw",
                        padding: 0,
                        width: "100vw",
                    }}
                />
                <Footer />
            </div>
        </div>
    );
}

export default Home;
