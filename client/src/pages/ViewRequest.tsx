// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { handleError, handleSuccess } from "../utils";
// import { ToastContainer } from "react-toastify";

// interface Request {
//   id: number;
//   description: string;
//   roomNumber: string;
//   wing: string;
//   status: string;
//   createdAt: string;
//   updatedAt: string;
//   studentId?: number;
// }

// const ViewRequests = () => {
//   const [requests, setRequests] = useState<Request[]>([]);
//   // const [error, setError] = useState<string>("");
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchRequests = async () => {
//       setLoading(true);
//       // setError("");
//       const token = localStorage.getItem("token");

//       if (!token) {
//         handleError("Unauthorized. Please login first.");
//         navigate("/login");
//         return;
//       }

//       try {
//         const response = await fetch("http://localhost:3000/request/all", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.message || "Failed to fetch requests");
//         }

//         const data = await response.json();
//         const fetchedRequests = data.data.requests || [];

//         const sortedRequests = fetchedRequests.sort((a: Request, b: Request) => {
//           const statusOrder: { [key: string]: number } = { completed: 2, "in progress": 1, pending: 0 };
//           return statusOrder[a.status as keyof typeof statusOrder] - statusOrder[b.status as keyof typeof statusOrder];
//         });
        
//         setRequests(sortedRequests);
//       } catch (err: any) {
//         handleError(err.message);
//         setRequests([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRequests();
//   }, []);

 
//   const handleStatusUpdate = async (requestId: number, newStatus: string) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         handleError("Unauthorized. Please login first.");
//       }
//       const response = await fetch(`http://localhost:3000/request/${requestId}/status`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ status: newStatus }),
//       });
//       const responseData = await response.json(); // Parse JSON response
//       console.log("Response from API:", responseData);
//       const {message , success} = responseData;
//   console.log(message);
//       if(success){
//         handleSuccess(message); 
//       }else{
//         handleError(message);
//       }
//       const updatedRequests = requests.map((req) =>
//         req.id === requestId ? { ...req, status: newStatus } : req
//       );
//       setRequests(updatedRequests);
//     } catch (error: any) {
//       // console.error("Error updating status:", error.message);
//       handleError(error.message);
//     }
//   };
  
//   const handleDeleteRequest = async (requestId: number) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         handleError("Unauthorized. Please login first.");
//       }
//       const response = await fetch(`http://localhost:3000/request/${requestId}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         handleError(errorData.message || "Failed to delete request");
//       }

//       setRequests(requests.filter((req) => req.id !== requestId));
//     } catch (error: any) {
//       handleError(error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10">
//       <h1 className="text-3xl font-bold text-teal-400 mb-6">Maintenance Requests</h1>

//       {loading && <p>Loading requests...</p>}

//       {requests.length === 0 && !loading ? (
//         <p className="text-gray-400">No requests available to display.</p>
//       ) : (
//         <div className="w-full max-w-4xl">
//           <table className="table-auto w-full bg-gray-800 text-gray-200 rounded-lg shadow-lg overflow-hidden">
//             <thead>
//               <tr className="bg-teal-500 text-white">
//                 <th className="px-4 py-2">Room No</th>
//                 <th className="px-4 py-2">Wing</th>
//                 <th className="px-4 py-2">Description</th>
//                 <th className="px-4 py-2">Status</th>
//                 <th className="px-4 py-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {requests.map((request) => (
//                 <tr key={request.id} className="border-t border-gray-700">
//                   <td className="px-4 py-2 text-center">{request.roomNumber || "N/A"}</td>
//                   <td className="px-4 py-2 text-center">{request.wing}</td>
//                   <td className="px-4 py-2">{request.description}</td>
//                   <td className="px-4 py-2 text-center capitalize">
//                     <select
//                       value={request.status}
//                       onChange={(e) => handleStatusUpdate(request.id, e.target.value)}
//                       disabled={request.status === "resolved"} // Disable if completed
//                       className="bg-gray-700 text-white border border-gray-600 rounded-lg p-1"
//                     >
//                       <option value="pending">Pending</option>
//                       <option value="in-progress">In Progress</option>
//                       <option value="resolved">Resolved</option>
//                     </select>
//                   </td>
//                   <td className="px-4 py-2 text-center">
//                     <button
//                       onClick={() => handleDeleteRequest(request.id)}
//                       className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
      
//         <p className="text-gray-400 text-sm text-center mt-4">
//         want to create a new request?{" "}
//           <a href= "/create-requests" className="text-teal-400 hover:underline">
//            Click here
//           </a>
//         </p>
//       <ToastContainer/>
//     </div>
//   );
// };

// export default ViewRequests;
// -------------------------------------
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils"; // You'll need to define these functions
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import react-toastify CSS


interface Request {
  id: number;
  description: string;
  roomNumber: string;
  wing: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  studentId?: number;
}

const ViewRequests = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        handleError("Unauthorized. Please login first.");
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/request/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch requests");
        }

        const data = await response.json();
        const fetchedRequests = data.data.requests || [];
        setRequests(fetchedRequests); //No need to sort here, we'll sort later for display

      } catch (err: any) {
        handleError(err.message);
        setRequests([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Separate requests by status. Sorting happens here for display.
  const pendingRequests = requests
    .filter((req) => req.status === "pending")
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); // Sort by createdAt DESC

  const inProgressRequests = requests
    .filter((req) => req.status === "in-progress")
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const resolvedRequests = requests
    .filter((req) => req.status === "resolved")
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());


  const handleStatusUpdate = async (requestId: number, newStatus: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        handleError("Unauthorized. Please login first.");
        return; //Added return to stop further execution
      }
      const response = await fetch(`http://localhost:3000/request/${requestId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const responseData = await response.json();
      const { message, success } = responseData;
      if (success) {
        handleSuccess(message);
      } else {
        handleError(message);
      }
      const updatedRequests = requests.map((req) =>
        req.id === requestId ? { ...req, status: newStatus } : req
      );
      setRequests(updatedRequests);
    } catch (error: any) {
      handleError(error.message);
    }
  };

  const handleDeleteRequest = async (requestId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        handleError("Unauthorized. Please login first.");
        return; //Added return to stop further execution
      }
      const response = await fetch(`http://localhost:3000/request/${requestId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        handleError(errorData.message || "Failed to delete request");
        return; //Added return to stop further execution
      }

      setRequests(requests.filter((req) => req.id !== requestId));
    } catch (error: any) {
      handleError(error.message);
    }
  };

  const renderRequestTable = (requests: Request[], title: string) => {
    if (requests.length === 0) {
      return <p className="text-gray-400">No {title.toLowerCase()} requests.</p>;
    }
    return (
      <div className="w-full max-w-4xl mb-8">
        <h2 className="text-xl font-bold text-teal-400 mb-2">{title} Requests</h2>
        <table className="table-auto w-full bg-gray-800 text-gray-200 rounded-lg shadow-lg overflow-hidden">
          <thead>
            <tr className="bg-teal-500 text-white">
              <th className="px-4 py-2">Room No</th>
              <th className="px-4 py-2">Wing</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id} className="border-t border-gray-700">
                <td className="px-4 py-2 text-center">{request.roomNumber || "N/A"}</td>
                <td className="px-4 py-2 text-center">{request.wing}</td>
                <td className="px-4 py-2">{request.description}</td>
                <td className="px-4 py-2 text-center capitalize">
                  <select
                    value={request.status}
                    onChange={(e) => handleStatusUpdate(request.id, e.target.value)}
                    disabled={request.status === "resolved"}
                    className="bg-gray-700 text-white border border-gray-600 rounded-lg p-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handleDeleteRequest(request.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-teal-400 mb-6">Maintenance Requests</h1>

      {loading && <p>Loading requests...</p>}

      {renderRequestTable(pendingRequests, "Pending")}
      {renderRequestTable(inProgressRequests, "In Progress")}
      {renderRequestTable(resolvedRequests, "Resolved")}

      <p className="text-gray-400 text-sm text-center mt-4">
        Want to create a new request?{" "}
        <a href="/create-requests" className="text-teal-400 hover:underline">
          Click here
        </a>
      </p>
      <ToastContainer />
    </div>
  );
};

export default ViewRequests;