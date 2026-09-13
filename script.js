// Trocar aqui quando tiver o número real do WhatsApp (só dígitos, com DDI+DDD).
const WHATSAPP_NUMBER = '5522999685918';

// Bloqueia zoom, seleção e cópia de texto (fora dos campos de formulário).
const isFormField = (el) => ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName);

document.addEventListener('contextmenu', (e) => e.preventDefault());

document.addEventListener('selectstart', (e) => {
  if (!isFormField(e.target)) e.preventDefault();
});

document.addEventListener('copy', (e) => {
  if (!isFormField(e.target)) e.preventDefault();
});

document.addEventListener('dragstart', (e) => e.preventDefault());

document.addEventListener('keydown', (e) => {
  const zoomKeys = ['+', '-', '=', '0'];
  if ((e.ctrlKey || e.metaKey) && zoomKeys.includes(e.key)) e.preventDefault();
});

document.addEventListener('wheel', (e) => {
  if (e.ctrlKey) e.preventDefault();
}, { passive: false });

document.addEventListener('gesturestart', (e) => e.preventDefault());

document.getElementById('ano').textContent = new Date().getFullYear();

const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
  nav.classList.toggle('is-open');
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => nav.classList.remove('is-open'));
});

document.querySelectorAll('.js-wa-link').forEach((link) => {
  link.href = `https://wa.me/${WHATSAPP_NUMBER}`;
});

const form = document.getElementById('orcamento-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const linhas = [
    'Olá! Quero solicitar um orçamento de transfer.',
    `Nome: ${data.get('nome')}`,
    `Origem: ${data.get('origem')}`,
    `Destino: ${data.get('destino')}`,
    `Data/horário: ${data.get('data')}`,
    `Veículo: ${data.get('veiculo')}`,
  ];

  const obs = data.get('obs');
  if (obs) linhas.push(`Observações: ${obs}`);

  const mensagem = encodeURIComponent(linhas.join('\n'));
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${mensagem}`, '_blank', 'noopener');
});
