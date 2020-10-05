require('dotenv').config()

const express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	path = require('path'),
	fs = require('file-system')

app.use(bodyParser.urlencoded({ extended: true }))

app.post('/new-subscription', (req, res) => {
	const newSub = req.body,
	subscriptions = JSON.parse(fs.readFileSync(path.join(__dirname, '../_data/subscriptions.json')))
	
	let subscriptionList = subscriptions,
	existingValue = subscriptionList.findIndex((sub) => sub.name == newSub.name)

	if(existingValue > -1) {
		subscriptionList[existingValue] = {
			...subscriptionList[existingValue],
			...newSub
		}
		console.log('Item has been updated')
	}
	else {
		subscriptionList.push(newSub)
		console.log('Item has been added')
	}

	subscriptionList.sort((a, b) => {
		if(a.name.toUpperCase() < b.name.toUpperCase()) {
			return -1
		}
		return 1
	})

	fs.writeFileSync(path.join(__dirname, '../_data/subscriptions.json'), JSON.stringify(subscriptionList, null, '	'))

	res.redirect('//localhost:1234/expenses')
})

app.listen(process.env.PORT || 3000, () => {
	console.log(`Express listening on port ${process.env.PORT || 3000}`)
})
