import React from 'react'
import {observable} from 'mobx'
import { observer } from 'mobx-react'
import app from './lib/folio-stripes/app'
import { hot } from 'react-hot-loader'
import ResourceBasedTable from './lib/resource/resource-based-table'


let columns = [
  {
    Header: "Name",
    accessor: "name"
  },
  {
    Header: "Emails",
    accessor: "email"
  },
  {
    Header: "Phone Number",
    accessor: "phone"
  }
]

const Home = observer(() => {
  let user = observable (app.user)  
  return (
    <div>
      <p>Welcome { app.user.firstName } { app.user.lastName }</p>
      <ResourceBasedTable resourceType="users" columns={columns} />
    </div>
  )
})

export default hot(module)(Home)
