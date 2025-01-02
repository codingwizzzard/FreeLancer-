import React from 'react'
import { Link } from 'react-router-dom'

const Aside = () => {
  return (
<nav className="pc-sidebar">
  <div className="navbar-wrapper">
    
    <div className="navbar-content">
      <ul className="pc-navbar">
        
        <li className="pc-item"><Link to={"/"} className="pc-link">
            <span className="pc-mtext" data-i18n="Sample Page">Earnings Overview</span></Link>
        </li>
        <li className="pc-item"><Link to={"/projects"} className="pc-link">
            <span className="pc-mtext" data-i18n="Sample Page">Projects Management</span></Link>
        </li>
        <li className="pc-item"><Link to={"/payments"} className="pc-link">
            <span className="pc-mtext" data-i18n="Sample Page">Payments Management</span></Link>
        </li>
      </ul>

    </div>
  </div>
</nav>

  )
}

export default Aside