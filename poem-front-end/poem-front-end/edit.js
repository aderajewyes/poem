var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/* eslint-disable prettier/prettier */
var loadEditPoem = function () {
    var titles = document.getElementById('edited-titles');
    fetch('http://localhost:3000/poems', {
        method: 'GET',
        headers: {
            'Authorization': "Bearer ".concat(localStorage.getItem('token')),
            'Content-Type': 'application/json',
        },
    })
        .then(function (res) { return res.json(); })
        .then(function (data) {
        data.forEach(function (poem) {
            var cellElement = document.createElement('button');
            cellElement.innerText = poem.title;
            cellElement.classList.add('title_button');
            cellElement.id = poem.id.toString();
            cellElement.style.backgroundColor = 'red';
            cellElement.addEventListener('click', displayPoem);
            titles.appendChild(cellElement);
        });
    });
};
var displayPoem = function (e) {
    var t = document.getElementById('etitles');
    var p = document.getElementById('epoem');
    var subButton = document.querySelector('.editSubmit');
    subButton.addEventListener('click', editPoem);
    var body;
    fetch('http://localhost:3000/poems', {
        method: 'GET',
        headers: {
            'Authorization': "Bearer ".concat(localStorage.getItem('token')),
            'Content-Type': 'application/json'
        },
    })
        .then(function (res) { return res.json(); })
        .then(function (data) {
        data.forEach(function (poem) {
            if (poem.title == e.target.innerText) {
                body = poem.body;
                subButton.id = poem.id.toString();
            }
        });
        t.value = e.target.innerText;
        t.style.color = 'red';
        p.style.color = 'red';
        t.style.height = 'fit-content';
        t.style.height = 'fit-content';
        p.style.height = 'fit-content';
        p.style.height = 'fit-content';
        p.value = body;
    });
};
function editPoem(e) {
    return __awaiter(this, void 0, void 0, function () {
        var apiUrl, poemId, updatedPoem, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiUrl = 'http://localhost/3000/poems';
                    poemId = e.target.id;
                    console.log(poemId);
                    updatedPoem = {
                        title: document.getElementById('etitles').value,
                        body: document.getElementById('epoem').value,
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch("".concat(apiUrl, "/").concat(poemId), {
                            method: 'PATCH',
                            headers: {
                                'Authorization': "Bearer ".concat(localStorage.getItem('token')),
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(updatedPoem),
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! Status: ".concat(response.status));
                    }
                    console.log('Poem updated successfully');
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error:', error_1.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
window.onload = function () {
    loadEditPoem();
};
