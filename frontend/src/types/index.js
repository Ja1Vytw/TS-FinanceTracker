// Como estamos usando JS vanilla, vou usar JSDoc para tipagem

/**
 * @typedef {Object} Usuario
 * @property {string} id
 * @property {string} nome
 * @property {string} email
 */

/**
 * @typedef {Object} Categoria
 * @property {number} id
 * @property {string} nome
 * @property {'RECEITA' | 'DESPESA'} tipo
 * @property {string} icone
 */

/**
 * @typedef {Object} Transacao
 * @property {number} id
 * @property {string} descricao
 * @property {number} valor
 * @property {'RECEITA' | 'DESPESA'} tipo
 * @property {string} categoria
 * @property {string} data
 */

/**
 * @typedef {Object} ResumoFinanceiro
 * @property {number} saldo
 * @property {number} receitas
 * @property {number} despesas
 */

export {}
