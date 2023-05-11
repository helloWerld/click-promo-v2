import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import FirestoreProvider from './context/FirestoreContext';
import AuthProvider from './context/AuthContext';
import MenuProvider from './context/MenuContext';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AuthProvider>
			<FirestoreProvider>
				<MenuProvider>
					<App />
				</MenuProvider>
			</FirestoreProvider>
		</AuthProvider>
	</React.StrictMode>
);
