import {Check2Circle} from 'react-bootstrap-icons'
import { Button } from '../ui'
import { NavLink } from 'react-router-dom'

const PaymentStatus = () => {
    return (
        <div className="w-full py-10">
            <div className='text-center w-[300px] m-auto'>
                <Check2Circle className='text-8xl text-green-500 m-auto' />
                <h3 className='text-2xl'>Payment Successfull!</h3>
                <NavLink to='/shop'><Button dark buttonClass={"mt-10"}>Continue Shopping</Button></NavLink>
            </div>
        </div>
    )
}

export default PaymentStatus