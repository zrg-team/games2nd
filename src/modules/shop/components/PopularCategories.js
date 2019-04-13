import React from 'react'
import { next } from '../../../common/utils/navigation'

class PopularCategories extends React.Component {
  render () {
    return (
      <section className='about py-5'>
        <div className='container pb-lg-3'>
          <h3 className='tittle text-center'>Popular Categories</h3>
          <div className='row'>
            <div className='col-md-6 latest-left' style={{ backgroundColor: '#107C11' }}>
              <div className='product-shoe-info shoe text-center' style={{ marginTop: 10 }}>
                <img src='assets/images/xbox.png' className='img-fluid' alt='' />
                <div className='shop-now'>
                  <p onClick={() => next('/shop', { platform: 'xboxone' })} className='btn' style={{ color: '#FFFFFF' }}>Shop Now</p>
                </div>
              </div>
            </div>
            <div className='col-md-6 latest-right'>
              <div className='row latest-grids'>
                <div className='latest-grid1 product-men col-12' style={{ backgroundColor: '#F20000', paddingTop: 10, paddingBottom: 10 }}>
                  <div className='product-shoe-info shoe text-center'>
                    <div className='men-thumb-item'>
                      <img src='assets/images/switch.jpg' className='img-fluid' alt='' />
                      <div className='shop-now'>
                        <p onClick={() => next('/shop', { platform: 'switch' })} className='btn' style={{ color: '#FFFFFF' }}>Shop Now</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='latest-grid2 product-men col-12 mt-lg-4' style={{ backgroundColor: '#05418D', paddingTop: 10, paddingBottom: 10 }}>
                  <div className='product-shoe-info shoe text-center'>
                    <div className='men-thumb-item'>
                      <img src='assets/images/ps4.jpg' className='img-fluid' alt='' />
                      <div className='shop-now'>
                        <p onClick={() => next('/shop', { platform: 'playstation4' })} className='btn' style={{ color: '#FFFFFF' }}>Shop Now</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>)
  }
}

export default PopularCategories
