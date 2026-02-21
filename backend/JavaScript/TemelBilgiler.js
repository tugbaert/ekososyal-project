document.addEventListener('DOMContentLoaded', () => {
    const toggleButtons = document.querySelectorAll('.toggle-btn');

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const contentId = button.getAttribute('aria-controls');
            const content = document.getElementById(contentId);
            const isExpanded = button.getAttribute('aria-expanded') === 'true';

            // Diğerlerini kapat (İsteğe bağlı)
            document.querySelectorAll('.topic-content').forEach(c => {
                if(c !== content) c.style.maxHeight = '150px';
            });
            document.querySelectorAll('.toggle-btn').forEach(b => {
                if(b !== button) {
                    b.setAttribute('aria-expanded', 'false');
                    b.textContent = 'Daha Fazla Oku';
                }
            });

            if (isExpanded) {
                content.style.maxHeight = '150px';
                button.setAttribute('aria-expanded', 'false');
                button.textContent = 'Daha Fazla Oku';
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                button.setAttribute('aria-expanded', 'true');
                button.textContent = 'Daha Az Oku';
            }
        });
    });
});