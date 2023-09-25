import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import OrderForm from './OrderForm';
import { getToken } from '../../api';

jest.mock('../../api', () => ({
  getToken: jest.fn(),
}));

describe('OrderForm', () => {
  beforeEach(() => {
    getToken.mockReturnValue('fake-token');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form correctly', () => {
    const { getByText } = render(<OrderForm />);
    expect(getByText('Submit Order')).toBeInTheDocument();
  });

  it('submits the form with the correct data', async () => {
    const fetchMock = jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );

    const { getByText, getByLabelText } = render(<OrderForm />);

    fireEvent.change(getByLabelText('Orderer Name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(getByLabelText('Orderer Email'), {
      target: { value: 'john.doe@example.com' },
    });
    // Add more input changes for all form fields

    fireEvent.click(getByText('Submit Order'));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith('http://localhost:3005/api/order/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token fake-token',
        },
        body: JSON.stringify({
          orderer: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            // Add more expected data for all form fields
          },
        }),
      });
    });

    fetchMock.mockRestore();
  });

  it('handles form submission errors', async () => {
    const fetchMock = jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      })
    );

    const { getByText } = render(<OrderForm />);

    fireEvent.click(getByText('Submit Order'));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
    });

    // Add any additional error handling assertions, e.g. displaying an error message

    fetchMock.mockRestore();
  });
});




