document.querySelectorAll('.info-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.backgroundColor = '#fff4f1';
    });
    card.addEventListener('mouseleave', () => {
      card.style.backgroundColor = '#fafafa';
    });
  });
  