import React from 'react'
import getCurrencySymbol from 'currency-symbols'

import NewSubscriptionForm from '../components/subscriptionForm/index'

import subscriptions from '../../_data/subscriptions.json'

export default class ExpensesPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			rates: {}
		}
	}

	componentDidMount() {
		fetch(`http://api.openrates.io/latest?base=AUD`).then(res => res.json()).then(res => {
			this.setState({rates: res.rates})
		})
	}

	render() {
		let rates = this.state.rates		
		return (
			<>
				<h1>Expenses Calculator</h1>
				<h2>Monthly Expense Overviews</h2>
				<ExpenseOverview {...{subscriptions, rates}} />
				<h2>Add new Subscription</h2>
				<NewSubscriptionForm />
				<h2>All Subscriptions</h2>
				<Subscriptions {...{subscriptions, rates}} />
			</>
		)
	}
}

const Subscriptions = ({subscriptions, rates}) => (
	<>
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Amount</th>
					<th>Currency</th>
					<th>AUD</th>
					<th>Date</th>
					<th>Frequency</th>
					<th>Status</th>
				</tr>
			</thead>
			<tbody>
				{subscriptions.map(sub => (<SubscriptionItem key={sub.name} {...{...sub, rates}} />))}
			</tbody>
		</table>
	</>
)

const SubscriptionItem = ({name, amount, currency, paused, date, frequency, rates, items}) => {
	currency = currency || 'AUD'
	frequency = frequency || 'Monthly'

	let total = 0,
	extraItem = []

	if(items) {
		items.forEach(item => {
			if(!item.frequency) {
				total += parseInt(item.amount)
			}
			else {
				extraItem.push({
					currency,
					paused,
					...item,
					name: `${name} - ${item.name}`
				})
			}
		})

		amount = total
	}

	return (
		<>
			<tr>
				<th>{name}</th>
				<td>{getCurrencySymbol(currency)}{amount}</td>
				<td>{currency}</td>
				<td>{rates[currency] && ((amount / rates[currency]).toFixed(2))}</td>
				<td>{paused ? 'Paused' : 'Active'}</td>
				<td>{frequency}</td>
				<td>{date}</td>
			</tr>
			{extraItem && extraItem.map(item => (
				<tr>
					<th>{item.name}</th>
					<td>{getCurrencySymbol(currency)}{item.amount}</td>
					<td>{currency}</td>
					<td>{rates[currency] && ((item.amount / rates[currency]).toFixed(2))}</td>
					<td>{item.paused ? 'Paused' : 'Active'}</td>
					<td>{item.frequency}</td>
					<td>{item.date}</td>
				</tr>
			))}
		</>
	)
}

const ExpenseOverview = ({subscriptions, rates}) => {
	let currencies = [],
	currencyTotals = []

	subscriptions.forEach(sub => {
		if(currencies.includes(sub.currency)) {
			return
		}
		currencies.push(sub.currency)
	})

	currencies.forEach(currency => {
		let total = 0,
		 filtered = subscriptions.filter(sub => {
			if(currency == sub.currency) {
				if(sub.frequency == 'Monthly' && !sub.paused) {
					if(sub.items) {
						let subtotal = 0
						sub.items.forEach(item => {
							if(!item.frequency) {
								subtotal += parseInt(item.amount)
							}
						})
				
						total += parseInt(subtotal)
					}
					else {
						total += parseInt(sub.amount)
					}
					
				}
				return true
			}
			return false
		})

		currencyTotals.push({
			name: currency,
			items: filtered,
			total: total
		})
	})

	return (
		<table>
			<thead>
				<tr>
					<th>Currency</th>
					<th>Total</th>
					<th>AUD</th>
				</tr>
			</thead>
			<tbody>
				{currencyTotals.map(currency => (
					<tr key={currency.name}>
						<th>{currency.name}</th>
						<td>{currency.total}</td>
						<td>{rates[currency.name] && ((currency.total / rates[currency.name]).toFixed(2))}</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}