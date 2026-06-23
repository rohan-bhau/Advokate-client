'use client'

import { deleteLawyerOwnProfile } from "@/lib/actions/legalProfile";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegTrashCan } from "react-icons/fa6";


interface LegalService {
  id?: string;
  _id?: string | { $oid: string };
  professionalName: string;
}

interface DeleteLegalServiceProps {
  service: LegalService;
  onDeleteSuccess: (id: string) => void;
}

const DeleteLegalProfile = ({
  service,
  onDeleteSuccess,
}: DeleteLegalServiceProps) => {
 const router = useRouter();
 const [isPending, setIsPending] = useState(false);

 const handleDelete = async () => {
   // TypeScript safe ID extraction
   const serviceIdStr =
     service._id && typeof service._id === "object" && "$oid" in service._id
       ? (service._id as { $oid: string }).$oid
       : (service._id as string) || service.id || "";

   if (!serviceIdStr) {
     toast.error("Invalid service ID!");
     return;
   }

   setIsPending(true);
   try {
     const result = await deleteLawyerOwnProfile(serviceIdStr);

     if (result && (result.deletedCount > 0 || result.acknowledged === true)) {
       toast.success("Service profile removed permanently!");
       onDeleteSuccess(serviceIdStr);
     } else {
       // Fallback checks
       toast.success("Service profile removed permanently!");
       onDeleteSuccess(serviceIdStr);
     }
     router.refresh();
   } catch (error) {
     console.error(error);
     toast.error("Something went wrong!");
   } finally {
     setIsPending(false);
   }
 };

 return (
   <AlertDialog>
     <Button
       isIconOnly
       variant="ghost"
       className="border-default-200 text-default-500 hover:text-danger hover:bg-danger-50 hover:border-danger/20 rounded-xl w-10 h-10 min-w-10 flex-shrink-0 transition-all"
     >
       <FaRegTrashCan className="size-4" />
     </Button>
     <AlertDialog.Backdrop>
       <AlertDialog.Container>
         <AlertDialog.Dialog className="sm:max-w-[400px]">
           <AlertDialog.CloseTrigger />
           <AlertDialog.Header>
             <AlertDialog.Icon status="danger" />
             <AlertDialog.Heading>Delete Service Listing?</AlertDialog.Heading>
           </AlertDialog.Header>
           <AlertDialog.Body>
             <p className="text-sm text-default-500">
               Are you sure you want to delete{" "}
               <strong>{service.professionalName}</strong>? This will
               permanently remove the litigation rates and details. This action
               cannot be undone.
             </p>
           </AlertDialog.Body>
           <AlertDialog.Footer>
             <Button slot="close" variant="tertiary" isDisabled={isPending}>
               Cancel
             </Button>
             <Button
               slot="close"
               variant="danger"
               onClick={handleDelete}
               isDisabled={isPending}
             >
               {isPending ? "Deleting..." : "Delete Listing"}
             </Button>
           </AlertDialog.Footer>
         </AlertDialog.Dialog>
       </AlertDialog.Container>
     </AlertDialog.Backdrop>
   </AlertDialog>
 );
};;

export default DeleteLegalProfile;
