import React from 'react'
// nodejs library that concatenates classes
// react components for routing our app without refresh
import { Link } from 'react-router-dom'
// material-ui components
import withStyles from '@material-ui/core/styles/withStyles'
// @material-ui/icons
// core components
import Footer from '../libraries/Footer/Footer'
import GridContainer from '../libraries/Grid/GridContainer'
import GridItem from '../libraries/Grid/GridItem'
import Button from '../libraries/CustomButtons/Button'
import Parallax from '../libraries/Parallax/Parallax'
// sections for this page
import SectionBasics from '../modules/dashboard/components/SectionBasics'
import SectionTabs from '../modules/dashboard/components/SectionTabs'
import SectionPills from '../modules/dashboard/components/SectionPills'
import SectionNotifications from '../modules/dashboard/components//SectionNotifications'
import SectionTypography from '../modules/dashboard/components/SectionTypography'
import SectionJavascript from '../modules/dashboard/components/SectionJavascript'
import SectionCarousel from '../modules/dashboard/components/SectionCarousel'
import SectionCompletedExamples from '../modules/dashboard/components/SectionCompletedExamples'
import SectionLogin from '../modules/dashboard/components/SectionLogin'
import SectionExamples from '../modules/dashboard/components/SectionExamples'
import SectionDownload from '../modules/dashboard/components/SectionDownload'

import componentsStyle from '../assets/jss/material-kit-react/views/components'

class ComponentsPage extends React.Component {
  render () {
    const { classes } = this.props
    return (
      <div>
        <Parallax image={require('../assets/images/no-page.png')}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem>
                <div className={classes.brand}>
                  <h1 className={classes.title}>Shopping by crypto currency.</h1>
                  <h3 className={classes.subtitle}>
                    The open world shopping platform.
                  </h3>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <SectionBasics />
        <SectionTabs />
        <SectionPills />
        <SectionNotifications />
        <SectionTypography />
        <SectionJavascript />
        <SectionCarousel />
        <SectionCompletedExamples />
        <SectionLogin />
        <GridItem md={12} className={classes.textCenter}>
          <Link to={'/login-page'} className={classes.link}>
            <Button color='primary' size='lg' simple>
              View Login Page
            </Button>
          </Link>
        </GridItem>
        <SectionExamples />
        <SectionDownload />
        <Footer />
      </div>
    )
  }
}

export default withStyles(componentsStyle)(ComponentsPage)
