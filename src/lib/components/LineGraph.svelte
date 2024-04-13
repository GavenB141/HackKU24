<script lang="ts">
    import Chart from 'chart.js/auto'
    import { browser } from '$app/environment';


  if (browser) {
    // setup
    const data = {
      labels: [1,2,3,4,5,6,7],
      datasets: [{
        label: 'Weekly Sales',
        data: [10, 12, 6, 9, 12, 3, 9],
        backgroundColor: [
          'rgba(255, 26, 104, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(0, 0, 0, 0.2)'
        ],
        fill: {
            target: {
                value: 10
            },
            below: (context: any) => {
            const chart = context.chart
            const {ctx, chartArea, data, scales} = chart
            if(!chartArea){
                return null;
            }
            return belowGradient(ctx, chartArea, data, scales)
            },
            
            above: (context: any) => {
            const chart = context.chart
            const {ctx, chartArea, data, scales} = chart
            if(!chartArea){
                return null;
            }
            return aboveGradient(ctx, chartArea, data, scales)
            },
        },
        borderColor: (context: any) => {
            const chart = context.chart
            const {ctx, chartArea, data, scales} = chart
            if(!chartArea){
                return null;
            }
            return getGradient(ctx, chartArea, data, scales)
        },
        tension: .4,
        pointRadius: 0,
        pointHitRadius: 10,
        hoverPointRadius: 0
      }]
    };
    /*
    const dottedLine = {
            id: 'dottedLine',
            beforeDatasetsDraw(chart : any, args: any, pluginOptions : any) {
            const { ctx, data, chartArea: {left, right, width}, scales: {x, y} } = chart;
            ctx.save();
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.setLineDash([1, 5]);
            ctx.strokeStyle = 'rgba(102, 102, 102, 1)';
            ctx.moveTo(left, y.getPixelForValue(data.datasets[0].data[0]));
            ctx.lineTo(right, y.getPixelForValue(data.datasets[0].data[0])) ;
            ctx.stroke();
            ctx.closePath();
            ctx.setLineDash([0, 0]);
            }
        }
        */
    // config 
    const config = {
      type: 'line',
      data,
      options: {
        scales: {
            y: {
                beginAtZero: true
            },
          //plugins: {
            //legends: {
              //  display: false
            //}
          //}
        },
        //plugins:[dottedLine]
      }
    };

    // render init block
    const myChart = new Chart(
      document.getElementById('myChart'),
      config
    );

    function getGradient(ctx : any, chartArea : any, data : any, scales : any){
        const {left, right, top, bottom, width, height} = chartArea
        const {x,y} = scales
        const gradientBorder = ctx.createLinearGradient(0,0,0,bottom) 
        const shift = y.getPixelForValue(data.datasets[0].data[0]) / bottom
        gradientBorder.addColorStop(0,'rgba(75, 192, 192, 1)');
        gradientBorder.addColorStop(shift,'rgba(75, 192, 192, 1)');
        gradientBorder.addColorStop(shift,'rgba(255, 26, 104, 1)');
        gradientBorder.addColorStop(1,'rgba(255, 26, 104, 1)');
        return gradientBorder
    }
    function  belowGradient(ctx : any, chartArea : any, data : any, scales : any){
        const {left, right, top, bottom, width, height} = chartArea
        const {x,y} = scales
        const gradientBackground = ctx.createLinearGradient(0, y.getPixelForValue(data.datasets[0].data[0]), 0 , bottom);
        gradientBackground.addColorStop(0, 'rgba(255, 26, 104, 0)')
        gradientBackground.addColorStop(1, 'rgba(255, 26, 104, 0.7)')
        return gradientBackground
    }
    
    function  aboveGradient(ctx : any, chartArea : any, data : any, scales : any){
        const {left, right, top, bottom, width, height} = chartArea
        const {x,y} = scales
        const gradientBackground = ctx.createLinearGradient(0, y.getPixelForValue(data.datasets[0].data[0]), 0 , top);
        gradientBackground.addColorStop(0, 'rgba(75, 192, 192, 0)')
        gradientBackground.addColorStop(1, 'rgba(75, 192, 192, .7)')
        return gradientBackground
    }
    function addData(chart : any, label : any, newData : any) {
        chart.data.labels.push(label);
        chart.data.datasets.forEach((dataset : any) => {
        dataset.data.push(newData);
    });
        chart.update('none');
        updateScales(chart)
    }

    function removeData(chart: any) {
        chart.data.labels.pop();
        chart.data.datasets.forEach((dataset: any) => {
        dataset.data.pop();
        });
        chart.update('none');
    }
    function updateScales(chart: any) {
        let xScale = chart.scales.x;
        let yScale = chart.scales.y;
        chart.options.scales = {
            newId: {
                display: true
            },
            y: {
                display: true,
                type: 'logarithmic'
            }
        };
        chart.update('none');
        // need to update the reference
        xScale = chart.scales.newId;
        yScale = chart.scales.y;
}

                // Instantly assign Chart.js version
                const chartVersion = document.getElementById('chartVersion');
                chartVersion.innerText = Chart.version;
}
  


</script>

<div class="w-full h-full"><canvas id="myChart"></canvas></div>
