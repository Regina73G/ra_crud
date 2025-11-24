import "./NotesList.css";
import NoteCard from "../NoteCard/NoteCard";

interface Note {
  id: number;
  content: string;
}

interface NotesListProps {
  notes: Note[];
  getNotes: () => void;
  getRemove: (id: number) => void;
  loading: boolean;
}

export default function NotesList ({notes, getNotes, getRemove, loading}: NotesListProps) {
  return (
    <div className="card-list">
      <div className="card-list_header">
        <h1 className="card-list_title">Notes</h1>
        <button 
          className={`card-list_refresh-btn ${loading ? "loading-list" : ""}`} 
          onClick={getNotes}
        ></button>
      </div>
      <div className="card-list_body">
        {!loading && notes.length === 0 && <p className="card-list_empty">No notes added</p>}
        {notes.length === 0 && loading && <p className="card-list_loading">Loading...</p>}
        {notes.map((note) => (
          <NoteCard key={note.id} id={note.id} content={note.content} getRemove={getRemove} />
        ))}
      </div>
    </div>
  )
}