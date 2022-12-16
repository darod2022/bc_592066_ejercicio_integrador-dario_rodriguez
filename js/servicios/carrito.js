class CarritoService {
    URL_CARRITO = 'https://63802d028efcfcedacfe5083.mockapi.io/carrito/'

    async guardarCarritoServicio(carrito) {
        const carritoGuardado = await http.post(this.URL_CARRITO, carrito)
        return carritoGuardado
    }

}

const carritoService = new CarritoService()