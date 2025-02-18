import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAddresses, setAreAddressesLoading } from "../../store";
import AddressForm from "./AddressForm";
import AddressCard from "./AddressCard";
import { getAddressesAPI } from "../../apis/addressAPI";
import { Skeleton } from "@mui/material";

export default function AddressesSection() {
  const { addresses: userAddresses, defaultAddressId, areAddressesLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [addressFormOpen, setAddressFormOpen] = useState(false);

  const openAddressForm = () => setAddressFormOpen(true);
  const closeAddressForm = () => setAddressFormOpen(false);

  return (
    <>{areAddressesLoading? <Skeleton
      variant="rectangular"
      className="w-full h-auto p-12 dark:bg-white"
    /> : <>
      <div className="flex justify-between my-2">
        <h2 className="font-bold text-xl">Address</h2>
        <button
          onClick={openAddressForm}
          className="active:bg-gray-100 border-2 px-2 py-1"
        >
          Add New Aadress 
        </button>
        {addressFormOpen && <AddressForm closeForm={closeAddressForm} />}
      </div>

      <div className=" flex flex-wrap box-border justify-between gap-2">
        
        {userAddresses.map((address) => (
          
          <AddressCard
            key={address?._id}
            fullName={address?.firstName+" "+address?.lastName}
            addressLine={address?.address1+", "+address?.address2}
            phone={address?.phone}
            addressId={address?._id}
            fullAddressObject = {address}
          />
        ))}
        
      </div>
      </>
      }
    </>
  );
}
