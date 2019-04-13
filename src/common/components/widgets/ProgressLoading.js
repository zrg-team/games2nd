import React, { Component } from 'react'

let instanceProgressLoading = null
class ProgressLoading extends Component {
  static defaultProps = {
    cls: '',
    style: {},
    thumbStyle: {}
  }

  constructor (props) {
    super(props)
    this.state = {
      state: 'hidden',
      options: {}
    }
    this.count = 0
    this.runningTimerId = null
    this.hidingTimerId = null
  }

  initElement = (el) => {
    this.element = el
  }

  render () {
    const { options } = this.state
    let { cls, thumbStyle } = this.props
    let className = `loader-60devs ${cls}`
    return (
      <div className={className} style={options.style || {}} data-state={this.state.state} ref={this.initElement}>
        <div className='loader-60devs-progress' style={thumbStyle} />
      </div>
    )
  }

  show (options = {}) {
    try {
      const { element } = this

      if (++this.count > 1 || !element) {
        return false
      }
      
      clearTimeout(this.hidingTimerId)
      let progressEl = element.querySelector('.loader-60devs-progress')
  
      element.setAttribute('data-state', 'hidden')
      // the only working way to restart a transition on firefox
      progressEl.outerHTML = progressEl.outerHTML
      let offset = element.offsetHeight
      element.setAttribute('data-state', '')
      offset = element.offsetHeight
      element.setAttribute('data-state', 'running')
      this.setState({
        options
      })
    } catch (err) {
      console.log('err', err)
    }
  }

  hide () {
    if (--this.count > 0) {
      return
    }
    this.element.setAttribute('data-state', 'finishing')
    this.hidingTimerId = setTimeout(this.toHiddenState, 500)
    this.setState({
      options: {}
    })
  }

  hideAll () {
    this.count = 1
    this.hide()
  }

  toHiddenState = () => {
    this.element.setAttribute('data-state', 'hidden')
  }

  componentWillMount () {
    instanceProgressLoading = this
  }

  componentWillUnmount () {
    clearTimeout(this.hidingTimerId)
    // delete instanceProgressLoading
    instanceProgressLoading = null
  }

  isVisible () {
    return this.element.getAttribute('data-state') !== 'hidden'
  }
}

export default {
  Component: ProgressLoading,
  show (options = {}) {
    instanceProgressLoading && instanceProgressLoading.show(options)
  },
  hide () {
    instanceProgressLoading && instanceProgressLoading.hide()
  },
  hideAll () {
    instanceProgressLoading && instanceProgressLoading.hideAll()
  },
  isVisible () {
    return instanceProgressLoading && instanceProgressLoading.isVisible()
  }
}
