import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { next } from '../../../common/utils/navigation'

class Blogs extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      offset: undefined,
      next: false,
      loading: true
    }
    this.time = 0
    this.onLoadMore = this.onLoadMore.bind(this)
    this.renderItem = this.renderItem.bind(this)
  }
  renderItem (item, index) {
    return (
      <div key={`${item.uid || item.id}_${index}`} className='item col-lg-4' style={{ marginBottom: 20 }}>
        <div className='thumbnail card'>
          <div className='img-event'>
            <img
              className='group list-group-image img-fluid'
              src={item.banner}
              style={{
                height: 200,
                width: '100%',
                objectFit: 'cover'
              }}
              alt='' />
          </div>
          <div className='caption card-body'>
            <h4
              className='group card-title inner list-group-item-heading'
              style={{
                height: 60,
                overflow: 'hidden'
              }}
            >
              {item.title}
            </h4>
            <p
              className='group inner list-group-item-text'
              style={{
                maxHeight: 110,
                overflow: 'hidden'
              }}
            >
              {item.description || ''}
            </p>
            <div className='row'>
              <div className='col-6' />
              <div
                className='col-6 ban-buttons'
                onClick={() => {
                  next(`/blog/${item.uid}`, { blog: item })
                }}
              >
                <p className='btn btn-course'>View More</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  async onLoadMore () {
    const { offset, loading } = this.state
    const { getBlogs } = this.props
    if (loading) {
      return
    }
    this.setState({
      loading: true
    })
    const result = await getBlogs(offset)
    this.time++
    if (result) {
      this.setState({
        loading: false,
        offset: result.offset,
        next: result.next
      })
    }
  }
  async componentDidMount () {
    const { offset } = this.state
    const { getBlogs } = this.props
    const result = await getBlogs(offset)
    if (result) {
      this.scrollParentRef = document.getElementById('root')
      this.setState({
        loading: false,
        offset: result.offset,
        next: result.next
      })
    }
  }
  render () {
    const { blogs } = this.props
    const { next } = this.state
    return (
      <section className='ab-info-main py-5'>
        <div className='container py-lg-3'>
          <div className='ab-info-grids'>
            <h3 className='tittle text-center mb-lg-5 mb-3'>Blog Posts</h3>
            <div
              className='row'
              style={{
                overflowY: 'auto',
                overflowX: 'hidden'
              }}
            >
              <InfiniteScroll
                loadMore={this.onLoadMore}
                hasMore={next}
                className='row view-group'
                loader={null}
                useWindow={false}
                getScrollParent={() => this.scrollParentRef}
              >
                {blogs
                  ? blogs.map(this.renderItem)
                  : null
                }
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Blogs
