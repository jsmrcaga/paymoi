// ************************
//		PERFORMANCE
// ************************
$("#perf-chart").highcharts({
	chart:{
		type: 'spline',
	},
	
	legend: {
		layout: 'horizontal',
		align:'center',
		verticalAlign: 'bottom',
	},

	title: {
		title:"PERFORMANCE",
	},
	// series: [{threshold:0, negativeColor:, color:}]
});