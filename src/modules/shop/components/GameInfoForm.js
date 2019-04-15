import React from 'react'
import $ from 'jquery'
import 'froala-editor/js/froala_editor.pkgd.min.js'
import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/css/froala_editor.pkgd.min.css'
import Grid from '@material-ui/core/Grid'
import FroalaEditor from 'react-froala-wysiwyg'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import TextField from '@material-ui/core/TextField'
import Button from '../../../libraries/CustomButtons/Button'

window.$ = window.jQuery = $

function PaymentForm ({
  searchText,
  banner,
  errors,
  onChange,
  description,
  handleModelChange

}) {
  return (
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
                  onChange={onChange}
                  fullWidth
                />
                <Button
                  block
                  color='google'
                  onClick={() => {
                    window.open(
                      `https://www.google.com/search?q=${searchText}&source=lnms&tbm=isch`,
                      '_blank' // <- This is what makes it open in a new window.
                    )
                  }}
                >
                  Find image
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <FroalaEditor
            tag='textarea'
            model={description}
            onModelChange={handleModelChange}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default PaymentForm
