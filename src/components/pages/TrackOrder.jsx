import Input from "../ui/FormControls/Input";
import { Button } from "../ui";


const TrackOrder = ()=>{
    return (
        <div>
            <h1 className="uppercase font-bold text-2xl my-6">Track Your Order</h1>
            <p className="uppercase">TO TRACK YOUR ONLINE ORDER, PLEASE ENTER THE FOLLOWING DETAILS. YOU CAN TRACK YOUR REGULAR OR GUEST ORDER.</p>

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


export default TrackOrder;