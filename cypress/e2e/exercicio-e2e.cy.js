/// <reference types="cypress" />

import produtosPage from '../support/page_objects/produto.page';

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  /*  Como cliente 
      Quero acessar a Loja EBAC 
      Para fazer um pedido de 4 produtos 
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final */

  beforeEach(() => {
    produtosPage.visitarUrl()
  });

  it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
    cy.fixture('produtos').then((dados) => {
      produtosPage.buscarProduto(dados[0].nomeProduto)
      produtosPage.addProduto(
        dados[0].tamanho,
        dados[0].cor,
        dados[0].quantidade)
      cy.get('.woocommerce-message').should('contain', dados[0].nomeProduto)
    })
    cy.fixture('produtos').then((dados) => {
      produtosPage.buscarProduto(dados[1].nomeProduto)
      produtosPage.addProduto(
        dados[1].tamanho,
        dados[1].cor,
        dados[1].quantidade)
      cy.get('.woocommerce-message').should('contain', dados[1].nomeProduto)
    })
    cy.fixture('produtos').then((dados) => {
      produtosPage.buscarProduto(dados[2].nomeProduto)
      produtosPage.addProduto(
        dados[2].tamanho,
        dados[2].cor,
        dados[2].quantidade)
      cy.get('.woocommerce-message').should('contain', dados[2].nomeProduto)
    })
    cy.fixture('produtos').then((dados) => {
      produtosPage.buscarProduto(dados[3].nomeProduto)
      produtosPage.addProduto(
        dados[3].tamanho,
        dados[3].cor,
        dados[3].quantidade)
      cy.get('.woocommerce-message').should('contain', dados[3].nomeProduto)
    })

    cy.get('.woocommerce-message > .button').click()
    cy.get('.checkout-button').click()
    cy.get('#billing_first_name').type('Bruno')
    cy.get('#billing_last_name').type('Teste')
    cy.get('#billing_company').type('EBAC')
    cy.get('#billing_address_1').type('Rua dos Testes, 1')
    cy.get('#billing_address_2').type('Apto 1')
    cy.get('#billing_city').type('São Paulo')
    cy.get('#billing_postcode').type('00000-000')
    cy.get('#billing_phone').type('11999999999')
    cy.get('#billing_email').type('bruno.teste@teste.com.br')
    cy.get('.woocommerce-terms-and-conditions-checkbox-text').click()
    cy.get('#place_order').click()
    cy.get('.page-title').should('contain', 'PEDIDO RECEBIDO')

  });


})