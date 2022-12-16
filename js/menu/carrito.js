
async function renderTablaCarrito(carrito) {
    
    
    try {
        
        const elemSectionCarrito = document.getElementsByClassName('section-carrito')[0]
        const respuesta = await fetch('plantillas/carrito.hbs')
        const plantillaHbs = await respuesta.text()
        const template = Handlebars.compile(plantillaHbs)
        const html = template({ carrito })

        elemSectionCarrito.innerHTML = html
        
        if (carrito.length) {
            let resultados = cantidadProdYMonto(carrito)
            elemSectionCarrito.querySelector('.cantidad-productos span').textContent = resultados.cantidadTotal
            elemSectionCarrito.querySelector('.monto-carrito span').textContent = ' $ ' + resultados.montoTotal
        }
       
        elemSectionCarrito.classList.add('section-carrito--visible')
        
    } catch (error) {
        console.error(error)
    }

}

function initCarrito() {
    console.warn('initCarrito()')
    
    const btnCarrito = document.getElementsByClassName('search-bar__carrito-container')[0]
    
    btnCarrito.addEventListener('click', async () => {
        
        try {
            
            await renderTablaCarrito(carritoController.carrito);
            const body = document.querySelector('body');
            body.style.overflow = 'hidden';
            
               
        } catch (error) {
            console.error(error)
        }
        
    })

}

function cantidadProdYMonto (carrito) {
    let cantidadTotal = 0;
    let valor = 0;
    let valorTotal = 0;
    let montoTotal = 0;
    let resultados = {};
    carrito.forEach(producto => {
        cantidadTotal += producto.cantidad;
        valor = producto.precio.replace(/\./g, '').replace(/,/g, '.');
        valorTotal = parseFloat(valor).toFixed(2) * producto.cantidad;
        montoTotal += valorTotal;
    });
    return resultados = {
        cantidadTotal: cantidadTotal,
        montoTotal: montoTotal,
    };
}

function cerrarConCruz() {
    const elemSectionCarrito = document.getElementsByClassName('section-carrito')[0];
    elemSectionCarrito.classList.remove('section-carrito--visible');
    const body = document.querySelector('body');
    body.style.overflow = 'auto';
}

initCarrito()