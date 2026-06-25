import React from 'react'
import NewLegalProfileFormPageClient from './NewLegalProfileFormPageClient'
import { getUserSession } from '@/lib/core/core';


const NewLegalProfile = async () => {
  const user = await getUserSession();
const planStatus = (user as any)?.plan || "free";    
  return (
    <div>
      <NewLegalProfileFormPageClient
        plan={planStatus}
      />
    </div>
  );
}

export default NewLegalProfile
