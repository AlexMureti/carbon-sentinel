import React from 'react'; // React: Core for components—no hooks needed here (pure display).


function Navbar({ currentView, onChangeView, user, onLogout, onSignInGoogle, onSignInGitHub }) { // Props: View state, user, functions.
  return (
    <nav className="bg-green-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Carbon Sentinel</h1>
      <div className="flex items-center space-x-2"> {/* Flex for buttons, space-x for gaps. */}
        <button
          className={`p-2 rounded ${currentView === 'citizen' ? 'bg-white text-green-600' : 'bg-transparent'}`}
          onClick={() => onChangeView('citizen')} // Calls setter to change view.
        >
          Citizen View
        </button>
        <button
          className={`p-2 rounded ${currentView === 'council' ? 'bg-white text-green-600' : 'bg-transparent'}`}
          onClick={() => onChangeView('council')}
        >
          Council View
        </button>
        {/* Conditional: If user logged in, show logout; else, login buttons. */}
        {user ? (
          <button onClick={onLogout} className="p-2 rounded bg-red-500">Logout ({user.email})</button> // onClick: Calls logout, shows email.
        ) : (
          <div className="space-x-2">
            <button onClick={onSignInGoogle} className="p-2 rounded bg-blue-500">Google</button>
            <button onClick={onSignInGitHub} className="p-2 rounded bg-gray-800">GitHub</button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;