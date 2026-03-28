import { create } from 'zustand';

const useStore = create((set, get) => ({
  watchlist: ['cv001', 'cv003', 'cv004', 'cv011'],
  currentUser: {
    username: 'filmcritic88',
    avatar: 'https://i.pravatar.cc/96?u=filmcritic88',
    bio: 'Avid film viewer. Big fan of neon and rainy streets.',
    followers: 1200,
    following: 156,
  },
  activeMood: null,
  recentSearches: ['Cyberpunk', 'Comedy Club Noir', 'Elias Thorne', '2024 movies'],
  randomFilters: {
    genre: [],
    mood: null,
    runtime: [60, 240], // min max
    rating: 0
  },

  setActiveMood: (moodId) => set((state) => ({ 
    activeMood: state.activeMood === moodId ? null : moodId 
  })),

  addToWatchlist: (id) => set((state) => {
    if (state.watchlist.includes(id)) return state;
    return { watchlist: [...state.watchlist, id] };
  }),

  removeFromWatchlist: (id) => set((state) => ({
    watchlist: state.watchlist.filter(wId => wId !== id)
  })),

  reorderWatchlist: (newOrder) => set({ watchlist: newOrder }),

  setRandomFilters: (updater) => set((state) => ({
    randomFilters: typeof updater === 'function' ? updater(state.randomFilters) : { ...state.randomFilters, ...updater }
  })),

  addRecentSearch: (val) => set((state) => {
    const s = state.recentSearches.filter(v => v !== val);
    return { recentSearches: [val, ...s].slice(0, 10) };
  })
}));

export default useStore;
