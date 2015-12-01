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
		text:"",
		align: 'left',

	},
	series: [{
		threshold:0,
		negativeColor: "#FF5555",
		color: "#55FF55",
		data: [[0,1], [1,2], [2,-3],[3,-3], [4,0], [5,1],[6,-2],[7,3],[8,9]]
	}]
});