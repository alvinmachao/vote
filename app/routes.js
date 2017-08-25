import React from 'react'
import { Route,IndexRoute } from 'react-router'
import Index from './container/Index'
import pIndex from './container/pIndex'
import Rule from './container/Rule'

export default <Route path="/" component={pIndex}>
    <Route path="rule" component={Rule}/>
</Route>

