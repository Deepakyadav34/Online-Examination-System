import React from 'react';
import './main.css'
import ParticlesComponent from '../particles';


function ContactPage() {
  return (
    <div className='contact' >
    <ParticlesComponent id="particles"/>
      <h1>Contact Us</h1>
      <br/>
      <br/>
      <br/>
      <p className='cc'>Please feel free to Contact Us on :</p>
      <p className='cc'>Email: neeraj@gmail.com, deepak@gmail.com,isha@gmail.com,ayush@gmail.com</p>
      <p className='cc'>Phone:+91-1234567890</p>
      <p className='cc'>Address:1234,Kanpur,India</p>
    </div>
  );
}

export default ContactPage;