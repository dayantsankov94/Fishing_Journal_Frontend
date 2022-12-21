import './App.css';
import Home from './components/Home/Home';

import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom'
import Publications from './components/Publications/Publications';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Logout from './components/Logout/Logout';
import Footer from './components/Footer/Footer';
import { AuthProvider } from './context/AuthContext';
import { PublicationProvider } from './context/PublicationContext';
import PublicationDetails from './components/PublicationDetails/PublicationDetails';
import { CommentProvider } from './context/CommentContext';
import Profile from './components/Profile/Profile';
import UserPublications from './components/UserPublications/UserPublications';
import Create from './components/CreatePublication/Create';
import Shared from './components/SharedPublications/Shared';
import About from './components/About/About';
import Edit from './components/EditPublication/Edit';
import NotFound from './components/NotFound/NotFound';
import PrivateGuard from './components/common/PrivateGuard';
import ViewProfile from './components/ViewProfile/ViewProfile';
import ViewPublications from './components/ViewPublications/ViewPublications';
import ViewShared from './components/ViewShared/ViewShared';
import Following from './components/Following/Following';

function App() {

    return (
        <AuthProvider>
            <div className='bg container-fluid p-0'>
                <Navbar />
                <PublicationProvider>
                    <CommentProvider>
                        <main>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/publications" element={<Publications />} />
                                <Route path="/publications/details/:publicationId" element={<PublicationDetails />} />
                                <Route path="/profile/:id/" element={<ViewProfile />} />
                                <Route path="/profile/:id/publications" element={<ViewPublications />} />
                                <Route path="/profile/:id/shares" element={<ViewShared />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route element={<PrivateGuard />}>
                                    <Route path="/profile" element={<Profile />} />
                                    <Route path="/create" element={<Create />} />
                                    <Route path="/following" element={<Following />} />
                                    <Route path="/profile/publications" element={<UserPublications />} />
                                    <Route path="/profile/shares" element={<Shared />} />
                                    <Route path="/publications/details/edit/:publicationId" element={<Edit />} />
                                    <Route path="/publications/details/delete/:publicationId" element={<PublicationDetails />} />
                                    <Route path="/logout" element={<Logout />} />
                                </Route>
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </main>
                        <Footer />
                    </CommentProvider>
                </PublicationProvider>

            </div>
        </AuthProvider>
    );
}

export default App;
