import React, {Fragment} from 'react'
import {Route, NavLink, HashRouter} from 'react-router-dom'

const IndexPage = () => (
	<Fragment>
		<h1>Admin Helper Functions</h1>
		<ul>
			<li><NavLink to="/expenses">Expenses Calculator</NavLink></li>
		</ul>
	</Fragment>
)

export default IndexPage