import AccountSidebar from '@/components/account/AccountSidebar';
import React from 'react';

const FavoritesPage = () => {
  return (
    <section>
    <div className="container">
      <div className="flex items-center gap-10">
        <div className="w-3/12">
          <AccountSidebar />
        </div>
        <div className="w-9/12">
          Favorilerim
        </div>
      </div>
    </div>
  </section>
  )
}

export default FavoritesPage