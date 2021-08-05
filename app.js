let grid = document.getElementById('grid');
let colnum = document.getElementById('colnum');
let boxes = [];
let nextBoxId = 1;

const COL_LIMIT = 10;

function render() {
    removeAllChildNodes(grid);
    renderRows();
}

function renderRows() {
    let numCols = Number.parseInt(colnum.value) || 1;
    let boxIds = [...boxes];
    let rowCount = Math.ceil(boxes.length / numCols);
    for (let i = 0; i <= rowCount; i++) {
        fillRow(numCols, boxIds, i + 1);
    }
}

function fillRow(numCols, boxIds, e) {
    let id, i = 0;
    const row = boxIds.length && newRow(e)
    while (i < numCols && (id = boxIds.shift())) {
        let box = newBox(id);
        row.appendChild(box);
        i++;
    }
}

function newRow(id) {
    let row = document.createElement('div');
    row.className = 'row';
    row.id = 'row' + id;
    grid.appendChild(row);
    return row;
}

function newBox(id) {
    let box = document.createElement('div');
    box.className = 'col';
    box.innerHTML =
        `<div class="box">
                <div class="box-main">
                    <h3>B${id}</h3>
                </div>
                <button class="box-button" onClick={removeBox(${id})}
                    style="float:right;">x
                </button>
            </div>`;
    return box;
}

function addBox() {
    boxes.push(nextBoxId);
    nextBoxId++;
    render();
}

function removeBox(id) {
    boxes.splice(boxes.indexOf(id), 1);
    render();
}

function reset() {
    boxes = [];
    nextBoxId = 1;
    colnum.value = 1;
    render();
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function initColNSelect() {
    for (let i = 1; i <= COL_LIMIT; i++) {
        let option = document.createElement('option');
        option.value = i;
        option.innerText = i;
        colnum.appendChild(option);
    }
}

initColNSelect();
