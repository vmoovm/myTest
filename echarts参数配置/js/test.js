var myChart1 = echarts.init(document.getElementById('china-map'));
	    // 省会经纬度
			var geoCoordMap1 = {
				'北京': [116.405289, 39.904987],
				'天津': [117.190186, 39.125595],
				'石家庄': [114.502464, 38.045475],
				'太原': [112.549248, 37.857014],
				'呼和浩特': [111.751990, 40.841490],
				'沈阳': [123.429092, 41.796768],
				'长春': [125.324501, 43.886841],
				'哈尔滨': [126.642464, 45.756966],
				'上海': [121.472641, 31.231707],
				'南京': [118.76741, 32.041546],
				'杭州': [120.15358, 30.287458],
				'合肥': [117.283043, 31.861191],
				'福州': [119.306236, 26.075302],
				'南昌': [115.892151, 28.676493],
				'济南': [117.000923, 36.675808],
				'郑州': [113.665413, 34.757977],
				'武汉': [114.298569, 30.584354],
				'长沙': [112.982277, 28.19409],
				'广州': [113.28064, 23.125177],
				'南宁': [108.320007, 22.82402],
				'海口': [110.199890, 20.044220],
				'重庆': [106.504959, 29.533155],
				'成都': [104.065735, 30.659462],
				'贵阳': [106.713478, 26.578342],
				'昆明': [102.71225, 25.040609],
				'拉萨': [91.11450, 29.644150],
				'西安': [108.948021, 34.263161],
				'兰州': [103.834170, 36.061380],
				'西宁': [101.777820, 36.617290],
				'银川': [106.232480, 38.486440],
				'乌鲁木齐': [87.616880, 43.826630],
				'台北': [121.5200760, 25.0307240],
				'香港': [114.165460, 22.275340],
				'澳门': [113.549130, 22.198750]
			}
			// 城市助力热度
			var cityHot = [
				{name: '沈阳', value: 23}, 
				{name: '长春', value: 223}, 
				{name: '哈尔滨', value: 323}, 
				{name: '北京', value: 123},
				{name: '天津', value: 23},
				{name: '呼和浩特', value: 223},
				{name: '银川', value: 273},
				{name: '太原', value: 293},
				{name: '石家庄', value: 323},
				{name: '济南', value: 43},
				{name: '郑州', value: 63},
				{name: '西安', value: 73},
				{name: '武汉', value: 63},
				{name: '南京', value: 23},
				{name: '合肥', value: 3},
				{name: '上海', value: 37},
				{name: '长沙', value: 34},
				{name: '南昌', value: 28},
				{name: '杭州', value: 223},
				{name: '福州', value: 323},
				{name: '广州', value: 423},
				{name: '台北', value: 323},
				{name: '海口', value: 123},
				{name: '南宁', value: 223},
				{name: '重庆', value: 323},
				{name: '昆明', value: 123},
				{name: '贵阳', value: 123},
				{name: '成都', value: 123},
				{name: '兰州', value: 123},
				{name: '西宁', value: 123},
				{name: '拉萨', value: 123},
				{name: '乌鲁木齐', value: 123}, 
				{name: '香港', value: 123},
				{name: '澳门', value: 123}
			]
	    
	    /*var geoCoordMap1 = {//自定义城市坐标
		    "青岛":[120.33,36.07],
		    "厦门":[118.1,24.46],
		    "宁波":[121.56,29.86],
		    "深圳":[114.07,22.62],
		    "大连":[121.62,38.92]
		};*/
		
		var convertData = function (data) {
		    var res = [];
		    for (var i = 0; i < data.length; i++) {
		        var geoCoord = geoCoordMap1[data[i].name];
		        if (geoCoord) {
		            res.push({
		                name: data[i].name,
		                value: geoCoord.concat(data[i].value)
		            });
		        }
		    }
		    return res;
		};
		option2 = {
		// backgroundColor: '#BBFFFF',
	    title : {
	        text: '异常分布',
	        x:'center'
	    },
	    tooltip: {
            trigger: 'item',  
            formatter: function(params) {  
                var res = params.name+'<br/>';  
                var myseries = option2.series;  
                if (convertData) {
	                for (var i = 0; i < myseries.length-1; i++) {
	                    for(var j=0;j<myseries[i].data.length;j++) {  
	                        if(myseries[i].data[j].name==params.name){
	                        		res+=myseries[i].name +' : '+myseries[i].data[j].value+'</br>'; 
	                        	}
	                		}
	              	}
	            } else {
	              	for (var i = 0; i < myseries.length; i++) {  
                    for(var j=0;j<myseries[i].data.length;j++){  
                        if(myseries[i].data[j].name==params.name){  
                            res+=myseries[i].name +' : '+myseries[i].data[j].value+'</br>';  
                        }  
                    }  
	                } 
	            }  
                return res;  
		    }  
	    },
	    legend: {
	        orient: 'vertical',
	        x:'left',
	        data:['低','中','高']
	    },
	    dataRange: {
	        min: 0,
	        max: 30,
	        x: 'left',
	        y: 'bottom',
			color: ['#cf2412','#ff971a','#ffcd68'],
	        text:['高','低'],
	        calculable : true
	    },
	    toolbox: {
	        show: true,
	        orient : 'vertical',
	        x: 'right',
	        y: 'center',
	        feature : {
	            mark : {show: true},
	            dataView : {show: true, readOnly: false},
	            restore : {show: true},
	            saveAsImage : {show: true}
	        }
	    },
	    roamController: {
	        show: true,
	        x: 'right',
	        mapTypeControl: {
	            'china': true
	        }
	    },
	    geo: {
	        map: 'china',
	        label: {
	            normal: {
	                show: false
	            },
	            emphasis: {
	                show: false,
	            }
	        },
	        // itemStyle: {
	            // normal: {
	                // areaColor: 'rgba(122,255,25,0)',
	                // borderColor: 'rgba(255, 119, 88, 1)',
	                // borderWidth: 0.8
	            // },
	            // emphasis: {
	                // areaColor: 'rgba(122,255,25,0.01)',
	            // }
	        // }
	        roam: false,//地图设置不可拖拽，固定的
	        itemStyle: {
	            normal: {
	                areaColor: 'rgba(122,255,25,0)',
	                borderWidth: 1,
	                shadowColor: 'rgba(255, 119, 88, 1)',
	                shadowBlur: 20
	            }
            }
	    },
	    series : [
	        {
		        type: 'map',
		        map: 'china',
		        geoIndex: 1,
		        aspectScale: 0.75, //长宽比
		        showLegendSymbol: false, // 存在legend时显示
		        label: {
		            normal: {
		                show: false,
		            },
		            emphasis: {
		                show: false,
		                textStyle: {
		                    color: '#fff'
		                }
		            }
		        },
		        roam: false,
		        itemStyle: {
		            normal: {
		                areaColor: 'rgba(255, 119, 88, 0)',
		                borderColor: 'rgba(255, 119, 88, 1)',
		                borderWidth: 1
		            },
		            emphasis: {
		                areaColor: 'rgba(255, 119, 88, 1)'
		            }
		        },
		    },
	        {
	            name: '低',
	            type: 'effectScatter',//影响散点
	            coordinateSystem: 'geo',
			        symbolSize: 6,
			        showEffectOn: 'render',
			        rippleEffect: {
			            brushType: 'stroke'
			        },
			        // hoverAnimation: true,
			        label: {
			            normal: {
				            color: '#c60fff',
			                formatter: '{b}',
			                position: 'right',
			                show: false
			            },
			            emphasis: {
			                show: false
			            }
			        },
			        itemStyle: {
			            normal: {
			                color: '#ffcd68',
			                shadowBlur: 150,
			                shadowColor: '#ef6f5c'
			            },
			        },
	            data: convertData([
	                {name: "沈阳"},
	                {name: "兰州"},
	                {name: "福州"},
	                {name: "合肥"},
	                {name: "郑州"},
	            ]),
	        },
	        {
	            name: '中',
	            type: 'effectScatter',//影响散点
	            coordinateSystem: 'geo',
			        symbolSize: 14,
			        showEffectOn: 'render',
			        rippleEffect: {
			            brushType: 'stroke'
			        },
			        hoverAnimation: true,
			        label: {
			            normal: {
				            color: '#c60fff',
			                formatter: '{b}',
			                position: 'right',
			                show: false
			            },
			            emphasis: {
			                show: false
			            }
			        },
			        itemStyle: {
			            normal: {
			                color: '#ff971a',
			                shadowBlur: 150,
			                shadowColor: '#ef6f5c'
			            },
			        },
	            data: convertData([
	                {name: "南宁"},
	                {name: "济南"},
	                {name: "哈尔滨"},
	                {name: "海口"},
	                {name: "西宁"},
	            ]),
	        },
	        
	        {
	            name: '高',
	            type: 'effectScatter',//影响散点
	            coordinateSystem: 'geo',
			        symbolSize: 22,
			        // showEffectOn: 'render',
			        // rippleEffect: {
			            // brushType: 'stroke'
			        // },
			        // hoverAnimation: true,
			        // label: {
			            // normal: {
				            // color: '#c60fff',
			                // formatter: '{b}',
			                // position: 'right',
			                // show: false
			            // },
			            // emphasis: {
			                // show: false
			            // }
			        // },
			        itemStyle: {
			            normal: {
			                color: '#cf2412',
			                shadowBlur: 150,
			                shadowColor: '#ef6f5c'
			            },
			        },
	            data: convertData([
	                {name: "石家庄"},
	                {name: "重庆"},
	                {name: "北京"},
	                {name: "天津"},
	                {name: "上海"},
	            ]),
	        }
	    ]
	};
    myChart1.setOption(option2); 
    
    
    
    
    myChart1.on('mouseover', function (params) {
        var dataIndex = params.dataIndex;
        console.log(params);
      });
	  
	window.addEventListener("resize",function(){
		myChart1.resize();
	});