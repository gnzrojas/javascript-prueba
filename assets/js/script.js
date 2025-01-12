

async function convertirMoneda(){
    const dinero = document.getElementById('dinero').value;
    const moneda = document.getElementById('moneda').value;
    const resultado = document.getElementById('resultado');
    try{
        const response = await fetch("https://mindicador.cl/api/");
        const data = await response.json();
        //console.log(data);
        
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
        else if (moneda === 'utm'){
            montoCambio =data.utm.valor
        }

        //console.log("Valor del cambio: ", montoCambio);
        
        const conversion = ( dinero / montoCambio ).toFixed(2);
        //console.log(conversion);
        resultado.innerHTML = ` ${conversion} ${moneda} `
        
    }

    catch(error) {
        console.log('error: ', error);
        
    }
}

