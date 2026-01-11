import React, { useState } from 'react';

import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';

const Profile = () => {
    // Taking user and updateUser from your custom AuthProvider
    const { user, updateUser } = useAuth(); 
    const { role } = useRole();
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const photo = e.target.photo.value;

        try {
            setLoading(true);
            
            // Using your provider's updateUser function
            await updateUser({
                displayName: name,
                photoURL: photo
            });
            
            Swal.fire({
                title: "Updated!",
                text: "Your profile has been updated successfully.",
                icon: "success",
                confirmButtonColor: "#4f46e5", 
            });
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: error.message,
                icon: "error"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full bg-base-100 min-h-screen p-4 md:p-10">
            {/* --- Header Section --- */}
            <div className="mb-10 text-center lg:text-left">
                <h2 className="text-4xl font-extrabold text-primary">User Profile</h2>
                <p className="text-base-content/60 mt-2">View and manage your account details securely.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* --- Left Column: Identity Card --- */}
                <div className="card bg-base-200 shadow-2xl border border-base-300 p-10 flex flex-col items-center text-center">
                    <div className="avatar mb-6">
                        <div className="w-36 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4 shadow-xl">
                            <img src={user?.photoURL || "https://i.ibb.co/mJR7z0f/user.png"} alt="User Avatar" />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight">{user?.displayName || "Anonymous User"}</h3>
                    <div className="badge badge-primary badge-lg mt-3 uppercase font-bold px-6 py-4">{role}</div>
                    
                    <div className="divider w-full my-8">Account Meta</div>
                    
                    <div className="w-full text-left space-y-5">
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-primary uppercase tracking-tighter">Registered Email</span>
                            <span className="text-sm font-medium opacity-80">{user?.email}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-primary uppercase tracking-tighter">Account Status</span>
                            <span className={`badge badge-sm mt-1 ${user?.emailVerified ? "badge-success" : "badge-warning"}`}>
                                {user?.emailVerified ? "Verified User" : "Pending Verification"}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-primary uppercase tracking-tighter">Recent Login</span>
                            <span className="text-sm font-medium opacity-80">{user?.metadata?.lastSignInTime?.slice(0, 16) || "N/A"}</span>
                        </div>
                    </div>
                </div>

                {/* --- Right Column: Update Settings --- */}
                <div className="lg:col-span-2 card bg-base-200 shadow-2xl border border-base-300 p-8 md:p-12">
                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-2 italic">
                        <span className="w-2 h-8 bg-primary rounded-full"></span> 
                        Personal Settings
                    </h3>
                    <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control md:col-span-2">
                            <label className="label">
                                <span className="label-text font-bold">Full Name</span>
                            </label>
                            <input 
                                type="text" 
                                name="name"
                                defaultValue={user?.displayName} 
                                className="input input-bordered focus:input-primary bg-base-100 transition-all font-medium" 
                                placeholder="Enter your full name"
                                required 
                            />
                        </div>

                        <div className="form-control md:col-span-2">
                            <label className="label">
                                <span className="label-text font-bold">Avatar Image URL</span>
                            </label>
                            <input 
                                type="text" 
                                name="photo"
                                defaultValue={user?.photoURL} 
                                className="input input-bordered focus:input-primary bg-base-100 transition-all font-medium" 
                                placeholder="Provide a direct link to your photo"
                            />
                        </div>

                        <div className="form-control md:col-span-2">
                            <label className="label">
                                <span className="label-text font-bold">Email (Static Primary Key)</span>
                            </label>
                            <input 
                                type="email" 
                                value={user?.email} 
                                className="input input-bordered bg-base-300 opacity-60 cursor-not-allowed font-medium" 
                                disabled 
                            />
                        </div>

                        <div className="md:col-span-2 mt-8">
                            <button 
                                type="submit" 
                                disabled={loading}
                                className={`btn btn-primary btn-block md:w-64 h-14 text-lg font-bold shadow-lg uppercase ${loading ? 'loading' : ''}`}
                            >
                                {loading ? "" : "Update Profile"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;