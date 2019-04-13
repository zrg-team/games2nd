import React from 'react'
import Parallax from '../../../libraries/Parallax/Parallax'
import { next, replace } from '../../../common/utils/navigation'
import banner from '../../../assets/images/main-banner.jpg'

class HeaderStore extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
    this.goto = this.goto.bind(this)
    this.onMenu = this.onMenu.bind(this)
    this.logout = this.logout.bind(this)
  }
  componentDidMount () {
    const { getPresentInformation } = this.props
    getPresentInformation()
  }
  onMenu () {
    const { open } = this.state
    this.setState({
      open: !open
    })
  }
  goto (page) {
    next(page)
  }
  logout () {
    const { signOut } = this.props
    signOut()
    replace('/')
  }
  render () {
    const { open } = this.state
    const { minimal = false, user, presents = {} } = this.props
    return (
      <Parallax
        id='home'
        className={`main-banner`}
        image={banner}
        style={minimal ? {
          height: open ? '80%' : 120
        } : {}}
      >
        <header className='header'>
          <div className='container-fluid px-lg-5'>
            <nav /* className='py-4' */>
              <div id='logo'>
                <h1>
                  <p onClick={() => this.goto('/')}><span className='fa fa-glide-g' aria-hidden='true' />ames</p>
                </h1>
              </div>

              <label htmlFor='drop' className='toggle'>Menu</label>
              <input type='checkbox' id='drop' onClick={this.onMenu} />
              <ul
                className='menu mt-2'
                style={{
                  width: '100%'
                }}
              >
                <li
                  className='active'
                  onClick={() => this.goto('/')}
                ><p>HOME</p></li>
                <li
                  onClick={() => this.goto('/shop')}
                >
                  <p>SHOP</p>
                </li>
                <li
                  onClick={() => {
                    user
                    ? this.goto('/sell')
                    : this.goto('/login')
                  }}
                ><p>SELL</p></li>
                <li><p>BLOG</p></li>
                <li>
                  <label htmlFor='drop-2' className='toggle'>ACCOUNT <span className='fa fa-angle-down' aria-hidden='true' /> </label>
                  {/* <p htmlFor='drop-2'>ACCOUNT <span className='fa fa-angle-down' aria-hidden='true' /></p> */}
                  <input type='checkbox' id='drop-2' />
                  {user
                    ? (<ul>
                      <li
                        onClick={() => this.goto('/room')}
                      ><p>ACCOUNT</p></li>
                      <li
                        onClick={this.logout}
                      ><p>LOGOUT</p></li>
                    </ul>)
                    : (<ul>
                      <li
                        onClick={() => this.goto('/login')}
                      ><p>LOGIN</p></li>
                    </ul>)
                  }
                </li>
              </ul>
            </nav>
          </div>
        </header>
        {!minimal && <div className='banner-info'>
          <p>Trending of the week</p>
          <h3 className='mb-4'>{
            presents.trendingOfWeek
              ? presents.trendingOfWeek.title
              : 'Find Your Favourist Games.'
          }</h3>
          <div className='ban-buttons'>
            {presents.trendingOfWeek
              ? <p
                onClick={() => {
                  next('/shop', {
                    name: presents.trendingOfWeek.title
                  })
                }}
                className='btn active'
              >Buy This Game</p>
              : null
            }
            <p
              onClick={() => this.goto('/shop')}
              className='btn'
            >Shop Now</p>
          </div>
        </div>}
      </Parallax>
    )
  }
}

export default HeaderStore
