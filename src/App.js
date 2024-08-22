import React from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import StoryList from './components/StoryList';
import AddStory from './components/AddStory';
import EditStory from './components/EditStory';
import StoryDetail from './components/StoryDetail';

const App = () => {
  const [stories, setStories] = React.useState([
    {
      id: 1,
      title: 'Story 1',
      author: 'Author 1',
      synopsis: 'This is a synopsis of Story 1',
      category: 'Technology',
      cover: null,
      tags: ['React', 'JavaScript'],
      status: 'Publish',
      chapters: [
        { title: 'Chapter 1', content: 'Content of Chapter 1', lastUpdated: '01 August 2024' }
      ]
    },
    // Add more mock stories here...
  ]);

  const navigate = useNavigate();

  const handleSaveStory = (newStory) => {
    setStories([...stories, newStory]);
    navigate('/');
  };

  const handleUpdateStory = (updatedStory) => {
    setStories(stories.map(story => story.id === updatedStory.id ? updatedStory : story));
    navigate('/');
  };

  const getStoryById = (id) => stories.find(story => story.id === parseInt(id));

  return (
    <div className="container mt-4">
      <Routes>
        <Route path="/" element={<StoryList stories={stories} />} />
        <Route path="/add-story" element={<AddStory onSave={handleSaveStory} />} />
        <Route path="/edit-story/:id" element={<EditStory story={getStoryById(useParams().id)} onUpdate={handleUpdateStory} />} />
        <Route path="/story-detail/:id" element={<StoryDetail story={getStoryById(useParams().id)} />} />
      </Routes>
    </div>
  );
}

export default App;
