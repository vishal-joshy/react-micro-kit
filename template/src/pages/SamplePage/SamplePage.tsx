import React from 'react';

import useCats from './api/getCats';
import CatImageFrame from './components/CatImageFrame';

export default function SamplePage() {
  const cats = useCats();

  if (cats.isLoading) {
    return <div>Loading</div>;
  }
  if (cats.isError) {
    return <div>{cats.error.message}</div>;
  }
  if (cats.data?.length === 0) {
    return <div>Meow</div>;
  }
  if (cats.data) {
    return (
      <>
        {cats.data?.map((v) => (
          <React.Fragment key={v.id}>
            <CatImageFrame cat={v} />
          </React.Fragment>
        ))}
      </>
    );
  }
}
