import Input from "../ui/FormControls/Input";
import { Button } from "../ui";


const Contact = ()=>{
    return (
        <div>
            <h1 className="uppercase font-bold text-2xl my-6">Contact</h1>
            <h3 className="uppercase font-bold text-xl">Send us a message</h3>
            <p className="uppercase">NEED SOME HELP? IF OUR FAQS PAGE HASN'T ALREADY ANSWERED YOUR QUESTION, SEND US A MESSAGE AND WE WILL RESPOND AS SOON AS POSSIBLE. IF YOUR QUERY RELATES TO A SPECIFIC ORDER OR PRODUCT, PLEASE INCLUDE YOUR ORDER NUMBER OR PRODUCT DETAILS.</p>

            <form action="" className="my-4">
                <div className="columns-2">
                    <div><Input type={'text'} id={'full_name'} name={'full_name'} label={'Full Name'} /></div>
                    <div><Input type={'email'} id={'email'} name={'email'} label={'Email Address'} /></div>
                </div>

                <div className="my-6 flex flex-col w-full">
                    <label htmlFor={'inquery_reson'} className="my-2">Inquery Reason</label>
                    <select className="py-2 px-2 bg-bgGray outline-none w-full" id="inquery_reson" name="inquery_reson">
                        <option value={'product-information'}>Product information</option>
                        <option value="shipping">Shipping</option>
                        <option value="returns">Returns</option>
                        <option value="suggestions">Suggestions</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="my-6 flex flex-col w-full">
                    <label htmlFor="message" className="my-2">Message</label>
                    <textarea name="message" id="message" cols="30" rows="5" className="bg-bgGray outline-none p-2"></textarea>
                </div>

                <Button dark>Send</Button>
            </form>
        </div>
    )
}


export default Contact;