import React, { useState } from 'react';

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
        <svg className="w-12 h-12 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="9" y1="9" x2="15" y2="9" />
          <line x1="9" y1="15" x2="15" y2="15" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-gray-700 mb-2">No items yet</h3>
      <p className="text-gray-500 text-center max-w-sm mb-4">
        Get started by creating your first item using the form above
      </p>
      <div className="flex items-center gap-2 text-sm text-indigo-600">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6" />
        </svg>
        <span className="font-medium">Click "Create Item" to begin</span>
      </div>
    </div>
  );
}

export default function ItemList({ items, onEdit, onDelete }) {
  const [deletingId, setDeletingId] = useState(null);

  if (!items || items.length === 0) return <EmptyState />;

  const handleDelete = (id) => {
    setDeletingId(id);
    setTimeout(() => {
      onDelete(id);
      setDeletingId(null);
    }, 300);
  };

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">{items.length}</span>
          </div>
          <h3 className="text-lg font-bold text-gray-800">
            {items.length === 1 ? '1 Item' : `${items.length} Items`}
          </h3>
        </div>
        <div className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          Total: {items.length}
        </div>
      </div>

      {/* Items List */}
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li
            key={item.id}
            className={`group bg-white border-2 border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-indigo-300 ${
              deletingId === item.id ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="p-5 flex items-start gap-4">
              {/* Item Number Badge */}
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold shadow-md group-hover:scale-110 transition-transform">
                {index + 1}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h4 className="font-bold text-lg text-gray-800 group-hover:text-indigo-600 transition-colors break-words">
                    {item.title}
                  </h4>
                </div>
                
                {item.description && (
                  <p className="text-gray-600 text-sm leading-relaxed mb-3 break-words">
                    {item.description}
                  </p>
                )}
                
                {/* Metadata */}
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10 2v8l6 4" />
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    <span>ID: {item.id}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex-shrink-0 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => onEdit(item)}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-lg font-medium text-sm shadow-md hover:shadow-lg hover:from-yellow-500 hover:to-orange-500 transition-all transform hover:scale-105 active:scale-95"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  <span className="hidden sm:inline">Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-medium text-sm shadow-md hover:shadow-lg hover:from-red-600 hover:to-pink-600 transition-all transform hover:scale-105 active:scale-95"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                  </svg>
                  <span className="hidden sm:inline">Delete</span>
                </button>
              </div>
            </div>

            {/* Bottom Border Animation */}
            <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </li>
        ))}
      </ul>
    </div>
  );
}