import React from "react";
import "./App.css";
import NotesForm from "./components/NotesForm/NotesForm";
import NotesList from "./components/NotesList/NotesList";

interface Note {
  id: number;
  content: string;
}

interface AppState {
  notes: Note[];
  loading: boolean,
  error: string | null;
}

export default class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      notes: [],
      loading: false,
      error: null,
    }

    this.getNotes = this.getNotes.bind(this);
    this.getRemove = this.getRemove.bind(this);
  }

  async getNotes() {
    this.setState({loading: true});
    // увидеть загрузку
    setTimeout(async () =>{
      try {
        const response = await fetch('http://localhost:7070/notes', {
          headers: {
            "Content-Type": "application/json",
          }
        })

        if (!response.ok) {
          throw new Error(`Download error: ${response.status}`);
        }

        const obj = await response.json();
        this.setState({notes: obj, loading: false});
      } catch(error: unknown) {
        this.setState({
          loading: false, 
          error: (error as Error).message || "An unknown error occurred.", //Произошла неизвестная ошибка
        });
      }
    }, 500);
  }

  async getRemove(id:number) {
    this.setState({ loading: true, error: null });
    try {
      const response = await fetch(`http://localhost:7070/notes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      })

      if (!response.ok) {
        throw new Error(`Deletion error: ${response.status}`);
      }

      await this.getNotes();
    } catch(error: unknown) {
      this.setState({
        loading: false, 
        error: (error as Error).message || "An unknown error occurred.", //Произошла неизвестная ошибка
      });
    }
  }

  componentDidMount(): void {
    this.getNotes();
  }

  render() {
    const {notes, loading, error} = this.state;

    return (
      <>
        <NotesList notes={notes} getNotes={this.getNotes} getRemove={this.getRemove} loading={loading} />
        {error && <p className="error">{error}</p>}
        <NotesForm getNotes={this.getNotes} />
      </>
    )
  }
}
