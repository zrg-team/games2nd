import React from 'react'

class LatestChat extends React.Component {
  render () {
    const { presents: { gameHighlight = {} } } = this.props
    const data = []
    for (let i = 0; i < gameHighlight.star || 0; i++) {
      data.push(i)
    }
    return (
      <section className='testimonials py-5'>
        <div className='container'>
          <div className='test-info text-center'>
            <h3 className='my-md-2 my-3'>{gameHighlight.title || ''}</h3>

            <ul className='list-unstyled w3layouts-icons clients'>
              {data.map(item => {
                return (
                  <li>
                    <span className='fa fa-star' />
                  </li>
                )
              })}
              {/* <li>
                <span className='fa fa-star-half-o' />
              </li> */}
            </ul>
            <p><span className='fa fa-quote-left' /> {gameHighlight.content || ''} <span className='fa fa-quote-right' /></p>

          </div>
        </div>
      </section>)
  }
}

export default LatestChat
