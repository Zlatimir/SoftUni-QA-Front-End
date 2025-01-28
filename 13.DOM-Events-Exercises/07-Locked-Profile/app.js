function lockedProfile() {
    let buttons = Array.from(document.querySelectorAll('button'));
    buttons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            let profile = e.target.parentElement;
            let isLocked = profile.querySelector('input[type="radio"][value="lock"]').checked;
            if (!isLocked) {
                let hiddenFields = profile.querySelector('div');
                let isVisible = hiddenFields.style.display === 'block';
                hiddenFields.style.display = isVisible ? 'none' : 'block';
                e.target.textContent = isVisible ? 'Show more' : 'Hide it';
            }
        });
    });
}