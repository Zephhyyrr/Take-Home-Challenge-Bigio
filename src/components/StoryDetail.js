import React from 'react';
import { Form, Table, Button } from 'react-bootstrap';

function StoryDetail({ story }) {
  if (!story) return <p>No story selected.</p>;

  return (
    <div>
      <h2>Story Detail</h2>
      <Form>
        <Form.Group controlId="title" className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" value={story.title} readOnly />
        </Form.Group>
        <Form.Group controlId="author" className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control type="text" value={story.author} readOnly />
        </Form.Group>
        <Form.Group controlId="synopsis" className="mb-3">
          <Form.Label>Synopsis</Form.Label>
          <Form.Control as="textarea" value={story.synopsis} readOnly />
        </Form.Group>
        <Form.Group controlId="category" className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" value={story.category} readOnly />
        </Form.Group>
        <Form.Group controlId="tags" className="mb-3">
          <Form.Label>Tags/Keywords</Form.Label>
          <Form.Control
            type="text"
            value={story.tags.join(', ')}
            readOnly
          />
        </Form.Group>
        <Form.Group controlId="status" className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Control type="text" value={story.status} readOnly />
        </Form.Group>

        <h3>Chapters</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Chapter Title</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {story.chapters.map((chapter, index) => (
              <tr key={index}>
                <td>{chapter.title}</td>
                <td>{chapter.lastUpdated}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Button variant="primary" onClick={() => window.history.back()}>Back</Button>
      </Form>
    </div>
  );
}

export default StoryDetail;
