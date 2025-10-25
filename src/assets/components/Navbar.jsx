import React from 'react';

function Navbar({ currentView, onChangeView }) { // Props: currentView (string like 'citizen'), onChangeView (function from App to update state).
  return (
    <nav className="bg-green-600 text-white p-4 flex justify-between items-center"> {/* Tailwind classes: Green background, white text, padding 4, flex for horizontal layout, justify-between (space buttons), items-center (vertical align). */}
      <h1 className="text-xl font-bold">Carbon Sentinel</h1>
      <div> {/* Wrapper div for buttons. */}
        <button
          className={`mr-4 p-2 rounded ${currentView === 'citizen' ? 'bg-white text-green-600' : ''}`} // Tailwind: Margin-right 4, padding 2, rounded corners. Conditional: If currentView is 'citizen', add white bg + green text (active style).
          onClick={() => onChangeView('citizen')} // onClick: Calls prop function with 'citizen'—updates App state, re-renders view.
        >
          Citizen View
        </button>
        <button
          className={`p-2 rounded ${currentView === 'council' ? 'bg-white text-green-900' : ''}`} // Same as above, but for 'council' view.
          onClick={() => onChangeView('council')} // onClick: Switches to 'council'.
        >
          Council View
        </button>
      </div>
    </nav>
  );
}

export default Navbar; 