import React from 'react'
import { DatePicker } from 'antd'

const RangePicker = DatePicker.RangePicker

class Filter extends React.Component {

	render() {
		return(
			<RangePicker />
		)
	}
}

export default Filter