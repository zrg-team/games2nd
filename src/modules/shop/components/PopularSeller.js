import React from 'react'

class PopularSeller extends React.Component {
  render () {
    return (
      <section className='brands py-5' id='brands'>
        <div className='container py-lg-0'>
          <div className='row text-center brand-items'>
            <div className='col-sm-2 col-3'>
              <span className='fa fa-connectdevelop' aria-hidden='true' />
            </div>
            <div className='col-sm-2 col-3'>
              <span className='fa fa-empire' aria-hidden='true' />
            </div>
            <div className='col-sm-2 col-3'>
              <span className='fa fa-ioxhost' aria-hidden='true' />
            </div>
            <div className='col-sm-2 col-3'>
              <span className='fa fa-first-order' aria-hidden='true' />
            </div>
            <div className='col-sm-2 col-3 mt-sm-0 mt-4'>
              <span className='fa fa-joomla' aria-hidden='true' />
            </div>
            <div className='col-sm-2 col-3 mt-sm-0 mt-4'>
              <span className='fa fa-dropbox' aria-hidden='true' />
            </div>
          </div>
        </div>
      </section>)
  }
}

export default PopularSeller
