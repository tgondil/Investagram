const express = require('express');
const app = express();
const Chart = require('chart.js');

const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
            'red',
            'blue',
            'yellow',
            'green',
            'purple',
            'orange'
        ]
    }]
};


app.get('/pie-chart', (req, res) => {

    res.set('Content-Type', 'image/png');
    

    const canvas = new Chart(600, 400);
    

    const buffer = canvas.renderToBuffer({
        type: 'pie',
        data: data
    });
    
    res.send(buffer);
});

const port = 3000;
