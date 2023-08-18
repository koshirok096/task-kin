import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const Home = () => {
  const user = useSelector(state => state.user);
  const token = useSelector(state => state.token);

  return (
    <div>Home</div>
  )
}

export default Home