(function () {
  var grid = document.getElementById('areas-grid');
  var tabsWrap = document.getElementById('area-filter-tabs');
  var searchInput = document.getElementById('area-search-input');
  var emptyState = document.getElementById('areas-empty-state');
  if (!grid || !tabsWrap) return;

  var cards = Array.prototype.slice.call(grid.querySelectorAll('.area-card'));
  var activeFilter = 'all';

  function normalize(str) {
    return String(str)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '');
  }

  function applyFilters() {
    var query = searchInput ? normalize(searchInput.value.trim()) : '';
    var visible = 0;

    cards.forEach(function (card) {
      var matchesFilter = activeFilter === 'all' || card.getAttribute('data-state') === activeFilter;
      var matchesSearch = query === '' || normalize(card.getAttribute('data-search') || '').indexOf(query) !== -1;
      var show = matchesFilter && matchesSearch;
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });

    if (emptyState) emptyState.style.display = visible === 0 ? '' : 'none';
  }

  tabsWrap.querySelectorAll('.filter-tab').forEach(function (btn) {
    btn.addEventListener('click', function () {
      tabsWrap.querySelectorAll('.filter-tab').forEach(function (b) {
        b.classList.remove('is-active');
      });
      btn.classList.add('is-active');
      activeFilter = btn.getAttribute('data-filter') || 'all';
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }
})();
