import React from 'react'

import './style.scss'

const NewSubscriptionForm = () => {
	return (
			<form action="//localhost:3000/new-subscription" method="POST">
				<label htmlFor="name">Name</label>
				<input name="name" />
				<label htmlFor="amount">Amount</label>
				<input id="amount" name="amount" />
				<label htmlFor="currency">Currency</label>
				<input id="currency" name="currency" defaultValue="AUD" />
				<label htmlFor="date">Date</label>
				<input id="date" name="date" />
				<label htmlFor="frequency">Frequency</label>
				<input id="frequency" name="frequency" defaultValue="Monthly" />
				<label htmlFor="paused">Paused</label>
				<input type="checkbox" id="paused" name="paused" />
				<button type="submit">Create</button>
			</form>
	)
	
}
export default NewSubscriptionForm