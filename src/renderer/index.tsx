import { createRoot } from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from './App';
import SelectedItemReducer from '../redux/CarouselSelectedItemSlice';
import DataArrayReducer from '../redux/DataArray';

const store = configureStore({
  reducer: {
    selectedItem: SelectedItemReducer,
    dataArray: DataArrayReducer,
  },
});

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

window.electron.ipcRenderer.once('ipc-example', (arg) => {
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
