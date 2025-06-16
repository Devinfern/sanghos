
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Retreat } from '@/lib/data';

interface RetreatContextType {
  favorites: string[];
  recentlyViewed: Retreat[];
  comparison: Retreat[];
  addToFavorites: (retreatId: string) => void;
  removeFromFavorites: (retreatId: string) => void;
  isFavorite: (retreatId: string) => boolean;
  addToRecentlyViewed: (retreat: Retreat) => void;
  addToComparison: (retreat: Retreat) => void;
  removeFromComparison: (retreatId: string) => void;
  clearComparison: () => void;
  isInComparison: (retreatId: string) => boolean;
}

const RetreatContext = createContext<RetreatContextType | undefined>(undefined);

export const useRetreatContext = () => {
  const context = useContext(RetreatContext);
  if (!context) {
    throw new Error('useRetreatContext must be used within a RetreatProvider');
  }
  return context;
};

export const RetreatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Retreat[]>([]);
  const [comparison, setComparison] = useState<Retreat[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('retreat-favorites');
    const savedRecentlyViewed = localStorage.getItem('retreat-recently-viewed');
    const savedComparison = localStorage.getItem('retreat-comparison');

    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    if (savedRecentlyViewed) {
      setRecentlyViewed(JSON.parse(savedRecentlyViewed));
    }
    if (savedComparison) {
      setComparison(JSON.parse(savedComparison));
    }
  }, []);

  const addToFavorites = (retreatId: string) => {
    const newFavorites = [...favorites, retreatId];
    setFavorites(newFavorites);
    localStorage.setItem('retreat-favorites', JSON.stringify(newFavorites));
  };

  const removeFromFavorites = (retreatId: string) => {
    const newFavorites = favorites.filter(id => id !== retreatId);
    setFavorites(newFavorites);
    localStorage.setItem('retreat-favorites', JSON.stringify(newFavorites));
  };

  const isFavorite = (retreatId: string) => favorites.includes(retreatId);

  const addToRecentlyViewed = (retreat: Retreat) => {
    const filtered = recentlyViewed.filter(r => r.id !== retreat.id);
    const newRecentlyViewed = [retreat, ...filtered].slice(0, 5); // Keep only 5 most recent
    setRecentlyViewed(newRecentlyViewed);
    localStorage.setItem('retreat-recently-viewed', JSON.stringify(newRecentlyViewed));
  };

  const addToComparison = (retreat: Retreat) => {
    if (comparison.length >= 3) return; // Max 3 retreats for comparison
    if (!isInComparison(retreat.id)) {
      const newComparison = [...comparison, retreat];
      setComparison(newComparison);
      localStorage.setItem('retreat-comparison', JSON.stringify(newComparison));
    }
  };

  const removeFromComparison = (retreatId: string) => {
    const newComparison = comparison.filter(r => r.id !== retreatId);
    setComparison(newComparison);
    localStorage.setItem('retreat-comparison', JSON.stringify(newComparison));
  };

  const clearComparison = () => {
    setComparison([]);
    localStorage.removeItem('retreat-comparison');
  };

  const isInComparison = (retreatId: string) => comparison.some(r => r.id === retreatId);

  return (
    <RetreatContext.Provider value={{
      favorites,
      recentlyViewed,
      comparison,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      addToRecentlyViewed,
      addToComparison,
      removeFromComparison,
      clearComparison,
      isInComparison
    }}>
      {children}
    </RetreatContext.Provider>
  );
};
