import { useState } from 'react';
import "./CommentForm.css"
import { Form, Button, Container } from 'react-bootstrap'
import "./CommentForm.scss"

const CommentForm = ({ handleAddComment }) => {
  // State
  const [formData, setFormData] = useState({ text: '' });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // handleAddComment
    handleAddComment(formData)
    setFormData({ text: '' });
  };

  return (
    <Container className="comment-form">
    <Form onSubmit={handleSubmit}>
    <Form.Group controlId="comment-input" className="comment-group">

      <textarea
        required
        type="text"
        name="text"
        id="text-input"
        value={formData.text}
        onChange={handleChange}
      />
      </Form.Group>
   <div className="btn-container">
          <Button variant="primary" type="submit">SUBMIT</Button>
        </div>
      </Form>
      </Container>
  );
};


export default CommentForm;
