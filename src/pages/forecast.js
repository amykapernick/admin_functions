import React, {Fragment} from 'react'

export default class ForecastPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			invoices: {}
		}
	}

	componentDidMount() {
		console.log(process.env.XERO_API_KEY)
		fetch(`https://api.xero.com/api.xro/2.0/Invoices`), {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				client_id: process.env.XERO_API_KEY,
				client_secret: process.env.XERO_SECRET
			})
		}.then(res => res.json())
	}

	render() {
		return (
			<Fragment>
				<h1>Financial Forecast</h1>
			</Fragment>
		)
	}
}