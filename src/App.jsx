import React, { useEffect, Suspense } from 'react';
import './App.css';
import Navbar from './components/Menus/Navbar';
import {
	HomePage,
	CreatorDetailPage,
	ReservationPage,
	DashboardPage,
	NotFoundPage,
} from './pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useFirestoreContext } from './context/FirestoreContext';
import { useAuthContext } from './context/AuthContext';

const AppRoutes = () => {
	const { userData, currentUser } = useAuthContext();
	return (
		<Routes>
			<Route
				path="*"
				element={
					<>
						<Navbar />
						<NotFoundPage />
					</>
				}
			/>
			<Route
				path="/"
				element={
					<>
						<Navbar />
						<HomePage />
					</>
				}
			/>
			{currentUser && userData?.role != '_advertiser' && (
				<Route
					path="/creators/:protectedId"
					element={
						<>
							<Navbar />
							<CreatorDetailPage />
						</>
					}
				/>
			)}
			<Route path="/reservation" element={<ReservationPage />} />
			{currentUser && <Route path="/dashboard" element={<DashboardPage />} />}
		</Routes>
	);
};

function App() {
	const { getCreators } = useFirestoreContext();
	const { authenticate } = useAuthContext();

	useEffect(() => {
		authenticate();
		getCreators();
	}, []);

	return (
		<BrowserRouter>
			<AppRoutes />
		</BrowserRouter>
	);
}

export default App;
