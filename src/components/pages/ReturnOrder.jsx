import Input from "../ui/FormControls/Input";
import { Button } from "../ui";
import { NavLink } from "react-router-dom";


const ReturnOrder = ()=>{
    return (
        <div>
            <h1 className="uppercase font-bold text-2xl my-6">Return Your Order</h1>
            <p className="uppercase">PLEASE ENTER THE FOLLOWING INFORMATION IF YOU HAVE PLACED AN ORDER AS GUEST TO INITIATE A RETURN. IF YOU ARE ALREADY A REGISTERED CLIENT, <NavLink className={'underline'} to={'/login'}>PLEASE SIGN IN TO YOUR ACCOUNT</NavLink>.</p>

            <form action="" className="my-4">
                <div>
                    <Input type={'email'} id={'email'} name={'email'} label={'Email Address'} />
                </div>

                <div className="my-6">
                    <Input type={'text'} id={'order_number'} name={'order_number'} label={'Order Number'} />
                </div>

                <Button dark type='submit'>Continue</Button>
            </form>
        </div>
    )
}


export default ReturnOrder;