

async function convertirMoneda() {
    const dinero = document.getElementById('dinero').value;
    const moneda = document.getElementById('moneda').value;
    const resultado = document.getElementById('resultado');
    try {
        const response = await fetch("https://mindicador.cl/api/");
        const data = await response.json();
        console.log(data);

        let montoCambio = "";
        if (moneda === 'dolar') {
            montoCambio = data.dolar.valor
        }
        else if (moneda === 'euro') {
            montoCambio = data.euro.valor
        }
        else if (moneda === 'uf') {
            montoCambio = data.uf.valor
        }
        else if (moneda === 'utm') {
            montoCambio = data.utm.valor
        }

        //console.log("Valor del cambio: ", montoCambio);

        const conversion = (dinero / montoCambio).toFixed(2);
        //console.log(conversion);
        resultado.innerText = ` ${conversion} ${moneda} `

        //Agregar la funcion para renderizar grafico
        renderChart(moneda)
    }

    catch (error) {
        alert('Error al cargar los datos desde la API');

    }
}

//Funcion para renderizar el gráfico con datos historicos
let grafico = '';

async function renderChart(moneda) {
    try {
        const response = await fetch(`https://mindicador.cl/api/${moneda}`);
        const data = await response.json();
        //console.log(data);

        //extraer informacion de los últimos 10 días
        const historicData = data.serie.slice(0,10).reverse()
        const etiquetas = historicData.map( item => item.fecha.slice(0, 10));
        const valores = historicData.map( item => item.valor);

        if (grafico) {
            //Elimina un grafico existente, si existe
            grafico.destroy()
        }
        const context = document.getElementById('grafico').getContext("2d");

        grafico = new Chart( context, {
            type: 'line',
            data: {
                labels: etiquetas,
                datasets: [{
                    label: `Valor en los últimos 10 días (${moneda})`,
                    data: valores,
                    borderColor: "#ff0000",
                    tension: 0.1

                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    x: {
                        ticks: {
                            maxRotation: 45,
                            minRotation: 0
                        }
                    }
                }
            }
        })

    }

    catch (error) {
        alert('Error al cargar los datos desde la API');

    }
}

renderChart(moneda)