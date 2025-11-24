import React from "react";
import "./NotesForm.css";

interface Note {
  content: string;
}

interface NotesFormState {
  content: string;
  loading: boolean;
  error: string | null;
}

interface NotesFormProps {
  getNotes: () => void;
}

export default class NotesForm extends React.Component<NotesFormProps, NotesFormState> {
  constructor(props: NotesFormProps) {
    super(props);
    this.state = {
      content: "",
      loading: false,
      error: null,
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({content: e.target.value});
  }

  async handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const {content} = this.state;
    if(!content.trim()) {
      this.setState({error: "Content cannot be empty."}); //Содержимое не может быть пустым.
      return
    }

    this.setState({loading: true, error: null});

    const newNotes: Note = {
      content: content,
    }

    try {
      const response = await fetch('http://localhost:7070/notes', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNotes),
      });

      if(!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      this.setState({content: '', loading: false});

      if (this.props.getNotes) {
        this.props.getNotes();
      }
    } catch(error: any) {
      this.setState({
        loading: false, 
        error: error.message || "An unknown error occurred.", //Произошла неизвестная ошибка
      }); 
    }
  }

  render() {
    const {content, loading, error} = this.state;

    return (
      <>
        <form className="form" onSubmit={this.handleSubmit}>
          <label className="form_textarea-label" htmlFor="content">New Note</label>
          <textarea 
            className="form_content" 
            name="content"
            value={content}
            maxLength={100}
            rows={6}
            onChange={this.handleInputChange}
          />
          <button className="form_btn" disabled={loading} type="submit">➤</button>
        </form>
        {error && <p className="error">{error}</p>}
      </>
    )
  }
}