import React, { useEffect, useState } from 'react'

const AccountDetails = () => {
  const [data, setData] = useState(null);

  const fetchAccountDetails = async () => {
    try{
      const response = await fetch(import.meta.env.VITE_API_URL + '/account', {
        method: 'GET',
        credentials: 'include',
      })
      const data = await response.json()

      if(response.status == 200){
        setData(data.data)
      }

    }catch(err){
      console.log(err)
    }
  }
  
  useEffect(()=>{
    fetchAccountDetails();

  }, [])

  return (
    <div className='flex flex-row gap-10'>
      <div className='flex flex-col gap-6'>
        <div>
          <h1 className='text-base font-bold uppercase mb-2'>Name</h1>
          <p>{`${data?.user.firstName} ${data?.user.lastname? data.user.lastname : ''}`}</p>
        </div>
        <div>
          <h1 className='text-base font-bold uppercase mb-2'>Email</h1>
          <p>{data?.user.email}</p>
        </div>
      </div>
      <div className='flex flex-col gap-6'>
        <div>
          <h1 className='text-base font-bold uppercase mb-2'>Gender</h1>
          <p>{data?.user.gender ? data.user.gender : '---'}</p>
        </div>
        <div>
          <h1 className='text-base font-bold uppercase mb-2'>Date of Birth</h1>
          <p>{data?.user.dob ? data.user.dob : '---'}</p>
        </div>
      </div>
    </div>
  )
}

export default AccountDetails;