import { useMemo, useState } from 'react';
import {
  events as initialEvents,
  friends,
  friendChallenges as initialFriendChallenges,
  initialJoinedEventIds,
  initialCompletedChallengeIds,
} from '../data/dummyData.js';
import { AppContext } from './useApp.js';

// 'YYYY-MM-DD' + 'HH:MM' -> "Sa, 14. Juni · 16:00"
function formatEventDate(dateStr, timeStr) {
  if (!dateStr) return '';
  const d = new Date(`${dateStr}T${timeStr || '00:00'}`);
  if (Number.isNaN(d.getTime())) return dateStr;
  const weekday = d.toLocaleDateString('de-DE', { weekday: 'short' });
  const month = d.toLocaleDateString('de-DE', { month: 'long' });
  const datePart = `${weekday}, ${d.getDate()}. ${month}`;
  return timeStr ? `${datePart} · ${timeStr}` : datePart;
}

let createdSeq = 0;

export function AppProvider({ children }) {
  const [activePage, setActivePage] = useState('home');
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [events, setEvents] = useState(initialEvents);
  const [joinedEventIds, setJoinedEventIds] = useState(initialJoinedEventIds);
  const [completedChallengeIds, setCompletedChallengeIds] = useState(
    initialCompletedChallengeIds
  );
  const [friendChallenges, setFriendChallenges] = useState(
    initialFriendChallenges
  );

  const value = useMemo(() => {
    const isJoined = (eventId) => joinedEventIds.includes(eventId);

    const toggleJoin = (eventId) =>
      setJoinedEventIds((prev) =>
        prev.includes(eventId)
          ? prev.filter((id) => id !== eventId)
          : [...prev, eventId]
      );

    const isCompleted = (challengeId) =>
      completedChallengeIds.includes(challengeId);

    const toggleChallenge = (challengeId) =>
      setCompletedChallengeIds((prev) =>
        prev.includes(challengeId)
          ? prev.filter((id) => id !== challengeId)
          : [...prev, challengeId]
      );

    const respondToFriendChallenge = (challengeId, status) =>
      setFriendChallenges((prev) =>
        prev.map((c) => (c.id === challengeId ? { ...c, status } : c))
      );

    // Neues Event in den globalen State legen + Ersteller automatisch beitreten.
    const addEvent = (data) => {
      createdSeq += 1;
      const newEvent = {
        id: `new-${Date.now()}-${createdSeq}`,
        name: data.name.trim(),
        description: (data.description || '').trim(),
        location: data.location.trim(),
        date: formatEventDate(data.date, data.time),
        category: data.category,
        participants: 1,
        maxParticipants: data.maxParticipants
          ? Number(data.maxParticipants)
          : null,
        isPrivate: data.visibility === 'private',
        invitedFriendIds: data.invitedFriendIds || [],
        challenges: [],
      };
      setEvents((prev) => [newEvent, ...prev]);
      setJoinedEventIds((prev) =>
        prev.includes(newEvent.id) ? prev : [...prev, newEvent.id]
      );
      return newEvent;
    };

    const eventsById = events.reduce((acc, e) => {
      acc[e.id] = e;
      return acc;
    }, {});
    const joinedEvents = events.filter((e) => joinedEventIds.includes(e.id));

    return {
      events,
      eventsById,
      addEvent,
      friends,
      joinedEventIds,
      joinedEvents,
      isJoined,
      toggleJoin,
      completedChallengeIds,
      isCompleted,
      toggleChallenge,
      friendChallenges,
      respondToFriendChallenge,
      activePage,
      setActivePage,
      isCreateOpen,
      openCreate: () => setCreateOpen(true),
      closeCreate: () => setCreateOpen(false),
    };
  }, [
    events,
    joinedEventIds,
    completedChallengeIds,
    friendChallenges,
    activePage,
    isCreateOpen,
  ]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
