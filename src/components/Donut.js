import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// I normally hate coding videos, but this one was quite helpful:
// https://www.youtube.com/watch?v=IqlmFSII8AY

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
    plugins: {
        // hide the legend
        legend: {
            display: false,
        },
    },
};

const textCenter = {
    id: 'textCenter',
    beforeDatasetsDraw(chart, args, pluginOptions) {
        const { ctx, data } = chart;

        ctx.save();
        ctx.font = 'bolder 40px Bebas Neue';
        ctx.fillStyle = 'red';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(
            `${data.datasets[0].data[0]}`,
            chart.getDatasetMeta(0).data[0].x - 15,
            chart.getDatasetMeta(0).data[0].y
        );
    },
};
const textCenterPercentage = {
    id: 'textCenter',
    beforeDatasetsDraw(chart, args, pluginOptions) {
        const { ctx } = chart;

        ctx.save();
        ctx.font = 'bolder 40px Roboto';
        ctx.fillStyle = 'blue';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(
            `%`,
            chart.getDatasetMeta(0).data[0].x + 15,
            chart.getDatasetMeta(0).data[0].y
        );
    },
};

export default function ChartJSDonut({ percentage }) {
    const data = {
        labels: ['Doesnt', 'Matter'],
        datasets: [
            {
                label: '# of Votes',
                data: [percentage, 100 - percentage],
                backgroundColor: ['#7AC0FA', '#e7e6eb'],
                borderWidth: 0,
            },
        ],
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', height: 200 }}>
            <Doughnut data={data} options={options} plugins={[textCenter, textCenterPercentage]} />
        </div>
    );
}