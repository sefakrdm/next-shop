import AccountFavoritesClient from '@/components/account/AccountFavoritesClient';
import { auth } from '@/lib/auth';
import favoriteService from '@/lib/service/favoriteService';
import React, { Suspense } from 'react';

const FavoritesPage = async () => {

  const session = await auth();

  const favorites = await favoriteService.getByUserId(session?.user.id || '');

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AccountFavoritesClient favorites={favorites || []} />
    </Suspense>
  )
}

export default FavoritesPage