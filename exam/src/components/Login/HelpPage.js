import React from 'react';
import './main.css'
import '../../App.css'
import ParticlesComponent from '../particles';


function HelpPage() {
  return (
    <div className='box'>
    <ParticlesComponent id="particles"/>
      <h1>Help Page</h1>
     
     <h3> 1.Account Creation</h3>
     <p>Creating an account is straightforward. Click on 'Sign Up' and fill in your personal information such as name, email, and a strong password. After submitting, you'll receive a verification email. Click on the link in that email to verify your account and complete the registration process.</p>
      
      <h3> 2.Login/Logout</h3>
      <p>Log in to your account by entering your registered email and password on the login page. For security, always log out after your session by clicking the 'Logout' button located in the user menu at the top-right corner of the screen, ensuring your account remains secure.</p>
      
      <h3>3.Profile Setup</h3>
      <p>After logging in, go to 'My Profile' to complete your profile setup. Here, you can update personal details, upload a profile picture, and set your preferences. Keeping your profile up-to-date ensures you receive relevant notifications and helps in personalizing your examination experience.</p>
      
      <h3>4.Dashboard Overview</h3>
      <p>The dashboard is your central hub, providing an overview of your upcoming exams, recent notifications, and quick links to essential features. It allows you to track your exam schedule, see recent activity, and easily navigate to different parts of the system, making it easier to stay organized.</p>
     
     <h3>5.Registering for an Exam</h3>
     <p>To register for an exam, visit the 'Exams' section. Browse through the list of available exams, select the desired exam, and click 'Register.' Follow the prompts to confirm your registration. Ensure you review any specific requirements or instructions related to the exam before confirming your registration</p>
     
     
      <p>For more detailed inquiries, please visit our <a href="/contact">Contact Page</a>.</p>
    </div>
  );
}

export default HelpPage;