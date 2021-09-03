import React from 'react'
import StatisticLine from './StatisticLine'

const Statistics = (props) => {
	const total = props.good + props.neutral + props.bad

	if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
		return (
			<>
				No feedback given
			</>
		)
	}

	return (
		<>
			<StatisticLine text='good' value={props.good} />
			<StatisticLine text='neutral' value={props.neutral} />
			<StatisticLine text='bad' value={props.bad} />
			<StatisticLine text='all' value={total} />
			<StatisticLine text='average' value={(props.good - props.bad) / total} />
			<StatisticLine text='positive' value={props.good / total * 100} />
		</>
	)
}

export default Statistics