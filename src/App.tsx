import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Layout from './components/Layout';
import { ForumProvider } from './context/ForumContext';
import Home from './pages/Home';
import PostPage from './pages/PostPage';

function App() {
  return (
    <Router>
      <Header />
      <ForumProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<PostPage />} />
          </Routes>
        </Layout>
      </ForumProvider>
    </Router>
  );
}

export default App;
