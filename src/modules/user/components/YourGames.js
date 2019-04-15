import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '../../../libraries/Card/Card'
import CardHeader from '../../../libraries/Card/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Button from '../../../libraries/CustomButtons/Button'
import { PLATFORMS, MAXIMUM_PRODUCT } from '../../shop/models'
import { formatCurrency } from '../../../common/utils/format'
import { next } from '../../../common/utils/navigation'
import Notification from '../../../common/components/widgets/Notification'
import SnackbarContent from '../../../libraries/Snackbar/SnackbarContent'
import Warning from '@material-ui/icons/Warning'

const CustomTableCell = withStyles(theme => ({
  head: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  body: {
    fontSize: 14
  }
}))(TableCell)
const styles = theme => ({
  cardHeader: {
    marginBottom: 10,
    marginTop: -20
  },
  layout: {
    width: `calc(100% - ${theme.spacing.unit * 2}px)`,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit
    }
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60
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
  alike: {
    cursor: 'pointer',
    color: '#41598A',
    textDecoration: 'underline',
    '&:hover': {
      textDecoration: ' none',
      textShadow: '1px 1px 1px #555'
    }
  },
  table: {
    display: 'block',
    width: 'fit-content',
    maxWidth: '100%',
    overflowX: 'auto'
  }
})

class YourGames extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
    this.goto = this.goto.bind(this)
    this.handleNext = this.handleNext.bind(this)
  }

  goto (uid) {
    next(`/product/${uid}`)
  }

  async handleNext (uid) {
    const { removeProduct, user, getProductsByUser } = this.props
    const result = await removeProduct(uid)
    if (result) {
      Notification.show('Remove product success !', 'success')
      return setTimeout(() => {
        if (user) {
          getProductsByUser(user.uid || user.id)
        }
      }, 0)
    }
    return Notification.show('Remove product error !', 'error')
  }

  componentDidMount () {
    const { getProductsByUser, user } = this.props
    if (user) {
      getProductsByUser(user.uid || user.id)
    }
  }

  render () {
    const { classes, products = [] } = this.props

    return (
      <main className={classes.layout}>
        <Card className={classes.paper}>
          <CardHeader color='primary' className={classes.cardHeader}>
            <h4>YOUR GAMES</h4>
          </CardHeader>
          <React.Fragment>
            <SnackbarContent
              message={
                <span>
                  <b>WARNING ALERT:</b> You can only sell {MAXIMUM_PRODUCT} products at once time.
                  Please remove sold product...
                </span>
              }
              close
              color='warning'
              icon={Warning}
            />
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <CustomTableCell>Banner</CustomTableCell>
                  <CustomTableCell align='right'>Name</CustomTableCell>
                  <CustomTableCell align='right'>Platform</CustomTableCell>
                  <CustomTableCell align='right'>Price</CustomTableCell>
                  <CustomTableCell align='right' />
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map(row => (
                  <TableRow className={classes.row} key={row.uid}>
                    <CustomTableCell component='th' scope='row'>
                      <Avatar alt={row.name} src={row.banner} className={classes.bigAvatar} />
                    </CustomTableCell>
                    <CustomTableCell
                      align='right'
                      onClick={() => this.goto(row.uid)}
                    >
                      <p
                        className={classes.alike}
                      >{row.name}</p>
                    </CustomTableCell>
                    <CustomTableCell align='right'>{PLATFORMS[row.platform]}</CustomTableCell>
                    <CustomTableCell align='right'>{formatCurrency(row.price)}</CustomTableCell>
                    <CustomTableCell align='right'>
                      <Button
                        variant='contained'
                        color='danger'
                        onClick={() => this.handleNext(row.uid)}
                        className={classes.button}
                      >
                        Delete
                      </Button>
                    </CustomTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </React.Fragment>
        </Card>
      </main>
    )
  }
}

export default withStyles(styles)(YourGames)
