import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Card from '../../../libraries/Card/Card'
import CardHeader from '../../../libraries/Card/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import TextField from '@material-ui/core/TextField'
import FroalaEditor from 'react-froala-wysiwyg'
// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js'
// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/css/froala_editor.pkgd.min.css'
import Button from '../../../libraries/CustomButtons/Button'
import Notification from '../../../common/components/widgets/Notification'
import { replace } from '../../../common/utils/navigation'

const styles = theme => ({
  cardHeader: {
    marginBottom: 10,
    marginTop: -20
  },
  appBar: {
    position: 'relative'
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      maxWidth: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 4,
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

class AddBlog extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      errors: {}
    }
    this.onChange = this.onChange.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.handleModelChange = this.handleModelChange.bind(this)
  }

  async handleNext () {
    const {
      banner,
      title,
      content
    } = this.state
    const { user, postBlog } = this.props
    const errors = {}
    if (!title || !`${title}`.trim()) {
      errors['name'] = 'Title is required.'
    }
    if (!banner || !`${banner}`.trim()) {
      errors['name'] = 'Name is required.'
    }
    if (!content || !`${content}`.trim()) {
      errors['content'] = 'Content is required.'
    }
    if (Object.keys(errors).length) {
      return this.setState({
        errors
      })
    } else {
      try {
        const result = await postBlog(user, {
          banner,
          title,
          content
        })
        if (result) {
          return setTimeout(() => {
            replace('/blogs')
          }, 1000)
        }
        throw new Error('INVALID_RETURN')
      } catch (err) {
        return Notification.show('Add product error !', 'error')
      }
    }
  }

  onChange (e) {
    const value = e.target.value
    const name = e.target.name
    this.setState({
      [name]: value
    })
  }

  handleModelChange (model) {
    this.setState({
      content: model
    })
  }

  render () {
    const { classes } = this.props
    const { errors, banner, content, title } = this.state

    return (
      <main className={classes.layout}>
        <Card className={classes.paper}>
          <CardHeader color='primary' className={classes.cardHeader}>
            <h4>WRITE BLOG</h4>
          </CardHeader>
          <React.Fragment>
            <Grid container spacing={24}>
              <Grid justify='center' container xs={12}>
                <Grid item xs={5} spacing={12}>
                  <Card
                    style={{
                      maxWidth: 300
                    }}
                  >
                    <CardMedia
                      component='img'
                      alt='Contemplative Reptile'
                      style={{
                        objectFit: 'cover'
                      }}
                      image={banner || require('../../../assets/images/no-image.jpg')}
                      title='Contemplative Reptile'
                    />
                    <CardContent>
                      <TextField
                        required
                        id='banner'
                        name='banner'
                        label='Banner'
                        value={banner}
                        error={!!errors['banner']}
                        onChange={this.onChange}
                        fullWidth
                      />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id='title'
                  name='title'
                  label='Title'
                  value={title}
                  error={!!errors['title']}
                  onChange={this.onChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FroalaEditor
                  tag='textarea'
                  model={content}
                  onModelChange={this.handleModelChange}
                />
              </Grid>
            </Grid>
            <div className={classes.buttons}>
              <Button
                variant='contained'
                color='primary'
                onClick={this.handleNext}
                className={classes.button}
              >
                Confim
              </Button>
            </div>
          </React.Fragment>
        </Card>
      </main>
    )
  }
}

export default withStyles(styles)(AddBlog)
