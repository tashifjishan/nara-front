import PersonalInfoCard from './PersonalInfoCard'
import { useSelector, useDispatch } from 'react-redux'
import { setAddresses, setUser } from '../../store'
import { useEffect } from 'react'
import getAccountDetailsAPI from '../../apis/getAccoutDetailsAPI'
import {
  setAuthStatus,
  setDefaultAddressId,
  setDefaultAddress
} from '../../store'
import { useNavigate } from 'react-router-dom'
export default function PersonalInfoSection() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userId = useSelector(state => state.user.userId)
  const fullName = useSelector(state => state.user.fullName)
  const email = useSelector(state => state.user.email)
  const phone = useSelector(state => state.user.phone)

  const fetchAccountDetails = async () => {
    try {
      let response = await fetch(import.meta.env.VITE_BACKEND_HOST + '/user', {
        credentials: "include"
      });
      
      // Handle the response
      // if (!response.ok) {
      //   const data = await response.json();
      //   console.log(data);
      // } else {
      //   console.log('Request failed with status:', response.status);
      // }
      
      if (!response.ok) {
        response = await response.json()
        throw new Error(response.message)
      }

      let customer = await response.json()
      customer = customer.message;
      console.log(customer)

      const customerName = customer.name
      const customerEmail = customer.email
      const customerPhone = customer.phone
      dispatch(
        setUser({
          id: customer.id,
          fullName: customerName,
          email: customerEmail,
          phone: customerPhone
        })
      )
      if(customer.addresses.length===0) return
      console.log(customer.addresses)
      const defaultAddress = customer.addresses.find(el=>el.isDefault===true)
      const addresses = customer.addresses;
      const filteredAddresses = addresses.filter((el) => el._id !== defaultAddress._id);
      const sortedAddresses = defaultAddress ? [defaultAddress, ...filteredAddresses] : filteredAddresses;
      dispatch(setAddresses(sortedAddresses));

      dispatch(setDefaultAddressId(defaultAddress._id))
      dispatch(setDefaultAddress(defaultAddress))
    } catch (error) {
      console.error('could not fetch account details: ' + error.message)
      // localStorage.removeItem("accessToken");
      // dispatch(setAuthStatus({accessToken: null, isAuthenticated: false}));
      navigate('/login')
    }
  }



  useEffect(() => {
    fetchAccountDetails()

  }, [])

  return (
    <div className=' mx-auto'>
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-12 xl:border-b-2 border-gray-300 my-4 pb-6 pt-2'>
        <PersonalInfoCard
          title='Your Name'
          value={fullName || 'N/A'}
          type='name'
        />
        <PersonalInfoCard
          title='Email Address'
          value={email || 'N/A'}
          type='email'
        />
      </div>
      <div className='grid grid-cols-1 xl:grid-cols-2  gap-12 xl:border-b-2 border-gray-300 my-4 pb-6 pt-2'>
        <PersonalInfoCard
          title='Phone Number'
          value={phone || 'N/A'}
          type='phone'
        />
        <PersonalInfoCard title='Password' value='********' type='password' />
      </div>
    </div>
  )
}
