import React from 'react'
// nodejs library that concatenates classes
import classNames from 'classnames'
// nodejs library to set properties for components
import PropTypes from 'prop-types'
// material-ui components
import withStyles from '@material-ui/core/styles/withStyles'

// core components
import parallaxStyle from '../../assets/jss/material-kit-react/components/parallaxStyle.js'

class Parallax extends React.Component {
  constructor (props) {
    super(props)
    let windowScrollTop = 0
    if (props.scroller) {
      this.elementScroll = document.getElementById(props.scroller)
      windowScrollTop = this.elementScroll.scrollTop / 3
    } else {
      windowScrollTop = window.pageYOffset / 3
    }
    this.state = {
      transform: 'translate3d(0,' + windowScrollTop + 'px,0)'
    }
    this.elementScroll = null
    this.resetTransform = this.resetTransform.bind(this)
  }
  componentDidMount () {
    const { scroller } = this.props
    if (scroller) {
      this.elementScroll = this.elementScroll || document.getElementById(scroller)
      const windowScrollTop = this.elementScroll.scrollTop / 3
      this.setState({
        transform: 'translate3d(0,' + windowScrollTop + 'px,0)'
      })
      this.elementScroll.addEventListener('scroll', this.resetTransform)
    } else {
      const windowScrollTop = window.pageYOffset / 3
      this.setState({
        transform: 'translate3d(0,' + windowScrollTop + 'px,0)'
      })
      window.addEventListener('scroll', this.resetTransform)
    }
  }
  componentWillUnmount () {
    const { scroller } = this.props
    if (scroller && this.elementScroll) {
      this.elementScroll.removeEventListener('scroll', this.resetTransform)
    } else {
      window.removeEventListener('scroll', this.resetTransform)
    }
  }
  resetTransform () {
    if (this.elementScroll) {
      const windowScrollTop = this.elementScroll.scrollTop / 3
      this.setState({
        transform: 'translate3d(0,' + windowScrollTop + 'px,0)'
      })
    } else {
      const windowScrollTop = window.pageYOffset / 3
      this.setState({
        transform: 'translate3d(0,' + windowScrollTop + 'px,0)'
      })
    }
  }
  render () {
    const {
      classes,
      filter,
      className,
      children,
      style,
      image,
      small
    } = this.props
    const parallaxClasses = classNames({
      [classes.parallax]: true,
      [classes.filter]: filter,
      [classes.small]: small,
      [className]: className !== undefined
    })
    return (
      <div
        className={parallaxClasses}
        style={{
          ...style,
          backgroundImage: 'url(' + image + ')',
          ...this.state
        }}
        ref='parallax'
      >
        {children}
      </div>
    )
  }
}

Parallax.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  filter: PropTypes.bool,
  scroller: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.string,
  image: PropTypes.string
}

export default withStyles(parallaxStyle)(Parallax)
