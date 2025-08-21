import React, { useState } from 'react';
import './App.scss';
import { GoodsList } from './GoodsList';
import { Good } from './types/Good';

import { getAll, get5First, getRedGoods } from './api/goods';

export const App: React.FC = () => {
  const [goods, setGoods] = useState<Good[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRequest = (apiFn: () => Promise<Good[]>) => {
    setLoading(true);
    setError(null);

    apiFn()
      .then(setGoods)
      .catch((err: Error) => {
        setError(err.message || 'Failed to load goods');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <h1>Dynamic list of Goods</h1>

      <button
        disabled={loading}
        type="button"
        data-cy="all-button"
        onClick={() => handleRequest(getAll)}
      >
        Load all goods
      </button>

      <button
        disabled={loading}
        type="button"
        data-cy="first-five-button"
        onClick={() => handleRequest(get5First)}
      >
        Load 5 first goods
      </button>

      <button
        disabled={loading}
        type="button"
        data-cy="red-button"
        onClick={() => handleRequest(getRedGoods)}
      >
        Load red goods
      </button>

      {error && <div className="error">{error}</div>}

      <GoodsList goods={goods} />
    </div>
  );
};
