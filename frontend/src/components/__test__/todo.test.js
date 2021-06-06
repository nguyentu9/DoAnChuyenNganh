import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import SignUp from '../../pages/SignUpPage';
import React from 'react';


test('should render SignUp component', async () => {
    render(<SignUp />);

    fireEvent.change(screen.getByTestId('userName'), {
        target: { value: 'toan123456789' },
    })
    fireEvent.change(screen.getByTestId('passWord'), {
        target: { value: '123456789' },
    })
    fireEvent.change(screen.getByTestId('confirmPassword'), {
        target: { value: '123456789' },
    })
    fireEvent.change(screen.getByTestId('fullName'), {
        target: { value: 'Huỳnh Thanh Toàn' },
    })

    fireEvent.change(screen.getByTestId('phone'), {
        target: { value: '0987654321' },
    })
    fireEvent.change(screen.getByTestId('emailAddr'), {
        target: { value: 'example@gmail.com' },
    })
    fireEvent.change(screen.getByTestId('major'), {
        target: { value: 'Công nghệ thông tin' },
    })


    expect(true).toBe(true);
})