import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Card.css';
import ParticlesComponent from '../particles';

const roles = ['Admin', 'Teacher', 'Student'];

const UserCards = () => {
  const navigate = useNavigate();

  const handleCardClick = (role) => {
    navigate(`/login?role=${role.toLowerCase()}`);
  };

  return (
    <div className='Homepage'>
    <ParticlesComponent id="particles"/>
      <nav className="navbar">
        <ul className="nav-links">
          {/* <li><Link to="/">Home</Link></li> */}
          <li><Link to="/contact">Contact Us</Link></li>
          {/* <li><Link to="/privacy">Privacy</Link></li> */}
          <li><Link to="/help">Help</Link></li>
        </ul>
      </nav>
      <div className='heading'>
        <h1>𝕆𝕟𝕝𝕚𝕟𝕖 𝔼𝕩𝕒𝕞𝕚𝕟𝕒𝕥𝕚𝕠𝕟 𝕊𝕪𝕤𝕥𝕖𝕞</h1>
        <div className="user-cards">
          {roles.map((role) => (
            <div 
              key={role} 
              className={`card ${role.toLowerCase()}`} 
              onClick={() => handleCardClick(role)}
            >
              <h2>{role}</h2>
              <p className="card-footer">{role}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='footer'>
        <p>❚█══Welcome══█❚<br/>🆃🅾<br/>
          𝑶𝒏𝒍𝒊𝒏𝒆 𝑬𝒙𝒂𝒎𝒊𝒏𝒂𝒕𝒊𝒐𝒏 𝑺𝒚𝒔𝒕𝒆𝒎<br/>
          @ {new Date().getFullYear()}</p>
      </div>
    </div>
  );
};

export default UserCards;
