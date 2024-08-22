import React, { useState } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function AddStory() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [category, setCategory] = useState('');
  const [cover, setCover] = useState(null);
  const [tags, setTags] = useState([]);
  const [status, setStatus] = useState('Draft');
  const [chapters, setChapters] = useState([]);
  const [newChapterTitle, setNewChapterTitle] = useState('');
  const [newChapterContent, setNewChapterContent] = useState('');
  const navigate = useNavigate();

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      setTags([...tags, e.target.value.trim()]);
      e.target.value = '';
    }
  };

  const handleRemoveTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleAddChapter = () => {
    const newChapter = {
      title: newChapterTitle,
      content: newChapterContent,
      lastUpdated: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    };
    setChapters([...chapters, newChapter]);
    setNewChapterTitle('');
    setNewChapterContent('');
  };

  const handleSaveStory = () => {
    const newStory = {
      id: Date.now(),
      title,
      author,
      synopsis,
      category,
      cover,
      tags,
      status,
      chapters
    };
    // Here you would save the story to your state or database
    navigate('/');
  };

  return (
    <div>
      <h2>Add Story</h2>
      <Form>
        <Form.Group controlId="title" className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="author" className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control type="text" value={author} onChange={e => setAuthor(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="synopsis" className="mb-3">
          <Form.Label>Synopsis</Form.Label>
          <Form.Control as="textarea" value={synopsis} onChange={e => setSynopsis(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="category" className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select value={category} onChange={e => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            <option value="Financial">Financial</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="cover" className="mb-3">
          <Form.Label>Story Cover</Form.Label>
          <Form.Control type="file" onChange={e => setCover(e.target.files[0])} />
        </Form.Group>
        <Form.Group controlId="tags" className="mb-3">
          <Form.Label>Tags/Keywords</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter a tag and press Enter"
            onKeyDown={handleAddTag}
          />
          <div>
            {tags.map((tag, index) => (
              <span key={index} className="badge bg-secondary me-1">
                {tag} <button type="button" className="btn-close" aria-label="Close" onClick={() => handleRemoveTag(index)}></button>
              </span>
            ))}
          </div>
        </Form.Group>
        <Form.Group controlId="status" className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="Draft">Draft</option>
            <option value="Publish">Publish</option>
          </Form.Select>
        </Form.Group>

        <h3>Chapters</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Chapter Title</th>
              <th>Last Updated</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {chapters.map((chapter, index) => (
              <tr key={index}>
                <td>{chapter.title}</td>
                <td>{chapter.lastUpdated}</td>
                <td>
                  <Button variant="warning" size="sm" className="me-2">Edit</Button>
                  <Button variant="danger" size="sm">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Form.Group controlId="newChapterTitle" className="mb-3">
          <Form.Label>New Chapter Title</Form.Label>
          <Form.Control type="text" value={newChapterTitle} onChange={e => setNewChapterTitle(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="newChapterContent" className="mb-3">
          <Form.Label>Story Chapter</Form.Label>
          <ReactQuill value={newChapterContent} onChange={setNewChapterContent} />
        </Form.Group>

        <Button variant="secondary" onClick={() => navigate('/')} className="me-2">Cancel</Button>
        <Button variant="primary" onClick={handleAddChapter} className="me-2">Add Chapter</Button>
        <Button variant="success" onClick={handleSaveStory}>Save Story</Button>
      </Form>
    </div>
  );
}

export default AddStory;
