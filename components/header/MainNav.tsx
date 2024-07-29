import React from 'react';
import categoryService from '@/lib/service/categoryService';
import MainMenu from './MainMenu';

const MainNav = async () => {

    const categories = await categoryService.getLatest(10);

    // const slicedCategories = categories.slice(0, 10);

  return (
    <section className="shadow">
      <div className="container">
        <MainMenu categories={categories && categories.length > 0 ? categories : []} />
      </div>
    </section>
  );
}

export default MainNav