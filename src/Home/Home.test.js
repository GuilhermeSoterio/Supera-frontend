import { render, screen } from '@testing-library/react';
import Home from './index';

// Mockando a implementação da service
jest.mock('../services/TransactionService');

test('renders Home component', () => {
  render(<Home />);
  
  // Verifica se os elementos de input estão presentes
  expect(screen.getByText('Data de Início')).toBeInTheDocument();
  expect(screen.getByText('Data de Fim')).toBeInTheDocument();

  // Verifica se o botão de pesquisa está presente
  expect(screen.getByRole('button', { name: 'Pesquisar' })).toBeInTheDocument();

  // Verifica se o cabeçalho da tabela está presente
  expect(screen.getByText('Dados')).toBeInTheDocument();
  expect(screen.getByText('Valentia')).toBeInTheDocument();
  expect(screen.getByText('Tipo')).toBeInTheDocument();
  expect(screen.queryAllByText(/Nome operador transacionado/)).toHaveLength(2);
});
