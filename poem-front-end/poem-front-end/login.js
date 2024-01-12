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
document.addEventListener('DOMContentLoaded', function () {
    var userLoginButton = document.querySelector('#userLoginButton');
    userLoginButton.addEventListener('click', loginUser);
    var adminLoginButton = document.getElementById('adminLoginButton');
    adminLoginButton.addEventListener('click', loginAdmin);
});
function loginUser() {
    return __awaiter(this, void 0, void 0, function () {
        var email, password, role, response, data, token, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = document.querySelector('#loginEmail').value;
                    password = document.querySelector('#loginPassword').value;
                    role = 'user';
                    if (!email || !password) {
                        alert('Please fill in all the fields.');
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch('http://localhost:3000/auth/login/', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                email: email,
                                password: password,
                                role: role,
                            }),
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    if (!response.ok) {
                        if (response.status === 401) {
                            alert('Invalid credentials. Please try again.');
                        }
                        else {
                            throw new Error("HTTP error! Status: ".concat(response.status));
                        }
                    }
                    else {
                        console.log(data);
                        token = data.accepted_token;
                        localStorage.setItem('token', token);
                        console.log('Login successful');
                        window.location.href = 'Home.html';
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error('Error:', error_1.message);
                    alert('An error occurred. Please try again later.');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function loginAdmin() {
    return __awaiter(this, void 0, void 0, function () {
        var email, password, role, response, data, token, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = document.querySelector('#loginEmail').value;
                    password = document.querySelector('#loginPassword').value;
                    role = 'admin';
                    if (!email || !password) {
                        alert('Please fill in all the fields.');
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch('http://localhost:3000/auth/login/', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                email: email,
                                password: password,
                                role: role,
                            }),
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    if (!response.ok) {
                        if (response.status === 401) {
                            alert('Invalid credentials. Please try again.');
                        }
                        else {
                            throw new Error("HTTP error! Status: ".concat(response.status));
                        }
                    }
                    else {
                        console.log(data);
                        token = data.accepted_token;
                        localStorage.setItem('token', token);
                        console.log('Login successful');
                        window.location.href = 'admin-page.html';
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    console.error('Error:', error_2.message);
                    alert('An error occurred. Please try again later.');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function signupUser() {
    return __awaiter(this, void 0, void 0, function () {
        var username, password, email, response, data, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    username = document.querySelector('#Username').value;
                    password = document.querySelector('#Password').value;
                    email = document.querySelector('#Email').value;
                    if (!username || !password || !email) {
                        alert('Fill in all the forms');
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch('http://localhost/3000/auth/signup/', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                "email": email,
                                "password": password,
                                "role": "user",
                            }),
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! Status: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    console.log('Registered successfully');
                    return [3 /*break*/, 5];
                case 4:
                    error_3 = _a.sent();
                    console.error('Error:', error_3.message);
                    return [3 /*break*/, 5];
                case 5:
                    window.location.href = 'index.html';
                    return [2 /*return*/];
            }
        });
    });
}
function signupAdmin() {
    return __awaiter(this, void 0, void 0, function () {
        var username, password, email, response, data, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    username = document.querySelector('#Username').value;
                    password = document.querySelector('#Password').value;
                    email = document.querySelector('#Email').value;
                    if (!username || !password || !email) {
                        alert('Fill in all the forms');
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch('http://localhost/3000/auth/signup/', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                "email": email,
                                "password": password,
                                "role": "admin",
                            }),
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! Status: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    console.log('Registered successfully');
                    return [3 /*break*/, 5];
                case 4:
                    error_4 = _a.sent();
                    console.error('Error:', error_4.message);
                    return [3 /*break*/, 5];
                case 5:
                    window.location.href = 'index.html';
                    return [2 /*return*/];
            }
        });
    });
}
