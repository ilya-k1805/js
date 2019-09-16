//1. На основе массива **map** и массива **users** собрать новый массив объектов где в каждом объекте будут только
// те свойства которые перечислены в массиве **map**
const map = ["_id", "name", "isActive", "balance"];
const users = [
    {
        "_id": "5d220b10e8265cc978e2586b",
        "isActive": true,
        "balance": 2853.33,
        "age": 20,
        "name": "Buckner Osborne",
        "gender": "male",
        "company": "EMPIRICA",
        "email": "bucknerosborne@empirica.com",
        "phone": "+1 (850) 411-2997",
        "registered": "2018-08-13T04:28:45 -03:00",
        "nestedField": { total: 300 }
    },
    {
        "_id": "5d220b10144ef972f6c2b332",
        "isActive": true,
        "balance": 1464.63,
        "age": 38,
        "name": "Rosalie Smith",
        "gender": "female",
        "company": "KATAKANA",
        "email": "rosaliesmith@katakana.com",
        "phone": "+1 (943) 463-2496",
        "registered": "2016-12-09T05:15:34 -02:00",
        "nestedField": { total: 400 }
    },
    {
        "_id": "5d220b1083a0494655cdecf6",
        "isActive": false,
        "balance": 2823.39,
        "age": 40,
        "name": "Estrada Davenport",
        "gender": "male",
        "company": "EBIDCO",
        "email": "estradadavenport@ebidco.com",
        "phone": "+1 (890) 461-2088",
        "registered": "2016-03-04T03:36:38 -02:00",
        "nestedField": { total: 200 }
    }
];

function filterArrayByObjectsProperties(objects, properties) {
    let filteredArray = [];

    objects.forEach(function (item) {
        let itemKeys = Object.keys(item);

        itemKeys = itemKeys.filter(function (key) {
            return properties.includes(key);
        });

        let filteredItem = {};

        itemKeys.forEach(function (key) {
            filteredItem[key] = item[key];
        });

        filteredArray.push(filteredItem);
    });

    return filteredArray;
}

console.log(filterArrayByObjectsProperties(users, map));

//2. Написать функцию сортировки которая принимает массив объектов который хотим сортировать, поле по которому
// хотим сортировать, и в каком порядке сортировать по возрастанию asc или по убыванию desc.
function sortArrayByObjectsProperties(objects, property, sortOrder = 'desc') {
    if (!validateParams(objects, property, sortOrder)) {
        return;
    }

    return [].concat(objects).sort(function (a, b) {
        return window[sortOrder + 'Sort'](
            getNestedProperty(a, property),
            getNestedProperty(b, property)
        );
    });
}

function validateParams(objects, property, sortOrder) {
    if (!Array.isArray(objects)) {
        return false;
    }

    let validProps = objects.every(function (object) {
        let prop = getNestedProperty(object, property);

        return prop && (typeof prop === 'number' || typeof prop === 'string');
    });

    if (!validProps) {
        return false;
    }

    return ['asc', 'desc'].includes(sortOrder);
}

function descSort(a, b) {
    return (a > b ? -1 : 1);

}

function ascSort(a, b) {
    return (a > b ? 1 : -1);
}

function getNestedProperty(item, property) {
    const properties = property.split('.');

    for (let i = 0; i < properties.length; i++) {
        item = item[properties[i]];
    }

    return item;
}

console.log(sortArrayByObjectsProperties(users, 'nestedField.total', 'asc'));
