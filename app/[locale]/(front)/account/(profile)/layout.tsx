import AccountSidebar from '@/components/account/AccountSidebar'
import React from 'react'

const AccountLayout = ({children}: { children: React.ReactNode }) => {
  return (
    <section className="mt-10">
      <div className="container">
        <div className="flex items-start gap-10">
          <div className="w-3/12">
            <AccountSidebar />
          </div>
          <div className="w-9/12 bg-white drop-shadow-md rounded-lg px-10 py-5">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AccountLayout