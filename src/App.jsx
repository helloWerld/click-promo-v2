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
import Loading from './components/Loading';

const AppRoutes = () => {
	const { currentUser } = useAuthContext();
	return (
		<Suspense fallback={<Loading />}>
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
				{currentUser && (
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
		</Suspense>
	);
};

function App() {
	const { getCreatorsPublicData } = useFirestoreContext();
	const { authenticate } = useAuthContext();

	useEffect(() => {
		authenticate();
		getCreatorsPublicData();
	}, []);

	return (
		<BrowserRouter>
			<AppRoutes />
		</BrowserRouter>
	);
}

export default App;
