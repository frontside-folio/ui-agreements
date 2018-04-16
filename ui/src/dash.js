import React from 'react'
import {observable} from 'mobx'
import { observer } from 'mobx-react'
import app from './lib/folio-stripes/app'
import { hot } from 'react-hot-loader'

const Dash = observer(() => {
  return (
    <div>
      <h1>ERM Dash</h1>
    </div>
  )
})

export default hot(module)(Dash)
