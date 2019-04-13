import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '../../../libraries/Card/Card'
import CardHeader from '../../../libraries/Card/CardHeader'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '../../../libraries/CustomButtons/Button'
import InformationForm from './InformationForm'
import GameInfoForm from './GameInfoForm'
import { replace } from '../../../common/utils/navigation'
import Notification from '../../../common/components/widgets/Notification'
import { PLATFORMS } from '../models'
import Lottie from '../../../libraries/Lottie'

const styles = theme => ({
  cardHeader: {
    marginBottom: 10
  },
  appBar: {
    position: 'relative'
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
      paddingTop: 0
    },
    paddingTop: 0
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 3}px`,
    backgroundColor: 'transparent'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  }
})

const steps = ['General', 'Game Information', 'Complete']

class AddProduct extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activeStep: 0,
      sugestions: {},
      errors: {}
    }

    this.onBlur = this.onBlur.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.handleBack = this.handleBack.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.onChangeText = this.onChangeText.bind(this)
    this.onChangeCheck = this.onChangeCheck.bind(this)
    this.getStepContent = this.getStepContent.bind(this)
    this.handleModelChange = this.handleModelChange.bind(this)
  }

  getStepContent (step) {
    const {
      description,
      sugestions,
      address,
      platform,
      isNew,
      price,
      banner,
      errors,
      trade,
      name
    } = this.state
    switch (step) {
      case 0:
        return <InformationForm
          sugestions={sugestions}
          onBlur={this.onBlur}
          onChange={this.onChangeText}
          onChangeCheck={this.onChangeCheck}
          address={address}
          platform={platform}
          isNew={isNew}
          price={price}
          trade={trade}
          name={name}
          errors={errors}
        />
      case 1:
        const searchText = [ ...`${name}`.split(' '), ...`${PLATFORMS[platform]}`.split(' ') ].join('+')
        return <GameInfoForm
          onChange={this.onChangeText}
          searchText={`${searchText}+cover`}
          banner={banner}
          errors={errors}
          description={description}
          handleModelChange={this.handleModelChange}
        />
      case 2:
        return (
          <div
            style={{
              width: '100%',
              marginTop: 60,
              marginBottom: 60,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Lottie
              options={{
                loop: false,
                animationData: require('../../../assets/animations/checked.json')
              }}
              width={120}
              height={120}
            />
          </div>
        )
      default:
        throw new Error('Unknown step')
    }
  }

  async onBlur (event) {
    // const { sugestions } = this.state
    // const name = event.target.name
    // switch (name) {
    //   case 'name':
    //     try {
    //       sugestions[name] = []
    //     } catch (err) {
    //       sugestions[name] = []
    //     }
    //     break
    //   default:
    //     break
    // }
  }

  onChangeText (event) {
    const { errors = {} } = this.state
    const name = event.target.name
    this.setState({
      [name]: event.target.value,
      errors: { ...errors, [name]: undefined }
    })
  }

  handleModelChange (model) {
    this.setState({
      description: model
    })
  }

  onChangeCheck (event) {
    const { errors = {} } = this.state
    const name = event.target.name
    const oldValue = this.state[name]
    this.setState({
      [name]: oldValue ? undefined : event.target.value,
      errors: { ...errors, [name]: undefined }
    })
  }

  async handleNext () {
    const {
      activeStep,
      banner,
      name,
      price,
      isNew,
      trade,
      platform,
      description
    } = this.state
    const errors = {}
    switch (activeStep) {
      case 0:
        if (!name || !`${name}`.trim()) {
          errors['name'] = 'Name is required.'
        }
        if (!price || !`${price}`.trim() || isNaN(price)) {
          errors['price'] = 'Price is required and a Number.'
        } else if (+price < 1000) {
          errors['price'] = 'Price is to low.'
        }
        if (!platform || !`${platform}`.trim()) {
          errors['platform'] = 'Platform is required.'
        } else if (!['xbox360', 'xboxone', 'playstation3', 'playstation4', 'switch'].includes(platform)) {
          errors['platform'] = 'Not valid Platform.'
        }
        break
      case 1:
        const { user, addProduct } = this.props
        if (!banner || !`${banner}`.trim()) {
          errors['banner'] = 'Banner is required.'
        }
        const result = await addProduct({
          name,
          price: +price,
          platform,
          banner,
          trade: trade || false,
          isNew: isNew || false,
          description: description || '',
          user: user.uid
        })
        if (!result) {
          // Notification.show('Add product success !', 'success')
          // return setTimeout(() => {
          //   replace('public')
          // }, 2000)
          return Notification.show('Add product error !', 'error')
        }
        break
      case 2:
        // Notification.show('Add product success !', 'success')
        return setTimeout(() => {
          replace('public', {})
        }, 1000)
      default:
        break
    }
    if (Object.keys(errors).length) {
      return this.setState({
        errors
      })
    }
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }))
  };

  handleBack () {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }))
  };

  handleReset () {
    this.setState({
      activeStep: 0
    })
  };

  render () {
    const { classes } = this.props
    const { activeStep } = this.state

    return (
      <main className={classes.layout}>
        <Card className={classes.paper}>
          <CardHeader color='primary' className={classes.cardHeader}>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>
                    <p style={{ color: '#FFFFFF' }}>{label}</p>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </CardHeader>
          <React.Fragment>
            <React.Fragment>
              {this.getStepContent(activeStep)}
              <div className={classes.buttons}>
                {activeStep !== 0 && activeStep !== 2
                  ? (
                    <Button onClick={this.handleBack} className={classes.button}>
                      Back
                    </Button>
                  ) : null}
                <Button
                  variant='contained'
                  color='primary'
                  onClick={this.handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? 'Confim' : 'Next'}
                </Button>
              </div>
            </React.Fragment>
          </React.Fragment>
        </Card>
      </main>
    )
  }
}

AddProduct.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AddProduct)
