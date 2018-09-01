import React from 'react'
import {observable} from 'mobx'
import { observer } from 'mobx-react'
import { hot } from 'react-hot-loader'
import { Container, Row, Col } from 'reactstrap'

import {tableFormatters, textHighlighter} from '../../lib/helpers'
import ResourceCRUD from '../../lib/resource/resource-based-crud'


import { Link } from 'react-router-dom'



let searchIn = [
  '__cql'
]


const Resources = observer(({app}) => {

  const columns = [
    { Header: "Resource Name", id: 'name', accessor: 'name' },
    { Header: "Resource Type", id: 'type', accessor: 'type' },
  ]

  const filterGroups = {
  }


  return (
    <ResourceCRUD filterGroups={filterGroups} searchIn={searchIn} columnDef={columns} app={app} resource="ElectronicResource" />
  )

})

export default hot(module)(Resources)
