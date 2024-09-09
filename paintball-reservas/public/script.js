document.getElementById('buscarReservasForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Evitar el envío del formulario

    const usuario = document.getElementById('usuario').value;

    // Realizamos la petición al servidor
    fetch(`/consultar-reservas?usuario=${usuario}`)
        .then(response => response.json())
        .then(data => {
            const cuerpoTabla = document.getElementById('cuerpoTablaReservas');
            cuerpoTabla.innerHTML = ''; // Limpiamos cualquier contenido anterior

            if (data.reservas.length > 0) {
                data.reservas.forEach(reserva => {
                    const fila = document.createElement('tr');

                    fila.innerHTML = `
                        <td>${reserva.id}</td>
                        <td>${reserva.fecha}</td>
                        <td>${reserva.hora}</td>
                        <td>${reserva.usuario}</td>
                    `;

                    cuerpoTabla.appendChild(fila);
                });
            } else {
                const fila = document.createElement('tr');
                fila.innerHTML = `<td colspan="4">No se encontraron reservas para este usuario.</td>`;
                cuerpoTabla.appendChild(fila);
            }
        })
        .catch(error => {
            console.error('Error al consultar las reservas:', error);
        });
});
