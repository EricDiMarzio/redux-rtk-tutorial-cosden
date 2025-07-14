import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { decrement, increment, incrementByAmount} from '../state/reducers/counterSlice';

export default function Counter() {
  //  useSelector is for reading state from the store
  const count = useSelector((state: RootState) => state.counter.value);
  //  We assign useDispatch to a variable 'dispatch' so we can gain access to actions
  const dispatch = useDispatch();
  
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  //alternatively you could use useRef
  const formData = new FormData(e.currentTarget);
  const newCount = Number(formData.get('newCount'));
  dispatch(incrementByAmount(newCount))
  
}

  return <div>
    <h2>{count}</h2>
    <div>
      <button onClick = {() => dispatch(increment())}>inc</button>
      <button onClick = {() => dispatch(decrement())}>dec</button>
    </div>
    <form onSubmit={handleSubmit}>
      <input name="newCount" placeholder='0' title="This is where a tooltip shows up" type='number' min="1" max="10" />
      <button type='submit'>Submit</button>
    </form>
  </div>;
}
