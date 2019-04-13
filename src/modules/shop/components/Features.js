import React from 'react'

class Features extends React.Component {
  render () {
    return (
      <section className='about py-md-5 py-5'>
        <div className='container-fluid'>
          <div className='feature-grids row px-3'>
            <div className='col-lg-3 gd-bottom'>
              <div className='bottom-gd row'>
                <div className='icon-gd col-md-3 text-center'><span className='fa fa-truck' aria-hidden='true' /></div>
                <div className='icon-gd-info col-md-9'>
                  <h3 className='mb-2'>NO FEE</h3>
                  <p>No additional fee.</p>
                </div>
              </div>
            </div>
            <div className='col-lg-3 gd-bottom'>
              <div className='bottom-gd row bottom-gd2-active'>
                <div className='icon-gd col-md-3 text-center'><span className='fa fa-bullhorn' aria-hidden='true' /></div>
                <div className='icon-gd-info col-md-9'>
                  <h3 className='mb-2'>EASY TO USE</h3>
                  <p>Easy to buy and sell.</p>
                </div>
              </div>
            </div>
            <div className='col-lg-3 gd-bottom'>
              <div className='bottom-gd row'>
                <div className='icon-gd col-md-3 text-center'> <span className='fa fa-gift' aria-hidden='true' /></div>

                <div className='icon-gd-info col-md-9'>
                  <h3 className='mb-2'>CHAT SYSTEM</h3>
                  <p>Direct chat to buy.</p>
                </div>

              </div>
            </div>
            <div className='col-lg-3 gd-bottom'>
              <div className='bottom-gd row'>
                <div className='icon-gd col-md-3 text-center'> <span className='fa fa-usd' aria-hidden='true' /></div>
                <div className='icon-gd-info col-md-9'>
                  <h3 className='mb-2'>NOTIFICATION</h3>
                  <p>Favorite games.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>)
  }
}

export default Features
