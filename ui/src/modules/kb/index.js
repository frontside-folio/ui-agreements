import React from 'react'
import { hot } from 'react-hot-loader'
import Route from 'react-router-dom/Route'
import Switch from 'react-router-dom/Switch'
import KbComponent from './kbComponent'


const Routes = ({app, match, ...props}) => (
  <Switch>
    <Route history={history} exact path={match.path+'/kb'} render={() => <KbComponent app={this.app} />} />
  </Switch>
)

export default hot(module)(Routes);
