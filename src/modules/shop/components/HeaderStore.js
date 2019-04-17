import React from 'react'
import { next, replace } from '../../../common/utils/navigation'

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
    // const { open } = this.state
    const { minimal = false, user, presents = {} } = this.props
    return (
      <div
        id='home'
        className={`main-banner`}
        style={minimal ? {
          height: 120
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
                <li
                  onClick={() => {
                    this.goto('/blogs')
                  }}
                ><p>BLOGS</p></li>
                {user
                  ? (<li
                    onClick={() => this.goto('/room')}
                  ><p>ACCOUNT</p></li>)
                  : (<li
                    onClick={() => this.goto('/login')}
                  ><p>LOGIN</p></li>)
                }
              </ul>
            </nav>
          </div>
        </header>
        {!minimal && <div
          className='banner-info'
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            flexDirection: 'column',
            paddingBottom: 120
          }}
        >
          <p>Trending of the week</p>
          <h3 className='mb-4'>{
            presents.trendingOfWeek
              ? presents.trendingOfWeek.title
              : 'Find Your Favourist Games.'
          }</h3>
          <div className='ban-buttons'>
            {presents.trendingOfWeek
              ? <p
                style={{ marginTop: 5 }}
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
              style={{ marginTop: 5 }}
              onClick={() => this.goto('/shop')}
              className='btn'
            >Shop Now</p>
          </div>
        </div>}
      </div>
    )
  }
}

export default HeaderStore
