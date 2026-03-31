export default function AccountPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Email Section */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white">Email Address</h2>
        <div className="space-y-3">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">
              Primary Email
            </label>
            <input
              type="email"
              defaultValue="ahmed@taskflow.com"
              className="w-full bg-slate-900/50 border border-slate-800 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-medium"
            />
            <p className="text-xs text-slate-400">
              This is your login email address
            </p>
          </div>
          <div className="flex gap-3 pt-2">
            <button className="px-8 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20 cursor-pointer">
              Update Email
            </button>
          </div>
        </div>
      </section>

      <hr className="border-slate-800/50" />

      {/* Change Password Section */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-white">Change Password</h2>
          <p className="text-sm text-slate-400 mt-1">
            Update your password to keep your account secure
          </p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">
              Current Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-slate-900/50 border border-slate-800 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-medium"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">
                New Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-slate-900/50 border border-slate-800 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-medium"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-slate-900/50 border border-slate-800 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-medium"
              />
            </div>
          </div>
          <div className="bg-slate-900/30 border border-slate-800/50 rounded-lg p-3 mt-3">
            <p className="text-xs text-slate-400">Password requirements:</p>
            <ul className="text-xs text-slate-500 mt-2 space-y-1 ml-3">
              <li>• At least 8 characters</li>
              <li>• Mix of uppercase and lowercase letters</li>
              <li>• At least one number and special character</li>
            </ul>
          </div>
          <div className="flex gap-3 pt-2">
            <button className="px-8 py-2.5 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-500 transition-all shadow-lg shadow-amber-600/20 cursor-pointer">
              Change Password
            </button>
          </div>
        </div>
      </section>

      <hr className="border-slate-800/50" />

      {/* Account Status */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white">Account Status</h2>
        <div className="bg-slate-900/30 border border-slate-800/50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-white">Account Status</p>
              <p className="text-sm text-slate-400 mt-1">
                Your account is active and in good standing
              </p>
            </div>
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
          </div>
        </div>
      </section>
    </div>
  )
}
