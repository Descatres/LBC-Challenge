import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Views/Home/Home";
import "./App.css";
import { Note } from "./types/Note";

function App() {
    const [notes, setNotes] = useState<Note[]>(() => {
        const savedNotes = localStorage.getItem("notes");
        if (savedNotes) {
            return JSON.parse(savedNotes);
        }
        return [];
    });
    const [tasksCount, setTasksCount] = useState<number>(0);

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    const addNote = (noteText: string) => {
        if (noteText.trim() === "") return; //redundant ig but just to be sure

        const newNote: Note = {
            id: Date.now().toString(), // timestap as id is not the best but it's enough here
            text: noteText,
            completed: false,
            lastUpdate: new Date().toLocaleString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
            }),
        };

        setNotes((prevNotes) => [...prevNotes, newNote]);
    };

    const deleteNote = (id: string) => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    };

    const toggleComplete = (id: string) => {
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.id === id ? { ...note, completed: !note.completed } : note
            )
        );
    };

    useEffect(() => {
        setTasksCount(notes.length);
    }, [notes.length]);

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Home
                            notes={notes}
                            addNote={addNote}
                            tasksCount={tasksCount}
                            deleteNote={deleteNote}
                            toggleComplete={toggleComplete}
                        />
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
