import { createStore } from 'redux';
import rootReducer from './rootReducer';

export default function configureStore(preloadedState) {
	return createStore(rootReducer);
}