
class FormularioContacto {
  form = null
  inputs = null
  select = null
  textarea = null
  button = null
  camposValidos = [false, false, false, false, false]
  regExpValidar = [
    /^([A-Za-zñÑáéíóúÁÉÍÓÚ\s])+$/, // regexp nombre
    /^([A-Za-zñÑáéíóúÁÉÍÓÚ\s])+$/, // regexp apellido
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, // regexp e-mail
    /^([0-9\s])+$/, // regexp teléfono
    /^.+$/, // regexp mensaje
  ]
  
  start() {

    this.form = document.querySelector("#form_contacto")
    this.inputs = document.querySelectorAll("#form_contacto input")
    this.select = document.querySelector("#form_contacto select")
    this.textarea = document.querySelector("#form_contacto textarea")
    this.button = document.querySelector("#form_contacto button")
  
    this.button.disabled = true
  
    this.inputs.forEach((input, index) => {
      input.addEventListener("input", () => {
        this.validar(input.value, this.regExpValidar[index], index)
      })
    })

    this.textarea.addEventListener('input', () => {
      this.validar(this.textarea.value, this.regExpValidar[4], 4)
    })
  
    this.form.addEventListener("submit", async (e) => {
      e.preventDefault()
  
      const datosPersonales = this.leerDatosIngresados()
      this.limpiarFormulario()
      const div = document.querySelector('.mensaje-form')
  
      const datosGuardados = await contactoService.guardarContactoServicio(datosPersonales)
      
      if (datosGuardados) {
          div.innerHTML = '<p style="background-color:#13c406">Tus datos han sido enviados correctamente</p>'
      } else {
          div.innerHTML = '<p style="background-color:red">Ocurrió un problema en el envío de tus datos</p>'
      }
    })
    
  }
  
    
  algunCampoValido() {
    let valido =
      this.camposValidos[0] &&
      this.camposValidos[1] &&
      this.camposValidos[2] &&
      this.camposValidos[3] &&
      this.camposValidos[4] 
     
    return !valido
  }
  
    
  validar(valor, validador, index) {
    
    if (!validador.test(valor)) {
      this.setCustomValidityJS("Este campo no es válido", index)
      this.camposValidos[index] = false
      this.button.disabled = true
      return null
    }
  
    this.camposValidos[index] = true
    this.button.disabled = this.algunCampoValido()
  
    this.setCustomValidityJS("", index)
    return valor //por que retorna valor??
  }
  
    
  setCustomValidityJS(mensaje, index) {
    let divs = document.querySelectorAll("#form_contacto .advertencia")
    divs[index].innerHTML = mensaje
    divs[index].style.display = mensaje ? "block" : "none"
  }
  
    
  leerDatosIngresados() {
    return {
      nombre: this.inputs[0].value,
      apellido: this.inputs[1].value,
      pais: this.select.value,
      email: this.inputs[2].value,
      telefono: this.inputs[3].value,
      mensaje: this.textarea.value,
    }
  }
  
    
  limpiarFormulario() { 
    this.inputs.forEach(input => {
      input.value = ""  
    })

    this.select.value = ""
    this.textarea.value = ""
    this.button.disabled = true
    this.camposValidos = [false, false, false, false, false]
  }
}

function initContacto() {
  console.warn('initContacto()')
  const title = document.querySelector('title')
  title.textContent = 'Contacto'

  let formularioContacto = new FormularioContacto
  formularioContacto.start()
}