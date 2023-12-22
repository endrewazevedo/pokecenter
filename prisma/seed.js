"use strict";
// seed.ts
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
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function criarCliente(nome, telefone, cpf, quantidade) {
    return __awaiter(this, void 0, void 0, function () {
        var cliente;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.cliente.create({
                        data: {
                            nome: nome,
                            telefone: telefone,
                            cpf: cpf,
                            saldo: {
                                create: {
                                    quantidade: quantidade,
                                },
                            },
                        },
                    })];
                case 1:
                    cliente = _a.sent();
                    console.log('Cliente criado:', cliente);
                    return [2 /*return*/, cliente];
            }
        });
    });
}
function criarTransacao(cliente, quantidade, tipo, saldoAntes, saldoDepois) {
    return __awaiter(this, void 0, void 0, function () {
        var transacao;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.transacao.create({
                        data: {
                            quantidade: quantidade,
                            tipo: tipo,
                            clienteId: cliente.id,
                            saldoAntes: saldoAntes,
                            saldoDepois: saldoDepois,
                        },
                    })];
                case 1:
                    transacao = _a.sent();
                    console.log('Transação criada:', transacao);
                    // Atualizar o saldo do cliente após a transação
                    return [4 /*yield*/, prisma.cliente.update({
                            where: { id: cliente.id },
                            data: {
                                saldo: {
                                    update: {
                                        quantidade: saldoDepois,
                                    },
                                },
                            },
                        })];
                case 2:
                    // Atualizar o saldo do cliente após a transação
                    _a.sent();
                    // Criar registro em SaldoHistorico
                    return [4 /*yield*/, prisma.saldoHistorico.create({
                            data: {
                                quantidade: saldoDepois,
                                cliente: {
                                    connect: {
                                        id: cliente.id,
                                    },
                                },
                                transacao: {
                                    connect: {
                                        id: transacao.id,
                                    },
                                },
                            },
                        })];
                case 3:
                    // Criar registro em SaldoHistorico
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var cliente1, cliente2, cliente3, transacoesCliente2, transacaoCliente3, _i, transacoesCliente2_1, transacao, _a, transacaoCliente3_1, transacao;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, criarCliente('Maycon', '11111111', '11345678901', 1000)];
                case 1:
                    cliente1 = _b.sent();
                    return [4 /*yield*/, criarCliente('Jorge', '222222222', '21456789012', 1500)];
                case 2:
                    cliente2 = _b.sent();
                    return [4 /*yield*/, criarCliente('Vitor', '333333333', '31567890123', 2000)];
                case 3:
                    cliente3 = _b.sent();
                    transacoesCliente2 = [
                        {
                            quantidade: 300,
                            tipo: 'DEBITO',
                            saldoAntes: 1500,
                            saldoDepois: 1200,
                        },
                        {
                            quantidade: 200,
                            tipo: 'CREDITO',
                            saldoAntes: 1200,
                            saldoDepois: 1400,
                        },
                        {
                            quantidade: 100,
                            tipo: 'DEBITO',
                            saldoAntes: 1400,
                            saldoDepois: 1300,
                        },
                    ];
                    transacaoCliente3 = [
                        {
                            quantidade: 500,
                            tipo: 'CREDITO',
                            saldoAntes: 0, // Ajuste o saldoAntes conforme necessário
                            saldoDepois: 500,
                        },
                    ];
                    _i = 0, transacoesCliente2_1 = transacoesCliente2;
                    _b.label = 4;
                case 4:
                    if (!(_i < transacoesCliente2_1.length)) return [3 /*break*/, 7];
                    transacao = transacoesCliente2_1[_i];
                    return [4 /*yield*/, criarTransacao(cliente2, transacao.quantidade, transacao.tipo, transacao.saldoAntes, transacao.saldoDepois)];
                case 5:
                    _b.sent();
                    _b.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 4];
                case 7:
                    _a = 0, transacaoCliente3_1 = transacaoCliente3;
                    _b.label = 8;
                case 8:
                    if (!(_a < transacaoCliente3_1.length)) return [3 /*break*/, 11];
                    transacao = transacaoCliente3_1[_a];
                    return [4 /*yield*/, criarTransacao(cliente3, transacao.quantidade, transacao.tipo, transacao.saldoAntes, transacao.saldoDepois)];
                case 9:
                    _b.sent();
                    _b.label = 10;
                case 10:
                    _a++;
                    return [3 /*break*/, 8];
                case 11: return [2 /*return*/];
            }
        });
    });
}
main()
    .then(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })
    .catch(function (e) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.error(e);
                return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                process.exit(1);
                return [2 /*return*/];
        }
    });
}); });
