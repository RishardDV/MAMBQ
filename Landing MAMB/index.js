document.getElementById('modal-install').addEventListener('click', function () {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();          // 👈 Aquí
    deferredPrompt.userChoice.then(function () {
        deferredPrompt = null;                          
        var b = document.getElementById('install-banner');
        if (b) b.classList.remove('show');
    });
});