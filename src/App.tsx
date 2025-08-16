import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Layout from './components/Layout';
import PrivateRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { ForumProvider } from './context/ForumContext';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import Login from './pages/Login';
import Post from './pages/Post';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ForumProvider>
          <Header />
          <Layout>
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route
                path="/post/:id"
                element={
                  <PrivateRoute>
                    <Post />
                  </PrivateRoute>
                }
              />
              <Route
                path="/favorites"
                element={
                  <PrivateRoute>
                    <Favorites />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Layout>
        </ForumProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
