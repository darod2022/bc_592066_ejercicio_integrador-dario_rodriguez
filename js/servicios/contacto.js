class ContactoService {
    URL_CONTACTO = 'https://63802d028efcfcedacfe5083.mockapi.io/contacto/'

    async guardarContactoServicio(datosPersonales) {
        const datosGuardados = await http.post(this.URL_CONTACTO, datosPersonales)
        return datosGuardados           
    }

}

const contactoService = new ContactoService()