import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import NotesList from "./components/NotesList";
import Search from "./components/Search";
import Header from "./components/Header";

const App = () => {
  const [notes, setNote] = useState([
    {
      id: nanoid(),
      text: "This is my first note!",
      date: "26/09/2022",
    },
    {
      id: nanoid(),
      text: "This is my second note!",
      date: "27/09/2022",
    },
    {
      id: nanoid(),
      text: "This is my third note!",
      date: "28/09/2022",
    },
    {
      id: nanoid(),
      text: "This is my fourth note!",
      date: "29/09/2022",
    },
    {
      id: nanoid(),
      text: "This is my fourth note!",
      date: "30/09/2022",
    },
  ]);

  const [searchText, setSearchText] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("react-notes-app-data"));
    // console.log("=========================", savedNotes);
    if (savedNotes) {
      setNote(savedNotes);
    }
  }, []);

  // useEffect(()=> {
  //   console.log('====================', notes )
  //  localStorage.setItem("react-notes-app-data", JSON.stringify(newNotes));
  // }, [notes]);

  const addNote = (text) => {
    //  console.log(text);
    const data = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: data.toLocaleDateString(),
    };
    const newNotes = [...notes, newNote];
    localStorage.setItem("react-notes-app-data", JSON.stringify(newNotes));
    setNote(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    localStorage.setItem("react-notes-app-data", JSON.stringify(newNotes));
    setNote(newNotes);
  };
  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NotesList
          notes={notes.filter((note) =>
            note.text.includes(searchText)
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
  );
};

export default App;
