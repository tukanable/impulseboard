import './styles.css';

const actions = [
  {
    label: 'Покурить позже',
    description: 'Подожди 10 минут, и если желание останется — сделай это.',
  },
  {
    label: 'Съесть сладкое позже',
    description: 'Сладость подождёт. Посмотри, пройдёт ли желание через 15 минут.',
  },
  {
    label: 'Проверить соцсети позже',
    description: 'Вернись к соцсетям через 20 минут — обновлений станет больше!',
  },
  {
    label: 'Купить что-то ненужное позже',
    description: 'Подумай ещё раз через 30 минут — это действительно нужно?',
  },
  {
    label: 'Поиграть в игру позже',
    description: 'Начни через полчаса. Игра будет ещё приятнее.',
  },
  {
    label: 'Попить кофе позже',
    description: 'Подожди 15 минут — почувствуешь, что действительно этого хочешь.',
  },
  {
    label: 'Открыть мессенджер позже',
    description: 'Подожди 10 минут, сообщения никуда не денутся.',
  },
  {
    label: 'Лечь на диван позже',
    description: 'Ещё 20 минут активности, и отдых будет вдвое приятнее.',
  },
  {
    label: 'Посмотреть сериал позже',
    description: 'Начни смотреть через час — эпизод станет вкуснее после работы.',
  },
];

const getAction = ({ label, description, count }, idx: number) => `
  <div class="p-2 shadow-md text-sm rounded-lg m-2 flex flex-col items-center justify-between w-24 min-h-28" data-action-idx="${idx}">
    <div class="text-center">
      ${label}
    </div>
    <div class="text-lg mt-2 count">
      ${count || 0}
    </div>
  </div>
`;

const getHeader = () => `
  <div class="bg-base-100 text-base-content sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-shadow duration-100 [transform:translate3d(0,0,0)] shadow-sm">
    <div class="navbar bg-base-100 w-full">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl">Bad Clicker</a>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
          <li><a href="/editor.html">Editor</a></li>
          <li><a href="/about.html">About</a></li>
        </ul>
      </div>
    </div>
  </div>
`;

actions.forEach(action => {
  const count = localStorage.getItem(action.label);
  action.count = count ? +count : 0;
});

const renderAll = () => {
  const html = `
    ${getHeader()}
    <div class="flex flex-wrap justify-center">
      ${actions.map(getAction).join('')}
    </div>
    <div class="position-fixed absolute inset-0 bg-white z-50 flex items-center justify-center text-center hidden message p-10">
      ???
    </div>
  `;

  document.body.innerHTML = html;
};

renderAll();

function showMessage(message: string) {
  const messageEl = document.querySelector('.message');
  messageEl.classList.remove('hidden');
  messageEl.textContent = message;

  setTimeout(() => {
    messageEl.classList.add('hidden');
  }, 2000);
}

document.addEventListener('click', (e) => {
  const actionEl = e.target.closest('[data-action-idx]');
  const actionIdx = actionEl?.getAttribute('data-action-idx');

  if (actionIdx !== undefined) {
    const action = actions[+actionIdx];
    action.count = action.count ? action.count + 1 : 1;

    const countEl = actionEl.querySelector('.count');
    countEl.textContent = action.count;

    showMessage(action.description);

    localStorage.setItem(action.label, action.count);
  }
});
