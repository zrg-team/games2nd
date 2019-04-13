import React, { Component } from 'react'
import './MessageBox.css'
import PhotoMessage from '../PhotoMessage/PhotoMessage'
import SystemMessage from '../SystemMessage/SystemMessage'
import LocationMessage from '../LocationMessage/LocationMessage'
import SpotifyMessage from '../SpotifyMessage/SpotifyMessage'
import Avatar from '../Avatar/Avatar'
import {
  ArrowForward,
  DoneAll,
  Timer,
  Check
} from '@material-ui/icons'
const moment = require('moment')
const classNames = require('classnames')

export class MessageBox extends Component {
  render () {
    const positionCls = classNames('rce-mbox', { 'rce-mbox-right': this.props.position === 'right' })
    const thatAbsoluteTime = this.props.type !== 'text' && this.props.type !== 'file' && !(this.props.type === 'location' && this.props.text)

    const dateText = this.props.date && !isNaN(this.props.date) && (
        this.props.dateString ||
        moment(this.props.date).fromNow()
    )

    return (
      <div
        className={classNames('rce-container-mbox', this.props.className)}
        onClick={this.props.onClick}>
        {
          this.props.renderAddCmp instanceof Function &&
          this.props.renderAddCmp()
        }
        {
          this.props.type === 'system'
            ? <SystemMessage
              text={this.props.text} />
            : <div
              className={classNames(
                positionCls,
                {'rce-mbox--clear-padding': thatAbsoluteTime},
                {'rce-mbox--clear-notch': !this.props.notch}
              )}>
              <div className='rce-mbox-body'>
                {
                    this.props.forwarded === true &&
                    <div
                      className={classNames(
                          'rce-mbox-forward',
                          { 'rce-mbox-forward-right': this.props.position === 'left' },
                          { 'rce-mbox-forward-left': this.props.position === 'right' }
                      )}
                      onClick={this.props.onForwardClick}>
                      <ArrowForward />
                    </div>
                }
                {
                  (this.props.title || this.props.avatar) &&
                  <div
                    style={this.props.titleColor && { color: this.props.titleColor }}
                    onClick={this.props.onTitleClick}
                    className={classNames('rce-mbox-title', {
                      'rce-mbox-title--clear': this.props.type === 'text'
                    })}>
                    {
                      this.props.avatar &&
                      <Avatar
                        src={this.props.avatar}
                      />
                    }
                    {
                      this.props.title &&
                      <span>{this.props.title}</span>
                    }
                  </div>
                }
                {
                  this.props.type === 'text' &&
                  <div className='rce-mbox-text'>
                    {this.props.text}
                  </div>
                }
                {
                    this.props.type === 'location' &&
                    <LocationMessage
                      onOpen={this.props.onOpen}
                      data={this.props.data}
                      target={this.props.target}
                      href={this.props.href}
                      apiKey={this.props.apiKey}
                      src={this.props.src}
                      zoom={this.props.zoom}
                      markerColor={this.props.markerColor}
                      text={this.props.text} />
                }
                {
                  this.props.type === 'photo' &&
                  <PhotoMessage
                    onOpen={this.props.onOpen}
                    onDownload={this.props.onDownload}
                    onLoad={this.props.onLoad}
                    data={this.props.data}
                    width={this.props.width}
                    height={this.props.height}
                    text={this.props.text} />
                }
                {
                  this.props.type === 'spotify' &&
                  <SpotifyMessage
                    width={this.props.width}
                    height={this.props.height}
                    theme={this.props.theme}
                    view={this.props.view}
                    data={this.props.data}
                    uri={this.props.uri || this.props.text} />
                }
                <div
                  className={classNames(
                      'rce-mbox-time',
                      { 'rce-mbox-time-block': thatAbsoluteTime },
                      { 'non-copiable': !this.props.copiableDate }
                  )}
                  data-text={this.props.copiableDate ? undefined : dateText}>
                  {
                    this.props.copiableDate &&
                    this.props.date &&
                    !isNaN(this.props.date) &&
                    (
                        this.props.dateString ||
                        moment(this.props.date).fromNow()
                    )
                  }
                  {
                    this.props.status &&
                    <span className='rce-mbox-status'>
                      {
                          this.props.status === 'waiting' &&
                          <Timer />
                      }

                      {
                          this.props.status === 'sent' &&
                          <Check />
                      }

                      {
                          this.props.status === 'received' &&
                          <DoneAll />
                      }

                      {
                          this.props.status === 'read' &&
                          <DoneAll color='#4FC3F7' />
                      }
                    </span>
                  }
                </div>
              </div>
              {
                this.props.notch &&
                (this.props.position === 'right'
                  ? <svg className='rce-mbox-right-notch' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                    <path d='M0 0v20L20 0' />
                  </svg>
                  : <div>
                    <svg className='rce-mbox-left-notch' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                      <defs>
                        <filter id='filter1' x='0' y='0'>
                          <feOffset result='offOut' in='SourceAlpha' dx='-2' dy='-5' />
                          <feGaussianBlur result='blurOut' in='offOut' stdDeviation='3' />
                          <feBlend in='SourceGraphic' in2='blurOut' mode='normal' />
                        </filter>
                      </defs>
                      <path d='M20 0v20L0 0' filter='url(#filter1)' />
                    </svg>
                  </div>
                )
            }
            </div>
        }
      </div>
    )
  }
}

MessageBox.defaultProps = {
  position: 'left',
  type: 'text',
  text: '',
  title: null,
  titleColor: null,
  onTitleClick: null,
  onForwardClick: null,
  date: new Date(),
  data: {},
  onClick: null,
  onOpen: null,
  onDownload: null,
  onLoad: null,
  forwarded: false,
  status: null,
  dateString: null,
  notch: true,
  avatar: null,
  renderAddCmp: null,
  copiableDate: false
}

export default MessageBox
