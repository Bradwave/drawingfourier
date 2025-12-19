document.addEventListener('DOMContentLoaded', () => {
    const tocLinks = document.querySelectorAll('.sidebar-toc a');
    const sections = [];
    
    if (tocLinks.length === 0) return;

    tocLinks.forEach(link => {
        const id = link.getAttribute('href').substring(1);
        const section = document.getElementById(id);
        if (section) {
            sections.push({ id, element: section, link });
        }
    });

    // Use IntersectionObserver to track active section
    // rootMargin: trigger when heading is near the top of the viewport
    const observerOptions = {
        root: null,
        rootMargin: '-10% 0px -80% 0px', 
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active from all
                tocLinks.forEach(l => l.classList.remove('active'));
                
                // Add active to current
                const activeId = entry.target.id;
                const activeLink = document.querySelector(`.sidebar-toc a[href="#${activeId}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section.element);
    });
});
