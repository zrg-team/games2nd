import React from 'react'
import { next } from '../../../common/utils/navigation'

class FooterStore extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      message: ''
    }
    this.onMessage = this.onMessage.bind(this)
  }
  onMessage (e) {
    this.setState({
      message: e.target.value
    })
  }
  render () {
    const { message } = this.state
    return (
      <footer>
        <div className='container'>
          <div className='row footer-top'>
            <div className='col-lg-4 footer-grid_section_w3layouts'>
              <h2 className='logo-2 mb-lg-4 mb-3'>
                <a href='index.html'><span className='fa fa-glide-g' aria-hidden='true' />ames</a>
              </h2>
              <p>A free store for sell and buy your games.</p>
              <h4 className='sub-con-fo ad-info my-4'>Catch on Social</h4>
              <ul className='w3layouts_social_list list-unstyled'>
                <li>
                  <a href='#' className='w3pvt_facebook'>
                    <span className='fa fa-facebook-f' />
                  </a>
                </li>
                <li className='mx-2'>
                  <a href='#' className='w3pvt_twitter'>
                    <span className='fa fa-twitter' />
                  </a>
                </li>
                <li>
                  <a href='#' className='w3pvt_dribble'>
                    <span className='fa fa-dribbble' />
                  </a>
                </li>
                <li className='ml-2'>
                  <a href='#' className='w3pvt_google'>
                    <span className='fa fa-google-plus' />
                  </a>
                </li>
              </ul>
            </div>
            <div className='col-lg-8 footer-right'>
              <div className='w3layouts-news-letter'>
                <h3 className='footer-title text-uppercase text-wh mb-lg-4 mb-3'>EMAIL TO ME</h3>

                <p>I love to support you, question me please.</p>
                <form action='#' method='post' className='w3layouts-newsletter'>
                  <input
                    type='email'
                    name='message'
                    onChange={this.onMessage}
                    value={message}
                    placeholder='Enter your message...'
                    required='' />
                  <button
                    className='btn1'
                    onClick={() => {
                      const link = `mailto:zerglingno4@gmail.com?subject=${escape('message from 2ndgames.com')}&body=${message}`
                      window.location.href = link
                    }}
                  >
                    <span className='fa fa-paper-plane-o' aria-hidden='true' />
                  </button>
                </form>
              </div>
              <div className='row mt-lg-4 bottom-w3layouts-sec-nav mx-0'>
                <div className='col-md-4 footer-grid_section_w3layouts'>
                  <h3 className='footer-title text-uppercase text-wh mb-lg-4 mb-3'>Information</h3>
                  <ul className='list-unstyled w3layouts-icons'>
                    <li
                      onClick={() => {
                        next('/')
                      }}
                    >
                      <a>Home</a>
                    </li>
                    <li
                      className='mt-3'
                      onClick={() => {
                        next('/')
                      }}
                    >
                      <a>About Us</a>
                    </li>
                    <li
                      className='mt-3'
                      onClick={() => {
                        next('/public')
                      }}
                    >
                      <a>Public Chat</a>
                    </li>
                    <li
                      className='mt-3'
                      onClick={() => {
                        next('/room')
                      }}
                    >
                      <a>Room</a>
                    </li>
                    <li className='mt-3'>
                      <a href='contact.html'>Contact Us</a>
                    </li>
                  </ul>
                </div>
                <div className='col-md-4 footer-grid_section_w3layouts'>
                  <div className='agileinfo_social_icons'>
                    <h3 className='footer-title text-uppercase text-wh mb-lg-4 mb-3'>Customer Service</h3>
                    <ul className='list-unstyled w3layouts-icons'>

                      <li>
                        <a href='#'>About Us</a>
                      </li>
                      <li className='mt-3'>
                        <a href='#'>Delivery & Returns</a>
                      </li>
                      <li className='mt-3'>
                        <a href='#'>Waranty</a>
                      </li>
                      <li className='mt-3'>
                        <a href='#'>Terms & Condition</a>
                      </li>
                      <li className='mt-3'>
                        <a href='#'>Privacy Plolicy</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='col-md-4 footer-grid_section_w3layouts my-md-0 my-5'>
                  <h3 className='footer-title text-uppercase text-wh mb-lg-4 mb-3'>Contact Info</h3>
                  <div className='contact-info'>
                    <div className='footer-address-inf'>
                      <h4 className='ad-info mb-2'>Phone</h4>
                      <p>+84 035 3863 553</p>
                    </div>
                    <div className='footer-address-inf my-4'>
                      <h4 className='ad-info mb-2'>Email </h4>
                      <p><a href='mailto:info@example.com'>zerglingno4@gmail.com</a></p>
                    </div>
                    <div className='footer-address-inf'>
                      <h4 className='ad-info mb-2'>Location</h4>
                      <p>Ho Chi Minh</p>
                    </div>
                  </div>
                </div>

              </div>
              <div className='cpy-right text-left row'>
                <p className='col-md-10'>© 2019 Games. All rights reserved | Design by
                            <a href='http://w3layouts.com'> W3layouts.</a>
                </p>
                <p
                  onClick={() => {
                    const refContainer = document.getElementById('root')
                    refContainer.scrollTop = 0
                  }}
                  className='move-top text-right col-md-2'
                >
                  <span className='fa fa-long-arrow-up' aria-hidden='true' />
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>)
  }
}

export default FooterStore
