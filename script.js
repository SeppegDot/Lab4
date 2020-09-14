const btnCreate = document.querySelector('.btnCreateVertex');
const vertexValue = document.querySelector('.vertexInput');
const dataEntry = document.querySelector('.dataEntry');
const btnResult = document.querySelector('.result');

let matrixInputs = [];

btnCreate.addEventListener('click', createMatrixInputs);

function Result() {

    let matrix = getMatrixValues(matrixInputs);
    
    let d = floyd(matrix);
    outputMatrixA(d);
    console.log(d);

}

//создание инпутов для ввода матрицы
function createMatrixInputs() {
    let node = document.querySelector('.matrix-inputs');
    matrixInputs = []

    const size = vertexValue.value;
    if (!size) {
        alert('Поле пустое');
        return;
    }

    // var size = document.getElementsByClassName("matrix-size")[0].value
    // size = document.getElementsByClassName("matrix-size")[0].value

    if (node.rows.length != 0) {
        for (var i = node.rows.length - 1; i >= 0; i -= 1) {
            var row = node.deleteRow(i)
        }
    }


    for (var i = 0; i < size; i += 1) {
        var row = node.insertRow()
        var inputsRow = []
        matrixInputs.push(inputsRow)
        for (var j = 0; j < size; j += 1) {
            var cell = row.insertCell()
            cell.style.padding = '2px'
            var input = document.createElement('input')
            inputsRow.push(input)
            input.type = 'text'
            input.style.width = '35px'
            // input.style.height = '18px'
            input.style.padding = '5px';
            cell.appendChild(input)
        }
    }

    btnResult.addEventListener('click', Result);
    return matrixInputs
}

//получить значения матрицы
function getMatrixValues(matrixInputs) {
    var res = []
    for (var i = 0; i < matrixInputs.length; i += 1) {
        var inputsRow = matrixInputs[i]
        var valuesRow = []
        for (var j = 0; j < inputsRow.length; j += 1) {
            var input = inputsRow[j]
            var valueNum = parseFloat(input.value)
            if (isNaN(valueNum)) {
                valueNum = 0
            }
            valuesRow.push(valueNum)
        }
        res.push(valuesRow)
    }
    return res
}

function floyd(d) {
    for (let i = 0; i < d.length; ++i)
        for (let j = 0; j < d.length; ++j)
            if (i ==j)
                d[i][j] = 0;
            else if (d[i][j] == 0)
                d[i][j] = 999;

    for (let k = 0; k < d.length; ++k)
        for (let i = 0; i < d.length; ++i)
            for (let j = 0; j < d.length; ++j)
                if (d[i][k] + d[k][j] < d[i][j])
                    d[i][j] = Math.min(d[i][j], d[i][k] + d[k][j]);

    return d;
}

function outputMatrixA(matrixA) {
    var node = document.querySelector('.matrix-output');

    for (var i = 0; i < matrixA.length; i++) {
        var row = node.insertRow();

        for (var j = 0; j < matrixA[0].length; j++) {
            var cell = row.insertCell();
            var number;
            if (matrixA[i][j] == 999)
                number =  document.createTextNode('\u221E');
            else
                number = document.createTextNode(matrixA[i][j]);
            cell.appendChild(number);
        }
    }
}