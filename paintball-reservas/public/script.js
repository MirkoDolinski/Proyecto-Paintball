document.addEventListener('DOMContentLoaded', () => {
    
    const consultarBtn = document.getElementById('consultarBtn');
    const reservasList = document.getElementById('reservasList');

    consultarBtn.addEventListener('click', async () => {
        try {
            const response = await fetch('/reservas');
            const reservas = await response.json();
            reservasList.innerHTML = '';

            if (reservas.length === 0) {
                const noReservasMessage = document.createElement('p');
                noReservasMessage.textContent = 'No hay reservas disponibles.';
                noReservasMessage.classList.add('no-reservas');
                reservasList.appendChild(noReservasMessage);
            } else {
                reservas.forEach(reserva => {
                    const listItem = document.createElement('li');
                    
                    const header = document.createElement('span');
                    header.classList.add('reserva-header');
                    header.textContent = `Reserva de: ${reserva.name}`;

                    const details = document.createElement('div');
                    details.classList.add('reserva-details');
                    details.innerHTML = `
                        <span>Email: ${reserva.email}</span>
                        <span>Teléfono: ${reserva.phone}</span>
                        <span>Fecha: ${reserva.date}</span>
                        <span>Horario: ${reserva.time}</span>
                        <span>Jugadores: ${reserva.players}</span>
                        <span>Sede: ${reserva.location}</span>
                    `;
                    
                    listItem.appendChild(header);
                    listItem.appendChild(details);
                    reservasList.appendChild(listItem);
                });
            }
        } catch (error) {
            console.error('Error al consultar reservas:', error);
        }
    });

    
    const reservaForm = document.getElementById('reservaForm');
    reservaForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(reservaForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        try {
            const response = await fetch('/php/procesar_reserva.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(data),
            });

            if (response.ok) {
                alert('Reserva creada con éxito');
                reservaForm.reset();
            } else {
                alert('Error al crear la reserva');
            }
        } catch (error) {
            console.error('Error al enviar la reserva:', error);
        }
    });
});
