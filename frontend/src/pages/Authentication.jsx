import { useState } from 'react';

function Login({ onSwitchToSignup }) {
    return (
        <div className="w-full max-w-md">
            <form className="bg-white shadow-md rounded-lg px-8 pt-8 pb-8 mb-4 border border-gray-100">
                <div className="mb-6">
                    <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input className="p-3 w-full border border-[#FDB37A] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FDB37A] bg-[#FDF5F1] text-gray-700" id="email" type="email" placeholder="Enter your email" />
                </div>
                <div className="mb-8">
                    <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input className="p-3 w-full border border-[#FDB37A] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FDB37A] bg-[#FDF5F1] text-gray-700" id="password" type="password" placeholder="Enter your password" />
                </div>
                <div className="flex flex-col items-center">
                    <button className="bg-[#FDD0C5] hover:bg-[#e3bdb3] transition-all text-gray-800 font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FDB37A] w-full" type="button">
                        Sign In
                    </button>
                    <p className="text-gray-600 text-sm mt-4">
                        Don't have an account? <span onClick={onSwitchToSignup} className="text-[#FDB37A] hover:underline cursor-pointer font-semibold">Sign up</span>
                    </p>
                </div>
            </form>
        </div>
    );
}

function CreateAccount({ onSwitchToLogin }) {
    return (
        <div className="w-full max-w-md">
            <form className="bg-white shadow-md rounded-lg px-8 pt-8 pb-8 mb-4 border border-gray-100">
                <div className="mb-6">
                    <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="firstName">
                        Full name
                    </label>
                    <input className="p-3 w-full border border-[#FDB37A] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FDB37A] bg-[#FDF5F1] text-gray-700" id="firstName" type="text" placeholder="Enter your first name" />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="newEmail">
                        Email
                    </label>
                    <input className="p-3 w-full border border-[#FDB37A] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FDB37A] bg-[#FDF5F1] text-gray-700" id="newEmail" type="email" placeholder="Enter your email" />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="newPassword">
                        Password
                    </label>
                    <input className="p-3 w-full border border-[#FDB37A] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FDB37A] bg-[#FDF5F1] text-gray-700" id="newPassword" type="password" placeholder="Enter your password" />
                </div>
                <div className="flex flex-col items-center">
                    <button className="bg-[#FDD0C5] hover:bg-[#e3bdb3] transition-all text-gray-800 font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FDB37A] w-full" type="button">
                        Create Account
                    </button>
                    <p className="text-gray-600 text-sm mt-4">
                        Already have an account? <span onClick={onSwitchToLogin} className="text-[#FDB37A] hover:underline cursor-pointer font-semibold">Sign in</span>
                    </p>
                </div>
            </form>
        </div>
    );
}

function Authentication() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="flex flex-col items-center min-h-screen max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex w-full bg-[#FEFCF9] mt-16 mb-12 justify-center">
                <h1 className="text-6xl font-semibold text-gray-800">
                    {isLogin ? 'Login' : 'Create Account'}
                </h1>
            </div>

            {isLogin ? (
                <Login onSwitchToSignup={() => setIsLogin(false)} />
            ) : (
                <CreateAccount onSwitchToLogin={() => setIsLogin(true)} />
            )}
        </div>
    );
}

export default Authentication;