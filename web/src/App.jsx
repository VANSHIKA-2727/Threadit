import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import { SidebarNavProvider } from "./context/SidebarNavContext";

import Landing from "./pages/Landing";
import Feed from "./pages/Feed";
import Submit from "./pages/Submit";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import PostDetail from "./pages/PostDetail";
import About from "./pages/About";
import Help from "./pages/Help";
import ManageCommunities from "./pages/ManageCommunities";
import News from "./pages/News";
import Explore from "./pages/Explore";

function AppLayout({ children }) {
  return (
    <SidebarNavProvider>
      <div className="flex h-screen overflow-hidden bg-white text-gray-900 transition-colors duration-200 dark:bg-[#0f0f0f] dark:text-gray-100">
        <SideBar />

        <div className="flex min-w-0 flex-1 flex-col bg-white transition-colors duration-200 dark:bg-[#0f0f0f]">
          <Navbar />

          <div className="flex flex-1 flex-col overflow-y-auto bg-white px-4 py-6 transition-colors duration-200 dark:bg-[#0f0f0f] md:px-6">
            {children}
          </div>
        </div>
      </div>
    </SidebarNavProvider>
  );
}

function AppRoutes() {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route path="/" element={<Landing />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/home"
        element={
          <AppLayout>
            <Feed />
          </AppLayout>
        }
      />

      <Route
        path="/popular"
        element={
          <AppLayout>
            <Feed />
          </AppLayout>
        }
      />

      <Route
        path="/news"
        element={
          <AppLayout>
            <News />
          </AppLayout>
        }
      />

      <Route
        path="/about"
        element={
          <AppLayout>
            <About />
          </AppLayout>
        }
      />

      <Route
        path="/help"
        element={
          <AppLayout>
            <Help />
          </AppLayout>
        }
      />

      <Route
        path="/submit"
        element={
          <AppLayout>
            <Submit />
          </AppLayout>
        }
      />

      <Route
        path="/explore"
        element={
          <AppLayout>
            <Explore />
          </AppLayout>
        }
      />

      <Route
        path="/search"
        element={
          <AppLayout>
            <Search />
          </AppLayout>
        }
      />

      <Route
        path="/profile"
        element={
          <AppLayout>
            <Profile />
          </AppLayout>
        }
      />

      <Route
        path="/communities"
        element={
          <AppLayout>
            <ManageCommunities />
          </AppLayout>
        }
      />

      <Route
        path="/post/:id"
        element={
          <AppLayout>
            <PostDetail />
          </AppLayout>
        }
      />
    </Routes>
  );
}

function App() {
  return <AppRoutes />;
}

export default App;
