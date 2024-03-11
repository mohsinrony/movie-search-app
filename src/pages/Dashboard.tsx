// Dashboard.jsx WORKING
import { useEffect, useState } from 'react';
import { auth } from '../firebase'; // Import the auth object
import UserProfile from '../components/UserProfile';
import {onAuthStateChanged, User} from 'firebase/auth'
//import { useNavigate } from 'react-router-dom';
import Auth from './Auth';





const Dashboard = () => {
  useEffect(() => {
       
    document.title = `Dashboard | T3MDB`;

  }, []);


  const [user, setUser] = useState<User | null>(null);
  console.log('User:', user);
  //const [displayName, setDisplayName] = useState(null);


  useEffect(() => {
    // Listen for changes in the user's authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  // If the user is not signed in, you can render alternative content or redirect
  if (!user) {
    /* return <p id='plsSignIn'>Please  <Link to={'/'}>&nbsp; sign in &#160;</Link> to view this content.</p>; */
    return <Auth/>
  }
  

  return (
    <div className='container'>
      <div id="dashPage">
      <div id='dash'>
        
        <h2>Dashboard</h2>
        <h3>Hello {user?.displayName || 'there'}!</h3>
        {/* <p>Other user details will go here</p> */}
        

        <UserProfile/>

      </div>
      </div>
    </div>
  );

};

export default Dashboard;
