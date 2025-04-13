/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

function ListGroup({ items = [], heading, onSelectItem }) {
  const initial = items[0] || null; // Ensure initial is null if items[0] doesn't exist
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onStart = () => {
    if (initial) {
      setSelectedIndex(initial.id);
      onSelectItem(initial);
    }
  };

  useEffect(() => {
    onStart();
  }, [initial]); // Add initial as a dependency to ensure it updates correctly

  if (!items || items.length === 0) {
    return <p>No {heading} available.</p>;
  }

  return (
    <div className="w-1/2">
      <div className="text-2xl font-bold mb-2">{heading}</div>
      <ul className="list-group flex flex-col rounded-md">
        {items.map((item) => (
          <li
            key={item.id}
            className={`list-group-item relative block py-2 px-4 text-[#dee2e6] bg-[#212529] border border-[#495057] first:rounded-t-[inherit] last:rounded-b-[inherit] not-first:border-t-0 ${selectedIndex === item.id ? 'active text-white bg-third border-third' : ''
              }`}
            onClick={() => {
              setSelectedIndex(item.id);
              onSelectItem(item);
            }}
          >
            {/* Render only valid properties */}
            {item.name || 'Unnamed Item'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListGroup;