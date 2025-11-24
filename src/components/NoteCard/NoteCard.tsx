import "./NoteCard.css";

interface NoteProps {
  id: number;
  content: string;
  getRemove: (id: number) => void;
}

export default function NoteCard ({id, content, getRemove}: NoteProps) {
  return (
    <div className="card">
      <p className="card_content">{content}</p>
      <button className="card_remove-btn" onClick={() => getRemove(id)}>✖</button>
    </div>
  )
}