import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

// Init selects
const selects = document.querySelectorAll('select');
M.FormSelect.init(selects);

// Init autocomplete
const autocompletes = document.querySelectorAll('.autocomplete');
M.Autocomplete.init(autocompletes, {
    data: {
        Apple: null
    }
});

export function getAutoCompleteInstance(el) {
    return M.Autocomplete.getInstance(el);
}

// Init datepickers
const datepickers = document.querySelectorAll('.datepicker');
M.Datepicker.init(datepickers, {
    showClearBtn: true,
    format: 'yyyy-mm'
});