// ************************
//		PERFORMANCE
// ************************
$("#perf-chart").highcharts({
	chart:{
		type: 'spline',
		style:{
			fontFamily: 'Quicksand',
			fontSize: "30px"
		}
	},
	
	legend: {
		layout: 'horizontal',
		align:'center',
		verticalAlign: 'bottom',
	},

	title: {
		text:"PERFORMANCE",
		align: 'left',

	},
	// series: [{threshold:0, negativeColor:, color:}]
});