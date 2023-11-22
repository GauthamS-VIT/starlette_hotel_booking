import React,{useEffect} from "react";
import Aos from 'aos'
import 'aos/dist/aos.css'

function Navbar() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(()=>{
    Aos.init({duration : 1000});
},[])


  function logout(){
    localStorage.removeItem("currentUser")
    window.location.href='/login'
  }
  return (
    <div>
      <nav class="navbar navbar-expand-lg ">
        <div data-aos='fade-right'>
          
        <a class="navbar-brand" href="/home">
        <i class="far fa-star mr-2"></i>
          STARLETTE
        </a>
        </div>
 
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" ><i class="fa fa-bars" style={{color:'white'}}></i></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav" data-aos='fade-left'>
          <ul class="navbar-nav mr-3">
            {user ? (
              <>
                <div class="dropdown">
                  <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i class="fa fa-user mr-2"></i>{user.name}
                  </button>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a class="dropdown-item" href="/profile">
                    <i class="fas fa-user mr-3"></i>
                      Profile
                    </a>
                    <a class="dropdown-item" href="#" onClick={logout}>
                    <i class="fas fa-sign-out mr-3"></i>
                      Logout
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <>
                <li class="nav-item active">
                  <a class="nav-link" href="/register">
                  <i class="fa fa-user-plus mr-2"></i>
                    Register
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/login">
                  <i class="fa fa-sign-in mr-2"></i>
                  Login
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
