import React, { useState } from 'react';
import { FaRegUser, FaRegQuestionCircle } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaEarthAfrica } from "react-icons/fa6";
import { motion } from 'framer-motion';

function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'account': return <AccountSettings />;
      case 'notifications': return <NotificationSettings />;
      case 'privacy': return <PrivacySettings />;
      case 'help': return <HelpSupport />;
      default: return null;
    }
  };

  return (
    <div className="w-full lg:ml-80 px-4 md:px-10 py-10 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-1 dark:text-white">Settings</h1>
      <p className="text-gray-600 dark:text-gray-300">Manage your account preferences and settings</p>

      <div className="flex flex-col md:flex-row gap-10 mt-10">
        {/* Sidebar */}
        <aside className="md:w-1/3">
          <ul className="space-y-4 border border-gray-200 dark:border-gray-700 rounded-lg p-4 font-medium text-lg dark:text-white">
            {[
              { key: 'account', icon: <FaRegUser />, label: 'Account' },
              { key: 'notifications', icon: <IoIosNotificationsOutline />, label: 'Notifications' },
              { key: 'privacy', icon: <FaEarthAfrica />, label: 'Privacy' },
              { key: 'help', icon: <FaRegQuestionCircle />, label: 'Help & Support' }
            ].map(tab => (
              <li
                key={tab.key}
                className={`cursor-pointer flex items-center hover:text-emerald-600 ${activeTab === tab.key && 'text-emerald-600 font-semibold'}`}
                onClick={() => setActiveTab(tab.key)}
              >
                <span className="mr-2">{tab.icon}</span> {tab.label}
              </li>
            ))}
          </ul>
        </aside>

        {/* Content */}
        <motion.main
          key={activeTab}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 p-6 shadow-sm"
        >
          {renderTabContent()}
        </motion.main>
      </div>
    </div>
  );
}

export default SettingsPage;

// Account Tab
const AccountSettings = () => {
  const [formData, setFormData] = useState({ name: '', email: '', username: '' });

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 dark:text-white">Account Settings</h2>
      <div className="space-y-4">
        {['name', 'email', 'username'].map((field) => (
          <div key={field}>
            <label className="block mb-1 capitalize text-gray-700 dark:text-gray-300">{field}</label>
            <input
              type="text"
              placeholder={`Enter your ${field}`}
              value={formData[field]}
              onChange={e => setFormData({ ...formData, [field]: e.target.value })}
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none"
            />
          </div>
        ))}
        <button className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700">Save Changes</button>
      </div>
    </div>
  );
};

// Notifications Tab
const NotificationSettings = () => {
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 dark:text-white">Notification Preferences</h2>
      <ToggleSwitch label="Email Notifications" value={emailNotif} setValue={setEmailNotif} />
      <ToggleSwitch label="SMS Alerts" value={smsNotif} setValue={setSmsNotif} />
    </div>
  );
};

// Privacy Tab
const PrivacySettings = () => {
  const [publicProfile, setPublicProfile] = useState(false);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 dark:text-white">Privacy Settings</h2>
      <ToggleSwitch label="Make Profile Public" value={publicProfile} setValue={setPublicProfile} />
    </div>
  );
};

// Help Tab
const HelpSupport = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-4 dark:text-white">Help & Support</h2>
    <p className="text-gray-600 dark:text-gray-300">Having trouble? Visit our FAQ or contact support at support@example.com.</p>
  </div>
);

// Toggle Switch Component
const ToggleSwitch = ({ label, value, setValue }) => (
  <div className="flex justify-between items-center py-2">
    <span className="dark:text-gray-300">{label}</span>
    <button
      onClick={() => setValue(!value)}
      className={`w-14 h-7 flex items-center rounded-full p-1 transition-colors duration-300 ${value ? 'bg-emerald-600' : 'bg-gray-400'}`}
    >
      <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${value ? 'translate-x-7' : ''}`} />
    </button>
  </div>
);
