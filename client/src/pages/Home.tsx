// import { useNavigate } from "react-router-dom";
// const Home = () => {
//     const navigate = useNavigate();
//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
//       {/* Header */}
//       <header className="w-full py-6 px-8 bg-gray-800 shadow-md">
//         <div className="max-w-6xl mx-auto flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-teal-400">Maintenance Tracker</h1>
//           <nav className="flex space-x-4">
//           <button
//             onClick={() => navigate("/login")}
//             className="text-white hover:text-teal-400 transition duration-300"
//           >
//             Login
//           </button>
//             <a
//               href="/signup"
//               className="text-white hover:text-teal-400 transition duration-300"
//             >
//               Signup
//             </a>
//           </nav>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="flex flex-col items-center text-center mt-12 px-6">
//         <h2 className="text-4xl md:text-6xl font-extrabold text-teal-400">
//           Simplify Maintenance Management
//         </h2>
//         <p className="text-gray-300 text-lg mt-4 max-w-3xl">
//           Streamline issue reporting and tracking for students and administrators.
//           Manage maintenance requests, update statuses, and track progress all in one place.
//         </p>
//         <div className="mt-8 flex space-x-4">
//           <a
//             href="/create-request"
//             className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg shadow-lg transition duration-300"
//           >
//             Get Started
//           </a>
//           <a
//             href="/my-requests"
//             className="border border-teal-500 hover:bg-teal-500 text-teal-500 hover:text-white px-6 py-3 rounded-lg transition duration-300"
//           >
//             View Requests
//           </a>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="mt-16 px-8 py-12 bg-gray-800 w-full">
//         <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
//           <div className="bg-gray-700 p-6 rounded-lg shadow-md text-center">
//             <h3 className="text-xl font-bold text-teal-400">Quick Reporting</h3>
//             <p className="text-gray-300 mt-2">
//               Easily report issues like broken equipment, leaks, or malfunctions in seconds.
//             </p>
//           </div>
//           <div className="bg-gray-700 p-6 rounded-lg shadow-md text-center">
//             <h3 className="text-xl font-bold text-teal-400">Real-Time Updates</h3>
//             <p className="text-gray-300 mt-2">
//               Stay updated with real-time status changes on your maintenance requests.
//             </p>
//           </div>
//           <div className="bg-gray-700 p-6 rounded-lg shadow-md text-center">
//             <h3 className="text-xl font-bold text-teal-400">Admin Tools</h3>
//             <p className="text-gray-300 mt-2">
//               Admins can manage, update, and resolve requests seamlessly.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Footer
//       <footer className="w-full py-6 bg-gray-800 mt-auto">
//         <div className="max-w-6xl mx-auto flex justify-between items-center">
//           <p className="text-gray-400 text-sm">
//             &copy; {new Date().getFullYear()} Maintenance Tracker. All Rights Reserved.
//           </p>
//           <div className="flex space-x-4">
//             <a href="#" className="text-gray-400 hover:text-teal-400">
//               Privacy Policy
//             </a>
//             <a href="#" className="text-gray-400 hover:text-teal-400">
//               Terms of Service
//             </a>
//           </div>
//         </div>
//       </footer> */}
//     </div>
//   );
// };

// export default Home;
// --------------------------------------------------
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for user data in localStorage on component mount
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (userStr && token) {
      try {
        const userData = JSON.parse(userStr);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };
  const hanleCreateRequest = () =>{
    if(user){
      navigate('/create-requests')
    }else{
      navigate('/login')
    }
  }
  const hanleViewRequest = () =>{
    if(user){
      navigate('/my-requests')
    }else{
      navigate('/login')
    }
  }
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      {/* Header */}
      <header className="w-full py-6 px-8 bg-gray-800 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-teal-400">Maintenance Tracker</h1>
          <nav className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {/* <span className="text-teal-400 font-medium">{user.name.split(' ')[0]}</span> */}
                  <h1 className='text-2xl font-medium'>Hello <br /> <span className='text-3xl font-semibold'>{user.name.split(' ')[0]} 👋</span></h1>
                  {/* {user.role && (
                    <span className="text-xs bg-teal-500 text-white px-2 py-1 rounded-full">
                      {user.role}
                    </span>
                  )} */}
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm text-white hover:text-teal-400 transition duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <button
                  onClick={() => navigate("/login")}
                  className="py-2 text-white hover:text-teal-400 transition duration-300"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="px-4 py-2 text-white hover:text-teal-400 transition duration-300"
                >
                  Signup
                </button>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mt-12 px-6">
        <h2 className="text-4xl md:text-6xl font-extrabold text-teal-400">
          Simplify Maintenance Management
        </h2>
        <p className="text-gray-300 text-lg mt-4 max-w-3xl">
          Streamline issue reporting and tracking for students and administrators.
          Manage maintenance requests, update statuses, and track progress all in one place.
        </p>
        <div className="mt-8 flex space-x-4">
          <button
            onClick={hanleCreateRequest}
            className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg shadow-lg transition duration-300"
          >
            Get Started
          </button>
          <button
            onClick={hanleViewRequest}
            className="border border-teal-500 hover:bg-teal-500 text-teal-500 hover:text-white px-6 py-3 rounded-lg transition duration-300"
          >
            View Requests
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-16 px-8 py-12 bg-gray-800 w-full">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-gray-700 p-6 rounded-lg shadow-md text-center hover:transform hover:scale-105 transition duration-300">
            <h3 className="text-xl font-bold text-teal-400">Quick Reporting</h3>
            <p className="text-gray-300 mt-2">
              Easily report issues like broken equipment, leaks, or malfunctions in seconds.
            </p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg shadow-md text-center hover:transform hover:scale-105 transition duration-300">
            <h3 className="text-xl font-bold text-teal-400">Real-Time Updates</h3>
            <p className="text-gray-300 mt-2">
              Stay updated with real-time status changes on your maintenance requests.
            </p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg shadow-md text-center hover:transform hover:scale-105 transition duration-300">
            <h3 className="text-xl font-bold text-teal-400">Admin Tools</h3>
            <p className="text-gray-300 mt-2">
              Admins can manage, update, and resolve requests seamlessly.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="w-full py-6 bg-gray-800 mt-auto">
        <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Maintenance Tracker. All Rights Reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <button
              onClick={() => navigate("/privacy")}
              className="text-gray-400 hover:text-teal-400 text-sm"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => navigate("/terms")}
              className="text-gray-400 hover:text-teal-400 text-sm"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default Home;
