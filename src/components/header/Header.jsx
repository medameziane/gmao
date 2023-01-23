import './header.css'

const toggleNav = ()=>{
  document.querySelector('.sidebar').classList.toggle('hidden')
  document.querySelector('.sidebar').classList.toggle('hidden-mobile')
  document.querySelector('.container').classList.toggle('full')
  document.querySelector('.header').classList.toggle('full')
  localStorage.setItem("sidebar","0")
}
const showSettings = ()=>{
  document.querySelector(".settings-area").classList.add("show")
  document.querySelector(".overly").style.display = "block"
}
const hideSettings = ()=>{
  document.querySelector(".settings-area").classList.remove("show")
  document.querySelector(".overly").style.display = "none"
}
const handleLight = ()=>{
  document.querySelector(".dot-dark").classList.remove("active")
  document.querySelector(".dot-light").classList.add("active")
}
const handleDark = ()=>{
  document.querySelector(".dot-dark").classList.add("active")
  document.querySelector(".dot-light").classList.remove("active")
}
const handleTheme = (e)=>{
  if(e.target.value==="dark"){
    document.body.classList.add("is-dark")
    localStorage.setItem('color_option','green')

  }else{
    document.body.classList.remove("is-dark")
    localStorage.clear();
  }

}

if(localStorage.getItem('sidebar')){
  window.addEventListener('load',()=>{
    document.querySelector('.container').classList.add('full')
    document.querySelector('.header').classList.add('full')
    document.querySelector('.sidebar').classList.add('hidden')
  })
}
if(localStorage.getItem('color_option')){
  document.body.classList.add("is-dark")
  window.addEventListener('load',()=>{
    document.querySelector(".dot-dark").classList.add("active")
    document.querySelector(".dot-light").classList.remove("active")
  })
}

// Check local storage of main color
if(localStorage.getItem('listColor')){
  document.documentElement.style.setProperty("--main-color",localStorage.getItem('listColor'))
  window.addEventListener('load',()=>{
    document.querySelector(".colors .color.active").classList.remove("active")
  })
}

// List Colors
let listColors = document.querySelectorAll(".colors li.color")
listColors.forEach(col=>{
  col.addEventListener('click',(e)=>{
    document.documentElement.style.setProperty("--main-color",e.target.dataset.color)
    localStorage.setItem('listColor',e.target.dataset.color)
  })
})

function Header() {
  return (
    <div className='header'>
      <div className="toggle-nav">
        <i className="fa-solid fa-bars toggle-sidebar" onClick={toggleNav}></i>
        {/* <p onClick={toggleNav}>Show</p> */}
      </div>
      <div className="header-items">
        <div className="header-settings">
          <i className="fa-solid fa-gear settings-icon" onClick={showSettings}></i>
          {/* <p onClick={showSettings}>Show</p> */}
          <div className="settings-area">
            <i className="fa-solid fa-xmark close-settings" onClick={hideSettings}></i>
            <div className="settings-header"><h2>Settings</h2></div>
            <div className="settings-content">
              <div className="box-settings">
                <h3 className="title-header-setting">Color theme</h3>
                <div className="setting-content">
                  <div className="color-theme">
                    <ul>    
                      <li><input type="radio" onChange={handleTheme} value="light" id='light'name='theme'/></li>
                      <li><input type="radio" onChange={handleTheme} value="dark" id='dark' name='theme'/></li>

                      <label htmlFor='light' onClick={handleLight} className='theme light'>
                        <div className='theme-select'>
                          <span className="dot dot-light active"></span>
                        </div> Light Mode
                      </label>

                      <label htmlFor='dark' onClick={handleDark} className='theme dark'>
                        <div className='theme-select'>
                          <span className="dot dot-dark"></span>
                        </div>Dark Mode
                      </label>

                    </ul>
                  </div>
                </div>
              </div>

              {/* <div className="box-settings">
                <h3 className="title-header-setting">Main color</h3>
                <div className="setting-content">
                  <div className="list-colors">
                    <ul className='colors'>
                      <li className="color active" data-color="#3498db"></li>
                      <li className="color" data-color="#c0392b"></li>
                      <li className="color" data-color="#27ae60"></li>
                      <li className="color" data-color="#8e44ad"></li>
                      <li className="color" data-color="#ff9f1a"></li>
                      <li className="color" data-color="#22a6b3"></li>
                    </ul>
                  </div>
                </div>
              </div> */}

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
