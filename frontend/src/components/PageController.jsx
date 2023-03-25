import React from 'react';

const PageController = ({ page, maxPages, onSetPage }) => {
  return (
    <div className="mx-auto flex items-center  p-2">
      <button
        disabled={page === 1}
        onClick={() => onSetPage(1)}
        className="px-8 text-xl font-semibold disabled:text-slate-400"
      >
        {'<<'}
      </button>
      <button
        disabled={page === 1}
        onClick={() => onSetPage(page - 1)}
        className="px-8 text-xl font-semibold disabled:text-slate-400"
      >
        {'<'}
      </button>
      <h1 className="text-l px-8">
        Page {page} of {maxPages}
      </h1>
      <button
        disabled={page === maxPages}
        onClick={() => onSetPage(page + 1)}
        className="px-8 text-xl font-semibold disabled:text-slate-400"
      >
        {'>'}
      </button>
      <button
        disabled={page === maxPages}
        onClick={() => onSetPage(maxPages)}
        className="px-8 text-xl font-semibold disabled:text-slate-400"
      >
        {'>>'}
      </button>
    </div>
  );
};

export default PageController;
