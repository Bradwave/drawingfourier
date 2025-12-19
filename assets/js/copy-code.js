document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('pre').forEach(pre => {
    if (!pre.querySelector('code')) return;
    
    // Ensure relative positioning
    if (getComputedStyle(pre).position === 'static') {
        pre.style.position = 'relative';
    }

    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.innerHTML = '<span class="material-symbols-outlined">content_copy</span>';
    btn.title = "Copia";
    
    btn.onclick = () => {
       const code = pre.querySelector('code').innerText;
       navigator.clipboard.writeText(code).then(() => {
          btn.innerHTML = '<span class="material-symbols-outlined">check</span>';
          setTimeout(() => btn.innerHTML = '<span class="material-symbols-outlined">content_copy</span>', 2000);
       });
    };
    
    pre.appendChild(btn);
  });
});
