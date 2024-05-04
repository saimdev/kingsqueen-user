import {useRouteError } from 'react-router-dom'
import NotFound from './NotFound';
import SomethingWrong from './SomethingWrong';

const Error = () => {

    const error = useRouteError();
    console.log(error)

  return error.status === 404 ? <NotFound /> : <SomethingWrong />
}

export default Error