import React, { useEffect, useState } from 'react';

export default function ItemForm({ onCreate, onUpdate, editing, cancelEdit }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [focused, setFocused] = useState(null);

  useEffect(() => {
    if (editing) {
      setTitle(editing.title || '');
      setDesc(editing.description || '');
    } else {
      setTitle('');
      setDesc('');
    }
  }, [editing]);

  function handleSubmit(e) {
    e.preventDefault();
    const payload = { title: title.trim(), description: desc.trim() };
    if (!payload.title) return;
    if (editing) {
      onUpdate(editing.id, payload);
    } else {
      onCreate(payload);
    }
    setTitle('');
    setDesc('');
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
            {editing ? (
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              {editing ? 'Edit Item' : 'Create New Item'}
            </h3>
            <p className="text-xs text-indigo-100">
              {editing ? 'Update your item details' : 'Fill in the information below'}
            </p>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6 space-y-5">
        {/* Title Field */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <svg className="w-4 h-4 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h10" />
            </svg>
            Title
            <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              onFocus={() => setFocused('title')}
              onBlur={() => setFocused(null)}
              className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl transition-all duration-200 outline-none ${
                focused === 'title'
                  ? 'border-indigo-500 bg-white shadow-md ring-4 ring-indigo-100'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              placeholder="Enter a catchy title..."
            />
            {title && (
              <button
                type="button"
                onClick={() => setTitle('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              </button>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            This field is required
          </div>
        </div>

        {/* Description Field */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <svg className="w-4 h-4 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            Description
          </label>
          <div className="relative">
            <textarea
              value={desc}
              onChange={e => setDesc(e.target.value)}
              onFocus={() => setFocused('desc')}
              onBlur={() => setFocused(null)}
              rows={4}
              className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl transition-all duration-200 outline-none resize-none ${
                focused === 'desc'
                  ? 'border-indigo-500 bg-white shadow-md ring-4 ring-indigo-100'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              placeholder="Add more details about this item..."
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-400">
              {desc.length} characters
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleSubmit}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {editing ? (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Update Item
              </>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Create Item
              </>
            )}
          </button>
          
          {editing && (
            <button
              onClick={cancelEdit}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold border-2 border-gray-200 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        {/* Helper Text */}
        {editing && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2">
            <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <p className="text-xs text-amber-800">
              You are currently editing an existing item. Click "Update Item" to save changes or "Cancel" to discard.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}