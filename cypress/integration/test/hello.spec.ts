/// <reference types="cypress" />

describe('hello world test', () => {

  it('should be hello world', () => {
   
    const greeting = 'hello world!';
    expect(greeting).to.equal('hello world!');

  });
});
