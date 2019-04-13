import BigNumber from 'bignumber.js'

export function formatCurrency (input, digit = 2) {
  try {
    const value = new BigNumber(`${input}`).toFixed(digit)
    return new BigNumber(`${value}`).toFormat()
  } catch (err) {
    console.log('err', err)
    return 0
  }
}
