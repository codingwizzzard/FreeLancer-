import React from 'react'
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login'); 
  };
  return (
    <header className="pc-header">  
    <div className="header-wrapper"> 
      
      <div className="ms-auto">
        <ul className="list-unstyled">
          <li className="dropdown pc-h-item">
            
            <button href="#!" className="dropdown-item" onClick={handleLogout}>
                <i className="ph-duotone ph-power" />
                <span style={{fontSize: '17px'}}>Logout</span>
              </button>
          </li>
        </ul>
      </div>
    </div>
  </header>
  )
}

export default Header