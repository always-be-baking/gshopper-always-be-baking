import React from 'react'
import {Link} from 'react-router-dom'

const HomePage = () => {
  return (
    <div className="homeCategories">
      <div>
        <Link to="/cakes">
          <img src="/images/Maracaibo.png" />
          <p>Cakes</p>
        </Link>
      </div>
      <div>
        <Link to="/pastries">
          <img src="/images/mille_feuille_patissier_bondu_paviot_1_928d.png" />
          <p>Pastries</p>
        </Link>
      </div>
      <div>
        <Link to="cookies">
          <img src="/images/cookies.png" />
          <p>Cookies</p>
        </Link>
      </div>
    </div>
  )
}

export default HomePage
