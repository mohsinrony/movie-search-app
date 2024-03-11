import { useState, useEffect } from 'react';
import { updateProfile, updateEmail, updatePassword, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebase'; // Adjust the import path

const UserProfile = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const user = auth.currentUser;
    setUser(user);

    if (user !== null) {
        // Or you can get the user's profile data from Firestore
        const userRef = doc(firestore, 'users', user.uid);
        getDoc(userRef).then((userSnapshot) => {
            if (userSnapshot.exists()) {
                const userData = userSnapshot.data();
                if (userData) {
                    setDisplayName(userData.displayName);
                    setEmail(userData.email);
                }
            }
        }).catch((error) => {
            console.error('Error fetching user profile:', error.message);
        });
    }
}, []);


  useEffect(() => {
    const fetchUserProfile = async () => {
      setUser(auth.currentUser);
      
      
      if (user) {
        const userRef = doc(firestore, 'users', user.uid);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setDisplayName(userData.displayName);
          console.log('User displayName:', displayName);
          setEmail(userData.email);
          console.log('User email:', email);
        }
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateProfile = async () => {
    //setUser(auth.currentUser);
    

    try {
      // Update the user's display name
      await updateProfile(user as User, {
        displayName: displayName
    }).then(() => {
        // Profile updated!
        alert('Profile updated!');
        // ...
      }).catch((error) => {
        // An error occurred
        console.log(error);
        // ...
      });

      // Update the user's email (if changed)
        if (user){
            if (email !== user.email) {
            //await updateEmail(user, email);
            updateEmail(user, email).then(() => {
              // Email updated!
              alert('Email updated!');
              // ...
            }).catch((error) => {
              // An error occurred
              console.log(error);
              // ...
            });
          }}

      // Update the user's password (if changed)
      if (password) {
        await updatePassword(user as User, password as string);
      }

      // Update the user's profile data in Firestore
      if (user){
        const userRef = doc(firestore, 'users', user.uid);
        await setDoc(userRef, { displayName, email }, { merge: true });
    }
      

      console.log('User profile updated successfully!');
    } catch (error:any) {
      console.error('Error updating user profile:', error.message);
    }
  };

  return (
    <div>
      <h4>Your Details</h4>
      <form>
        <label>
          Display Name:
          <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          New Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit" onClick={handleUpdateProfile}>
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfile;