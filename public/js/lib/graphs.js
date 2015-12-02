// ************************
//		PERFORMANCE
// ************************
$("#perf-chart").highcharts({
	chart:{
		type: 'areaspline',
		style:{
			fontFamily: 'Quicksand',
			fontSize: "30px"
		}
	},
	
	legend: {
		layout: 'horizontal',
		align:'center',
		verticalAlign: 'bottom',
		enabled: false
	},

	title: {
		text:"",
		align: 'left',

	},
	series: [{
		threshold:0,
		negativeColor: "#ef5350",
		color: "#66bb6a",
		name: '',
		data: [[0,1], [1,2], [2,-3],[3,-3], [4,0], [5,1],[6,-2],[7,3],[8,9]]
	}],
	yAxis:{
		title:{
			text: "Balance"
		}
	},
	xAxis:{
		title:{
			text: "Semaines"
		}
	},
	 plotOptions: {
		areaspline: {
			fillOpacity: 0.5
		}
	},
});