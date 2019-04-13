import React from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import { PLATFORMS } from '../models'

function InformationForm ({
  onChangeCheck,
  sugestions = [],
  onChange,
  errors = {},
  platform,
  address,
  onBlur,
  isNew,
  price,
  trade,
  name
}) {
  return (
    <React.Fragment>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <TextField
            required
            id='name'
            name='name'
            label='Name'
            fullWidth
            value={name}
            error={!!errors['name']}
            onChange={onChange}
            onBlur={onBlur}
          />
          {errors['name'] && <FormHelperText error>{errors['name']}</FormHelperText>}
        </Grid>
        <Grid
          item xs={12}
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        >
          {sugestions['name'] && sugestions['name'].map(item => {
            return (
              <Chip
                avatar={<Avatar alt='Natacha' src={item.cover.url} />}
                label={item.name}
                variant='outlined'
              />
            )
          })}
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='address'
            name='address'
            label='Address'
            fullWidth
            value={address}
            onChange={onChange}
            autoComplete='billing address-line1'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='price'
            name='price'
            label='Price'
            fullWidth
            value={price}
            error={!!errors['price']}
            onChange={onChange}
          />
          {errors['price'] && <FormHelperText error>{errors['price']}</FormHelperText>}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Select
            id='platform'
            name='platform'
            label='Platform'
            fullWidth
            value={platform || 'none'}
            onChange={onChange}
            error={!!errors['platform']}
            style={{
              height: 48,
              paddingTop: 14
            }}
          >
            <MenuItem value='none' disabled>
              Xbox, PS, Nintendo
            </MenuItem>
            {Object.keys(PLATFORMS).map(key => {
              return <MenuItem key={key} value={key}>{PLATFORMS[key]}</MenuItem>
            })}
          </Select>
          {errors['platform'] && <FormHelperText error>{errors['platform']}</FormHelperText>}
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={<Checkbox color='secondary' name='trade' value='yes' />}
            label='Trade ?'
            value={trade}
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={<Checkbox color='secondary' name='isNew' value='yes' />}
            label='New ?'
            value={isNew}
            onChange={onChangeCheck}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default InformationForm
