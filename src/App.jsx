import { AppProvider } from './context/AppContext.jsx';
import { useApp } from './context/useApp.js';
import BottomNav from './components/BottomNav.jsx';
import CreateEventModal from './components/CreateEventModal.jsx';
import LeaveEventDialog from './components/LeaveEventDialog.jsx';
import Home from './pages/Home.jsx';
import Discover from './pages/Discover.jsx';
import MapPage from './pages/Map.jsx';
import MyEvents from './pages/MyEvents.jsx';
import Challenges from './pages/Challenges.jsx';
import Profile from './pages/Profile.jsx';
import EventDetail from './pages/EventDetail.jsx';

const PAGES = {
  home: Home,
  discover: Discover,
  map: MapPage,
  events: MyEvents,
  challenges: Challenges,
  profile: Profile,
};

function Shell() {
  const {
    activePage,
    setActivePage,
    joinedEvents,
    friendChallenges,
    isCreateOpen,
    selectedEvent,
    leaveEvent,
  } = useApp();

  const Page = PAGES[activePage] ?? Home;

  // Badges für die Bottom-Nav: beigetretene Events + offene Freundes-Challenges.
  const badges = {
    events: joinedEvents.length,
    challenges: friendChallenges.filter((c) => c.status === 'pending').length,
  };

  return (
    <div className="app-shell">
      <Page />
      <BottomNav active={activePage} onNavigate={setActivePage} badges={badges} />
      {isCreateOpen && <CreateEventModal />}
      {selectedEvent && <EventDetail />}
      {leaveEvent && <LeaveEventDialog />}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  );
}
