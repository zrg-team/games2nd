import React from 'react'
import { back } from '../../../common/utils/navigation'
import Lottie from '../../../libraries/Lottie'

const HtmlToReactParser = require('html-to-react').Parser
const htmlToReactParser = new HtmlToReactParser()

class Blog extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      blog: {},
      ready: false
    }
  }
  async componentDidMount () {
    const { uid, location, getBlog } = this.props
    let blog = {}
    try {
      if (location && location.state && location.state.blog) {
        blog = location.state.blog
      } else {
        blog = await getBlog(uid)
      }
      return this.setState({
        blog,
        ready: true
      })
    } catch (error) {
      console.log('error', error)
      back()
    }
  }
  render () {
    const { blog = {}, ready } = this.state
    if (!ready) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%'
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#000',
              opacity: 0.25,
              position: 'absolute'
            }}
          />
          <Lottie
            options={{
              animationData: require('../../../assets/animations/loading-page.json')
            }}
            width={120}
            height={120}
          />
        </div>
      )
    }
    const reactElement = htmlToReactParser.parse(blog.content || '')
    return (
      <section class='ab-info-main py-md-5'>
        <div class='container py-md-3'>
          <h3 class='tittle text-center mb-lg-5 mb-3'> {blog.title}</h3>
          <div class='speak px-lg-5' style={{ overflowX: 'hidden' }}>
            {reactElement ? reactElement.map(Item => Item) : null}
          </div>
        </div>
      </section>
    )
  }
}

export default Blog
