import React, {Fragment} from 'react'
import {Route, NavLink, BrowserRouter} from 'react-router-dom'

import ExpensesPage from '../../pages/expenses'
import IndexPage from '../../pages/index'

const Layout = () => (
	<BrowserRouter>
		<Fragment>
			<main>
				<Route exact path="/" component={IndexPage} />
				<Route path="/expenses" component={ExpensesPage} />
			</main>
		</Fragment>
	</BrowserRouter>
)

export default Layout