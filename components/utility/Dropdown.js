import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({ list, trigger, selectionMode, selectedKeys, onSelectionChange, listTitle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(selectionMode === 'multiple' ? selectedKeys : [selectedKeys]);
  const node = useRef();

  const handleSelect = (key) => {
    if (selectionMode === 'multiple') {
      setSelected(prevState => prevState.includes(key) ? prevState.filter(k => k !== key) : [...prevState, key]);
    } else {
      setSelected([key]);
      setIsOpen(false);
    }
  };

  const handleClickOutside = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click 
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    onSelectionChange(selected);
  }, [selected]);

  return (
    <div className="relative w-full inline-block text-left" ref={node}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>

      {
        isOpen && (
          <div className="transition-all duration-200 ease-in-out origin-top-right px-1.5 py-2 absolute z-50 right-0 mt-2 w-64 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            {listTitle ? (
              <div className="" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <button className={`w-full cursor-text flex justify-between items-center px-4 py-1 text-base text-sky-600`} role="menuitem">
                  {listTitle}
                </button>
              </div>
            )
              : ''}
            <div className="" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              {list.map(item => (
                <button key={item.key} onClick={() => handleSelect(item.key)} className={`w-full rounded-xl flex justify-between items-center duration-150 ease-in-out px-4 py-2 text-base text-gray-700 hover:bg-gray-100`} role="menuitem">
                  {item.name}
                  {selected.includes(item.key) && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        )
      }
    </div>
  );
};

export default Dropdown;
