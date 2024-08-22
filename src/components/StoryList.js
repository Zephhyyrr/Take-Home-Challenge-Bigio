import React, { useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function StoryList() {
  const [stories, setStories] = useState([
    {
      id: 1,
      title: "Story 1",
      author: "Author 1",
      category: "Technology",
      tags: ["React", "JavaScript"],
      status: "Publish",
    },
    // Add more stories here...
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterModal, setFilterModal] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStories = stories.filter(
    (story) =>
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Story List</h2>
      <Form.Control
        type="text"
        placeholder="Search by Title or Author"
        value={searchTerm}
        onChange={handleSearch}
      />
      <Button variant="primary" onClick={() => setFilterModal(true)}>
        Filter
      </Button>
      <Link to="/add-story" className="btn btn-success ms-2">
        Add Story
      </Link>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Tags/Keyword</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredStories.map((story) => (
            <tr key={story.id}>
              <td>{story.title}</td>
              <td>{story.author}</td>
              <td>{story.category}</td>
              <td>
                {story.tags.map((tag) => (
                  <span className="badge bg-secondary me-1" key={tag}>
                    {tag}
                  </span>
                ))}
              </td>
              <td>
                <span
                  className={`badge bg-${
                    story.status === "Publish" ? "success" : "warning"
                  }`}
                >
                  {story.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={filterModal} onHide={() => setFilterModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Filter Stories</Modal.Title>
        </Modal.Header>
        <Modal.Body>{/* Add filter options here */}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setFilterModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => setFilterModal(false)}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default StoryList;
