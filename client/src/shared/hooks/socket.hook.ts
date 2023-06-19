import { useContext } from 'react';
import { SocketContext } from '../contexts';

export default function useSocketContext() {
  return useContext(SocketContext);
}
