import { useEffect, useState } from 'react';
import './App.css';
import { NewsList } from './components/NewsList';
import { NewsForm } from './components/NewsForm';
import { getNews, saveNews } from './utils/newsStorage';

function App() {
  const [newsList, setNewsList] = useState<{ id: number; title: string; content: string }[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    const storedNews = getNews();
    setNewsList(storedNews);
  }, []);

  useEffect(() => {
    if (newsList.length > 0) {
      saveNews(newsList);
    }
  }, [newsList]);

  const handleButton = () => {
    setShowForm((prev) => !prev);
  };

  const addNews = (news: { id: number; title: string; content: string }) => {
    setNewsList((prev) => [...prev, news]);
    setShowForm(false);
  };

  const onDelete = (id: number) => {
    setNewsList((prev) => prev.filter((item) => item.id != id));
  };

  const editNews = (id: number, title: string, content: string) => {
    setNewsList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, title, content } : item)),
    );
  };

  return (
    <>
      <button onClick={handleButton}>{!showForm ? 'Add' : 'Hide form'}</button>
      {showForm && <NewsForm onAdd={addNews} />}
      <NewsList newsList={newsList} onDelete={onDelete} onEdit={editNews}></NewsList>
    </>
  );
}

export default App;
