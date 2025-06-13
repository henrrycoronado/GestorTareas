import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { UserService } from '../services/User/UserService';
import { DashboardPage } from '../pages/DashboardPage';

vi.mock('../services/User/UserService', () => ({
  UserService: {
    GetPerson: vi.fn(),
  }
}));

describe('DashboardPage', () => {
  beforeEach(() => {
    UserService.GetPerson.mockResolvedValue({
      id: 1,
      name: 'Henrry',
      lastname: 'Coronado',
      email: 'henrry@example.com',
    });
  });

  it('muestra saludo con el nombre de usuario', async () => {
    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    );
    const saludo = await screen.findByText(/¡Hi, Henrry!/i);
    expect(saludo).toBeInTheDocument();
  });

  it('los botones de navegación cambian el mes en el input', async () => {
    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    );

    const inputMes = screen.getByDisplayValue(/\d{4}-\d{2}/);
    const valorInicial = inputMes.value;

    const btnPrev = screen.getByText(/previous mounth/i);
    const btnNext = screen.getByText(/next mounth/i);

    fireEvent.click(btnNext);
    expect(inputMes.value).not.toBe(valorInicial);

    fireEvent.click(btnPrev);
    expect(inputMes.value).toBe(valorInicial);
  });
});
