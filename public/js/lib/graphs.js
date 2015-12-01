// ************************
//		PERFORMANCE
// ************************
$("#perf-chart").highcharts({
	chart:{
		type: 'spline',
		style:{
			fontFamily: 'Quicksand',
			
		}
	},
	
	legend: {
		layout: 'horizontal',
		align:'center',
		verticalAlign: 'bottom',
	},

	title: {
		text:"PERFORMANCE",
	},
	// series: [{threshold:0, negativeColor:, color:}]
});