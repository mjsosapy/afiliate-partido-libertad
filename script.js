// Navegación móvil
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // Smooth scrolling para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Manejo del formulario
    const form = document.getElementById('afiliateForm');
    const fileInput = document.getElementById('cedulaFoto');
    const fileUploadContent = document.querySelector('.file-upload-content');

    // Validación de cédula paraguaya
    function validarCedula(cedula) {
        // Formato básico: números y letras, longitud típica paraguaya
        const cedulaRegex = /^[0-9]{6,8}$/;
        return cedulaRegex.test(cedula.replace(/\D/g, ''));
    }

    // Validación de teléfono paraguayo
    function validarTelefono(telefono) {
        const telefonoRegex = /^(\+595|0)?[9][0-9]{8}$/;
        return telefonoRegex.test(telefono.replace(/\D/g, ''));
    }

    // Validación de email
    function validarEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Validación de fecha de nacimiento (mayor de 18 años)
    function validarFechaNacimiento(fecha) {
        const fechaNac = new Date(fecha);
        const hoy = new Date();
        const edad = hoy.getFullYear() - fechaNac.getFullYear();
        const mes = hoy.getMonth() - fechaNac.getMonth();
        
        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
            return edad - 1 >= 18;
        }
        return edad >= 18;
    }

    // Validación en tiempo real
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validarCampo(this);
        });

        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validarCampo(this);
            }
        });
    });

    function validarCampo(campo) {
        const valor = campo.value.trim();
        let esValido = true;
        let mensaje = '';

        // Remover clases de error previas
        campo.classList.remove('error', 'success');
        
        // Validaciones específicas por campo
        switch(campo.id) {
            case 'cedula':
                if (!validarCedula(valor)) {
                    esValido = false;
                    mensaje = 'Ingrese una cédula válida (6-8 dígitos)';
                }
                break;
            case 'telefono':
                if (!validarTelefono(valor)) {
                    esValido = false;
                    mensaje = 'Ingrese un teléfono válido (formato paraguayo)';
                }
                break;
            case 'email':
                if (!validarEmail(valor)) {
                    esValido = false;
                    mensaje = 'Ingrese un email válido';
                }
                break;
            case 'fechaNacimiento':
                if (!validarFechaNacimiento(valor)) {
                    esValido = false;
                    mensaje = 'Debe ser mayor de 18 años';
                }
                break;
            default:
                if (campo.hasAttribute('required') && !valor) {
                    esValido = false;
                    mensaje = 'Este campo es obligatorio';
                }
        }

        // Aplicar clases y mostrar mensaje
        if (!esValido) {
            campo.classList.add('error');
            mostrarError(campo, mensaje);
        } else if (valor) {
            campo.classList.add('success');
            ocultarError(campo);
        }
    }

    function mostrarError(campo, mensaje) {
        // Remover mensaje de error previo
        ocultarError(campo);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = mensaje;
        errorDiv.style.cssText = `
            color: #ef4444;
            font-size: 0.8rem;
            margin-top: 0.25rem;
            font-weight: 500;
        `;
        
        campo.parentNode.appendChild(errorDiv);
    }

    function ocultarError(campo) {
        const errorDiv = campo.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    // Manejo de archivos
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            // Validar tipo de archivo
            if (!file.type.startsWith('image/')) {
                alert('Por favor, seleccione solo archivos de imagen.');
                this.value = '';
                return;
            }

            // Validar tamaño (máximo 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('El archivo es demasiado grande. Máximo 5MB.');
                this.value = '';
                return;
            }

            // Mostrar nombre del archivo
            fileUploadContent.innerHTML = `
                <i class="fas fa-check-circle" style="color: #10b981;"></i>
                <p>Archivo seleccionado: <strong>${file.name}</strong></p>
                <p style="font-size: 0.8rem; color: #6b7280;">${(file.size / 1024 / 1024).toFixed(2)} MB</p>
            `;
        }
    });

    // Drag and drop para archivos
    const fileUpload = document.querySelector('.file-upload');
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        fileUpload.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        fileUpload.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        fileUpload.addEventListener(eventName, unhighlight, false);
    });

    function highlight(e) {
        fileUpload.style.borderColor = '#3b82f6';
        fileUpload.style.backgroundColor = '#f0f9ff';
    }

    function unhighlight(e) {
        fileUpload.style.borderColor = '#d1d5db';
        fileUpload.style.backgroundColor = '#f9fafb';
    }

    fileUpload.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        fileInput.files = files;
        fileInput.dispatchEvent(new Event('change'));
    }

    // Envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar todos los campos
        let formularioValido = true;
        inputs.forEach(input => {
            validarCampo(input);
            if (input.classList.contains('error')) {
                formularioValido = false;
            }
        });

        if (!formularioValido) {
            alert('Por favor, corrija los errores en el formulario antes de enviar.');
            return;
        }

        // Mostrar estado de carga
        const submitButton = form.querySelector('.submit-button');
        const originalText = submitButton.innerHTML;
        submitButton.classList.add('loading');
        submitButton.innerHTML = 'Enviando...';

        // Simular envío (aquí puedes agregar tu lógica de envío real)
        setTimeout(() => {
            // Mostrar mensaje de éxito
            mostrarMensajeExito();
            
            // Resetear formulario
            form.reset();
            fileUploadContent.innerHTML = `
                <i class="fas fa-cloud-upload-alt"></i>
                <p>Arrastra tu archivo aquí o <span class="browse-text">Abrir Archivos</span></p>
            `;
            
            // Restaurar botón
            submitButton.classList.remove('loading');
            submitButton.innerHTML = originalText;
        }, 2000);
    });

    function mostrarMensajeExito() {
        // Crear modal de éxito
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        `;

        modal.innerHTML = `
            <div style="
                background: white;
                padding: 2rem;
                border-radius: 15px;
                text-align: center;
                max-width: 400px;
                margin: 1rem;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            ">
                <i class="fas fa-check-circle" style="font-size: 3rem; color: #10b981; margin-bottom: 1rem;"></i>
                <h3 style="color: #1e3a8a; margin-bottom: 1rem;">¡Formulario Enviado!</h3>
                <p style="color: #6b7280; margin-bottom: 1.5rem;">
                    Tu solicitud de afiliación ha sido enviada exitosamente. 
                    Nos pondremos en contacto contigo pronto.
                </p>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background: #3b82f6;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                ">Cerrar</button>
            </div>
        `;

        document.body.appendChild(modal);
    }

    // Animación de scroll para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animación
    document.querySelectorAll('.form-group').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Función para formatear cédula automáticamente
document.addEventListener('DOMContentLoaded', function() {
    const cedulaInput = document.getElementById('cedula');
    if (cedulaInput) {
        cedulaInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 8) {
                value = value.substring(0, 8);
            }
            e.target.value = value;
        });
    }

    // Función para formatear teléfono automáticamente
    const telefonoInput = document.getElementById('telefono');
    if (telefonoInput) {
        telefonoInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.startsWith('595')) {
                value = value.substring(3);
            }
            if (value.length > 9) {
                value = value.substring(0, 9);
            }
            if (value.length > 0) {
                value = '+595 ' + value;
            }
            e.target.value = value;
        });
    }
});
