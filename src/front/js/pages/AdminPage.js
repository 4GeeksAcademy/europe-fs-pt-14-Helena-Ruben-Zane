import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';

export const AdminPage = () => {
const [users, setUsers] = useState([]);
const [selectedEmail, setSelectedEmail] = useState("");
const [loading, setLoading] = useState(true);
const [day, setDay] = useState("");
const [location, setLocation] = useState("");
const [meetingPoint, setMeetingPoint] = useState("");
const [hour, setHour] = useState("");
const [link, setLink] = useState("");
const [userLevel, setUserLevel] = useState(null)
const [userToken, setUserToken] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      navigate("/login");
      return;
    }
    setUserToken(userToken);

    fetch(`${process.env.BACKEND_URL}/api/userslevel`, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })
    .then(response => response.json())
    .then(data => {
      setUserLevel(data.level);
    })
    .catch(error => {
      console.error('Error fetching user level:', error);
      navigate("/login");
    });
 }, [navigate]);


 useEffect(() => {
    const routeRequirement = "/api/users";
    const url = `${process.env.BACKEND_URL}${routeRequirement}`;
    fetch(url)
 .then(response => response.json())
 .then(data => {
    setUsers(data.results);
    setLoading(false);
 })
      .catch(error => {
        console.error(`Error fetching users: ${error}`);
        setLoading(false);
      });
 }, []);

 const handlePromote = () => {
  const adminRouteRequirement = "/api/admin";
  const url = `${process.env.BACKEND_URL}${adminRouteRequirement}`;
  
  fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: selectedEmail
    }),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log(data.message || data.error);
    alert('User updated successfully!');
  
    return fetch(`${process.env.BACKEND_URL}/api/stripelink`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: selectedEmail,
        stripe_link_integration: link
      }),
    });
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log(data.message || data.error);
    alert('Stripe link updated successfully!');
  })
  .catch(error => {
    console.error(`Error updating user or Stripe link: ${error}`);
  });
 };
 

 if (loading) {
    return <div>Loading...</div>;
 }

 const handleSubmit = (event) => {
  event.preventDefault();
   
  const adminRouteRequirement = "/api/event";
  const url = `${process.env.BACKEND_URL}${adminRouteRequirement}`;
    
  const eventData = {
       day: day,
       hour: hour,
       location: location,
       meeting_point: meetingPoint,
  };
   
  fetch(url, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(eventData),
  })
       .then(response => {
           if (!response.ok) {
             throw new Error('Network response was not ok');
           }
           return response.json();
       })
       .then(data => {
         console.log('Success:', data);
         alert("Event created successfully"); 
       })
       .catch((error) => {
         console.error('Error:', error);
       });
 };
 if (loading) {
  return <div>Loading...</div>;
}

if (userLevel !== 3) {
  return <div>Access denied. Only users with level 3 can access this page.</div>;
}

 return (
  <div>
     ...
     <h3>Select a user email to update for level 2, and insert the link to conect the user with stripe</h3>
     <div>
      <select onChange={e => setSelectedEmail(e.target.value)}>
      {users.map(user => (
 <option key={user.email} value={user.email}>
    {user.email}
 </option>
        ))}
      </select>
      <input type="text" value={link} onChange={e => setLink(e.target.value)} />
      <button onClick={handlePromote}>Promote</button>
    </div>
    <h3>Create the next event</h3>
     <form onSubmit={handleSubmit}>
       <label>
         Day:
         <input type="date" value={day} onChange={e => setDay(e.target.value)} />
       </label>
       <label>
         Hour:
         <input type="time" value={hour} onChange={e => setHour(e.target.value)} />
       </label>
       <label>
         Location:
         <input type="text" value={location} onChange={e => setLocation(e.target.value)} />
       </label>
       <label>
         Meeting Point:
         <input type="text" value={meetingPoint} onChange={e => setMeetingPoint(e.target.value)} />
       </label>
       <input type="submit" value="Submit" />
     </form>
     <Link to="/userdata">
        <button >
          Go to User Information Page
        </button>
      </Link> 
  </div>
    
 );
};
