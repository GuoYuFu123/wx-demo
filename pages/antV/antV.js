
// index.js
// import F2 from '@antv/wx-f2'; // 注：也可以不引入， initChart 方法已经将 F2 传入，如果需要引入，注意需要安装 @antv/wx-f2 依赖

let chart = null;

function initChart(canvas, width, height, F2) { // 使用 F2 绘制图表
    const data = [
        { year: '1951 年', sales: 38 },
        { year: '1952 年', sales: 52 },
        { year: '1956 年', sales: 61 },
        { year: '1957 年', sales: 145 },
        { year: '1958 年', sales: 48 },
        { year: '1959 年', sales: 38 },
        { year: '1960 年', sales: 38 },
        { year: '1962 年', sales: 38 },
    ];
    chart = new F2.Chart({
        el: canvas,
        width,
        height
    });

    chart.source(data, {
        sales: {
            tickCount: 5
        }
    });
    chart.tooltip({
        showItemMarker: false,
        onShow(ev) {
            const { items } = ev;
            items[0].name = null;
            items[0].name = items[0].title;
            items[0].value = '¥ ' + items[0].value;
        }
    });
    chart.interval().position('year*sales');
    chart.render();
    return chart;
}

Page({
    data: {
        opts: {
            onInit: initChart
        }
    },

    onReady() {
    }
});