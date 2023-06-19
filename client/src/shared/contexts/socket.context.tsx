import { createContext, PropsWithChildren, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import { ManagerOptions } from 'socket.io-client/build/esm/manager';
import { SocketOptions } from 'socket.io-client/build/esm/socket';

export interface SocketContextProps {
  socket: Socket | null;
}
export const SocketContext = createContext<SocketContextProps>({
  socket: null,
});

const opts: Partial<ManagerOptions & SocketOptions> = {
  reconnectionDelay: 5000,
  autoConnect: true,
  withCredentials: false,
  reconnection: true,
};
export const SocketProvider = (props: PropsWithChildren) => {
  const socket = io(
    process.env.REACT_APP_BASE_URL ?? 'http://localhost:3001',
    opts,
  );

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {props.children}
    </SocketContext.Provider>
  );
};
