'use client';

import { useState, useEffect } from 'react';
import { ref, onValue, push, set } from 'firebase/database';
import { db, auth } from '@/lib/firebase';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User
} from 'firebase/auth';

export default function FirebaseIntegrationTest() {
    // Realtime Database state
    const [items, setItems] = useState<string[]>([]);
    const [newItem, setNewItem] = useState('');
    const [dbError, setDbError] = useState<string | null>(null);

    // Authentication state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState<User | null>(null);
    const [authError, setAuthError] = useState<string | null>(null);
    const [isLoginMode, setIsLoginMode] = useState(true);

    useEffect(() => {
        // Auth Listener
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        // Database Listener
        try {
            const itemsRef = ref(db, 'items');
            onValue(itemsRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const itemList = Object.values(data) as string[];
                    setItems(itemList);
                } else {
                    setItems([]);
                }
            }, (error) => {
                console.error("Error reading data:", error);
                setDbError(error.message);
            });
        } catch (err: any) {
            setDbError(err.message);
        }

        return () => unsubscribe();
    }, []);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setAuthError(null);
        try {
            if (isLoginMode) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
            setEmail('');
            setPassword('');
        } catch (err: any) {
            setAuthError(err.message);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (err: any) {
            console.error(err);
        }
    };

    const addItem = () => {
        if (newItem.trim() === '') return;
        try {
            const itemsRef = ref(db, 'items');
            const newItemRef = push(itemsRef);
            set(newItemRef, newItem).catch((err) => {
                console.error("Error writing data:", err);
                setDbError(err.message);
            });
            setNewItem('');
        } catch (err: any) {
            setDbError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8 space-y-8">

                <div>
                    <h1 className="text-3xl font-bold text-gray-900 text-center">Firebase Integration</h1>
                    <p className="text-center text-gray-500 mt-2">Test your Auth and Database connection</p>
                </div>

                {/* Authentication Section */}
                <div className="border-b border-gray-200 pb-8">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">1. Authentication</h2>

                    {user ? (
                        <div className="bg-green-50 p-4 rounded-md border border-green-200 flex justify-between items-center">
                            <div>
                                <p className="text-green-800 font-medium">✨ Logged in successfully</p>
                                <p className="text-green-600 text-sm">{user.email}</p>
                            </div>
                            <button
                                onClick={handleSignOut}
                                className="bg-white text-red-500 border border-red-200 hover:bg-red-50 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleAuth} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2 text-black"
                                    placeholder="user@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2 text-black"
                                    placeholder="••••••••"
                                />
                            </div>

                            {authError && (
                                <div className="text-red-500 text-sm bg-red-50 p-2 rounded border border-red-100">
                                    {authError}
                                </div>
                            )}

                            <div className="flex flex-col gap-3">
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    {isLoginMode ? 'Sign In' : 'Create Account'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsLoginMode(!isLoginMode)}
                                    className="text-sm text-indigo-600 hover:text-indigo-500 text-center"
                                >
                                    {isLoginMode ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                {/* Realtime Database Section */}
                <div>
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">2. Realtime Database</h2>

                    {dbError && (
                        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                            <div className="flex">
                                <div className="ml-3">
                                    <p className="text-sm text-red-700">
                                        {dbError}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex gap-2 mb-6">
                        <input
                            type="text"
                            value={newItem}
                            onChange={(e) => setNewItem(e.target.value)}
                            placeholder="Add an item to the list..."
                            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2 text-black"
                        />
                        <button
                            onClick={addItem}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Add
                        </button>
                    </div>

                    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 min-h-[100px]">
                        <h3 className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wider">Live Data</h3>
                        <ul className="space-y-2">
                            {items.map((item, index) => (
                                <li key={index} className="bg-white p-3 rounded shadow-sm text-gray-700 flex items-center">
                                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                                    {item}
                                </li>
                            ))}
                            {items.length === 0 && (
                                <li className="text-gray-400 text-sm italic py-2 text-center">List is empty. Add something above!</li>
                            )}
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
}
