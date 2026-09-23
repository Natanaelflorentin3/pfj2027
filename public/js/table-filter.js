(function () {
  function normalize(str) {
    return String(str)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '');
  }

  var inputs = document.querySelectorAll('[data-filter-input]');

  inputs.forEach(function (input) {
    var targetId = input.getAttribute('data-filter-input');
    var table = document.getElementById(targetId);
    if (!table) return;

    var rows = Array.prototype.slice.call(table.querySelectorAll('tbody tr'));
    var emptyMsg = document.querySelector('[data-filter-empty="' + targetId + '"]');
    var countEl = document.querySelector('[data-filter-count="' + targetId + '"]');
    var totalCount = rows.length;

    function applyFilter() {
      var query = normalize(input.value.trim());
      var visibleCount = 0;

      rows.forEach(function (row) {
        var text = normalize(row.textContent || '');
        var match = query === '' || text.indexOf(query) !== -1;
        row.style.display = match ? '' : 'none';
        if (match) visibleCount++;
      });

      if (emptyMsg) {
        emptyMsg.style.display = visibleCount === 0 ? '' : 'none';
      }
      if (countEl) {
        countEl.textContent = query === '' ? '' : `Mostrando ${visibleCount} de ${totalCount}`;
      }
    }

    input.addEventListener('input', applyFilter);
  });
})();
