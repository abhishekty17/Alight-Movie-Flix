import React from 'react'
import {Home} from './Home'
import Favourites from './Favourites'
import {Redirect, Route,Switch} from "react-router-dom"

function Movies() {
  return (
    <>
    <Switch>
      <Route path = "/home">
          <Home></Home>
      </Route>
      <Route path = "/Favourites">
        <Favourites />
      </Route>
      <Redirect from = "/" to= "/home" exact></Redirect>
    </Switch>
    </>
  )
}

export default Movies