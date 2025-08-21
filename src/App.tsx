import React, { useState } from 'react';
import './App.scss';
import { GoodsList } from './GoodsList';
import { Good } from './types/Good';

import { getAll, get5First, getRedGoods } from './api/goods';

export const App: React.FC = () => {
  const [goods, setGoods] = useState<Good[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLoadAll = () => {
    setLoading(true);
    getAll()
      .then(setGoods)
      .catch(() => alert('Failed to load all goods. Please try again.'))
      .finally(() => setLoading(false));
  };

  const handleLoad5First = () => {
    setLoading(true);
    get5First()
      .then(setGoods)
      .catch(() => alert('Failed to load first 5 goods'))
      .finally(() => setLoading(false));
  };

  const handleLoadRed = () => {
    setLoading(true);
    getRedGoods()
      .then(setGoods)
      .catch(() => alert('Failed to load red goods'))
      .finally(() => setLoading(false));
  };

  return (
    <div className="App">
      <h1>Dynamic list of Goods</h1>

      <button
        disabled={loading}
        type="button"
        data-cy="all-button"
        onClick={handleLoadAll}
      >
        Load all goods
      </button>

      <button
        disabled={loading}
        type="button"
        data-cy="first-five-button"
        onClick={handleLoad5First}
      >
        Load 5 first goods
      </button>

      <button
        disabled={loading}
        type="button"
        data-cy="red-button"
        onClick={handleLoadRed}
      >
        Load red goods
      </button>

      <GoodsList goods={goods} />
    </div>
  );
};
