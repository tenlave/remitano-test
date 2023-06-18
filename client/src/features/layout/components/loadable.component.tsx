import { FunctionComponent, Suspense } from 'react';

const Loadable = (Component: FunctionComponent) => (props: object) => {

    return (
      <Suspense fallback={<div>Loading</div>}>
        <Component {...props} />
      </Suspense>
    )
  }
;
export default Loadable;
