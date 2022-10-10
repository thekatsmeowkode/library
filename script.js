const openModal = document.querySelectorAll('[data-modal-target]');
const closeModal = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModal.forEach(button => 
    {button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModalFunction(modal)
    })})

function openModalFunction(modal) {
    if (modal == null) return;
    modal.classList.add('active');
    overlay.classList.add('active')
}

closeModal.forEach(button =>
    {button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModalFunction(modal)
    })})

function closeModalFunction(modal) {
    if (modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active')
}

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => closeModal(modal))
})