import { Button } from "@/components/ui";
import Input from "@/components/ui/FormControls/Input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const ChangePassword = () => {
    const [errorMessage, setErrorMessage] = useState({
        currentPassword: '',
        newPassword: '',
    });

    const navigate = useNavigate();

    const changePasswordRequest = async (formData)=>{
        const response = await fetch(import.meta.env.VITE_API_URL + '/change-password', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formData))
        })

        const result = await response.json();
        console.log(result)
        if(response.status == 200){
            toast.success(result.message);
            navigate('/account/account-details');
            return;
        }else if(response.status == 400){
            setErrorMessage(result.data);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        console.log(formData.get('currentPassword'))
        changePasswordRequest(formData);
    }

    return (
        <div>
            <form className="w-1/2" onSubmit={handleSubmit}>
                <div>
                    <Input label={'Old Password'} name={'currentPassword'} id={'currentPassword'} invalid={errorMessage.currentPassword != ''} invalidMessage={errorMessage.currentPassword} />
                </div>
                <div className="mt-4">
                    <Input label={'New Password'} name={'newPassword'} id={'newPassword'} invalid={errorMessage.newPassword != ''} invalidMessage={errorMessage.newPassword} />
                </div>
                <Button buttonClass={'mt-6'} type="submit">Change</Button>
            </form>
        </div>
    )
}

export default ChangePassword;