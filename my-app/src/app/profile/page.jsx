"use client";
import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/sidebar";
import { IoHomeOutline } from "react-icons/io5";
import { LuPencil } from "react-icons/lu";
import Feed from "../../components/feed";
import ReactModal from 'react-modal';
import Cookies from 'js-cookie'

export default function page() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [currentEmail, setCurrentEmail] = useState('');
  const [emailToChange, setEmailToChange] = useState('');
  const [verificationToken, setVerificationToken] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newprofileImage, setNewProfileImage] = useState(null);
  const [imageError, setImageError] = useState('');
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const userId = Cookies.get('userID');

  useEffect(() => {
    fetch(`/userID/${userId}`)
      .then(response => response.json())
      .then(data => {
        setUsername(data.username);
        setProfilePicture(data.profilePicture);
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
    setModalContent(null);
    setErrorMessage('');
    setNewUsername('');
  };

  const handleEditProfileClick = () => {
    openModal();
  };

  const renderModalHeader = () => {
    const isFormOpen = modalContent === 'username' || modalContent === 'email' || modalContent === 'password';
  
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', alignItems: 'center', color: '#fff' }}>
        {isFormOpen && (
          <button onClick={() => setModalContent(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', fontSize: '1.5rem' }}>
            {'<'}
          </button>
        )}
        {!isFormOpen && <div />}
        <button onClick={closeModal} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', fontSize: '1.5rem' }}>
          X
        </button>
      </div>
    );
  };

  const renderModalContent = () => {
    const buttonStyle = {
      padding: '10px',
      borderRadius: '6px',
      cursor: 'pointer',
      backgroundColor: '#f8b47c',
      textAlign: 'center',
    };

    if (successMessage) {
      return (
        <div>
          <div style={{ color: 'green', padding: '20px', textAlign: 'center' }}>
            {successMessage}
          </div>
          <button
            onClick={() => {
              setModalContent(null);
              setSuccessMessage('');
              setErrorMessage('');
            }}
            style={buttonStyle}
          >
            Go Back
          </button>
        </div>
      );
    }
    
    switch (modalContent) {
      case 'username':
        return (
          <form onSubmit={handleUsernameChange} style={{ color: 'white' }}>
            <label htmlFor="newUsername">New Username:</label>
            <input
              id="newUsername"
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              required
              style={{ margin: '10px 0', color:"black", borderRadius: "8px", padding: '8px', width: 'calc(100% - 16px)' }}
            />
            <button type="submit" style={buttonStyle}>
              Change Username
            </button>
            {errorMessage && <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>}
          </form>
        );
      case 'email':
        return (
          <form onSubmit={handleEmailChangeRequest} style={{ color: 'white' }}>
            <label htmlFor="currentEmail">Current Email:</label>
            <input
              id="currentEmail"
              type="email"
              value={currentEmail}
              onChange={(e) => setCurrentEmail(e.target.value)}
              required
              style={{ margin: '10px 0', color:"black", borderRadius: "8px", padding: '8px', width: 'calc(100% - 16px)' }}
            />
            <label htmlFor="emailToChange">New Email:</label>
            <input
              id="emailToChange"
              type="email"
              value={emailToChange}
              onChange={(e) => setEmailToChange(e.target.value)}
              required
              style={{ margin: '10px 0', color:"black", borderRadius: "8px", padding: '8px', width: 'calc(100% - 16px)' }}
            />
            <button type="submit" style={buttonStyle}>
              Send Verification Code
            </button>
            {errorMessage && <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>}
          </form>
        );
      case 'enterVerificationCode':
        return (
          <form onSubmit={handleEmailVerification} style={{ color: 'white' }}>
            <label htmlFor="verificationToken">Verification Code:</label>
            <input
              id="verificationToken"
              type="text"
              value={verificationToken}
              onChange={(e) => setVerificationToken(e.target.value)}
              required
              style={{ margin: '10px 0', color:"black", borderRadius: "8px", padding: '8px', width: 'calc(100% - 16px)' }}
            />
            <button type="submit" style={buttonStyle}>
              Verify Email Change
            </button>
            {errorMessage && <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>}
          </form>
        );
      case 'password':
        return (
          <form onSubmit={handlePasswordChange} style={{ color: 'white' }}>
            <label htmlFor="currentPassword">Current Password:</label>
            <input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              style={{ margin: '10px 0', color:"black", borderRadius: "8px", padding: '8px', width: 'calc(100% - 16px)' }}
            />
            <label htmlFor="newPassword">New Password:</label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              style={{ margin: '10px 0', color:"black", borderRadius: "8px", padding: '8px', width: 'calc(100% - 16px)' }}
            />
            <button type="submit" style={buttonStyle}>
              Change Password
            </button>
            {errorMessage && <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>}
          </form>
        );
      case 'changeProfilePicture':
        return (
          <form onSubmit={handleProfilePictureChange} style={{ color: 'white' }}>
            <label htmlFor="profileImage">Upload Profile Picture:</label>
            <input
              id="profileImage"
              type="file"
              accept=".png,.jpg,.jpeg"
              onChange={handleProfileImageChange}
              style={{ margin: '10px 0', color: "black", borderRadius: "8px", padding: '8px' }}
            />
            <button type="submit" style={buttonStyle}>
              Upload
            </button>
            {imageError && <div style={{ color: 'red', marginTop: '10px' }}>{imageError}</div>}
          </form>
        );
      case 'deleteAccount':
        return (
          <div>
            <p>Are you sure you want to delete your account?</p>
            <button onClick={handleDeleteAccount} style={buttonStyle}>
              Delete Account
            </button>
            <button onClick={() => setModalContent(null)} style={buttonStyle}>
              Cancel
            </button>
          </div>
        );
      default:
        return (
          <div 
          className="options-container" 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '25px',
          }}
        >
          <button onClick={() => setModalContent('username')} style={buttonStyle}>
            Change Username
          </button>
          <button onClick={() => setModalContent('email')} style={buttonStyle}>
            Change Email
          </button>
          <button onClick={() => setModalContent('password')} style={buttonStyle}>
            Change Password
          </button>
          <button onClick={() => setModalContent('changeProfilePicture')} style={buttonStyle}>
            Change Profile Picture
          </button>
          <button onClick={() => setModalContent('deleteAccount')} style={buttonStyle}>
            Delete Account
          </button>
        </div>
        );
    }
  };

  const handleUsernameChange = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/update-username', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userId, newUsername }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error);
      }

      setSuccessMessage('Username updated successfully');
      setNewUsername('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleEmailChangeRequest = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/update-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userId, curremail: currentEmail, newemail: emailToChange }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Unknown error occurred');
      }

      setModalContent('enterVerificationCode');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleEmailVerification = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userId, verificationToken: verificationToken }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Unknown error occurred');
      }
  
      setSuccessMessage('Email updated successfully');
      setCurrentEmail('');
      setEmailToChange('');
      setVerificationToken('');
      setModalContent(null);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/update-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userId, currentPassword: currentPassword, newPassword: newPassword }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error);
      }

      setSuccessMessage('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleProfilePictureChange = async (e) => {
    e.preventDefault();
  
    if (!newprofileImage) {
      setImageError('Please select a valid image file');
      return;
    }
  
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('profilePicture', newprofileImage);
  
    try {
      const response = await fetch('/update-profile-picture', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error);
      }
  
      setSuccessMessage('Profile picture updated successfully');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!['image/png', 'image/jpg', 'image/jpeg'].includes(file.type) || file.size > 5000000) { // 5MB limit
        setImageError('File must be a PNG, JPG, or JPEG and less than 5MB');
        setNewProfileImage(null);
      } else {
        setImageError('');
        setNewProfileImage(file);
      }
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(`/delete-account/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete account');
      }

      setSuccessMessage('Your account has been deleted');
      window.location.href = '/login';
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <main className="h-screen bg-shark-950 w-full overflow-hidden">
      <div className="flex">
        <Sidebar className="w-1/5"></Sidebar>
        <div className="w-10/12 h-screen">
          <div
            id="info"
            className="flex flex-col justify-center  items-center h-full"
          >
            <div className="mt-4 w-4/5 h-full flex flex-col justify-center items-center">
              <div className="w-full flex justify-center items-center gap-10 h-2/5">
                <div className="w-40 h-40 rounded-full">
                  <img src={profilePicture} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} className="object-contain rounded-full" />
                </div>
                <div>
                  <h1 className="text-3xl flex justify-center items-center font-poppins font-normal animate-text bg-gradient-to-r from-teal-500 via-tacao-300 to-teal-500 bg-clip-text text-transparent">
                    {username}
                  </h1>
                  <button
                    onClick={handleEditProfileClick}
                    className="text-m mt-6 font-semibold bg-tacao-300 w-full flex justify-center items-center text-white rounded-lg px-6 py-2 block shadow-xl hover:animate-text group hover:font-bold hover:bg-gradient-to-r  hover:from-teal-500 hover:via-tacao-300 hover:to-teal-500 hover:bg-clip-text hover:text-transparent">
                    Edit Profile <LuPencil className="ml-2 group-hover:text-teal-500" />
                  </button>
                  <ReactModal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={{
                      overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)'
                      },
                      content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        background: '#282c34',
                        borderRadius: '8px',
                        border: 'none',
                        width: '40%',
                        color: 'white',
                        padding: '50px'},
                    }}
                  >
                    {renderModalHeader()}
                    {renderModalContent()}
                  </ReactModal>
                  <div className="flex justify-center items-center gap-4">
                    <h1 className="text-tacao-300 text-m font-normal mt-6 flex justify-center items-center">
                      <span className="font-bold mr-1">10</span> Friends
                    </h1>
                    <h1 className="text-tacao-300 text-m font-normal mt-6 flex justify-center items-center">
                      <span className="font-bold mr-1">2</span> Posts
                    </h1>
                  </div>
                </div>
              </div>
              <div className="h-1/5 w-full flex justify-center items-center border-b border-dotted">
                <div className="w-1/3">
                  <div className="flex justify-center items-center">
                    <h1 className=" animate-text w-1/3 bg-gradient-to-r from-teal-500 via-tacao-300 to-teal-500 bg-clip-text text-transparent my-10 mt-7 pb-3 text-xl font-semibold flex justify-center border-b-2 border-teal-500">
                        My Posts
                    </h1>
                  </div>
                </div>
              </div>
              <Feed className="w-5/12"></Feed>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
